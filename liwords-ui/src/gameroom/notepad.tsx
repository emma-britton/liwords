import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  useGameContextStoreContext,
  useTentativeTileContext,
} from '../store/store';
import { sortTiles } from '../store/constants';
import {
  contiguousTilesFromTileSet,
  simpletile,
} from '../utils/cwgame/scoring';
import { Direction, isMobile } from '../utils/cwgame/common';
import { useMountedState } from '../utils/mounted';

type NotepadProps = {
  style?: React.CSSProperties;
  includeCard?: boolean;
};

const humanReadablePosition = (
  direction: Direction,
  firstLetter: simpletile
): string => {
  const readableCol = String.fromCodePoint(firstLetter.col + 65);
  const readableRow = (firstLetter.row + 1).toString();
  if (direction === Direction.Horizontal) {
    return readableRow + readableCol;
  }
  return readableCol + readableRow;
};

const NotepadContext = React.createContext({
  curNotepad: '',
  setCurNotepad: (a: string) => {},
});

export const NotepadContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { useState } = useMountedState();
  const [curNotepad, setCurNotepad] = useState('');
  const contextValue = useMemo(() => ({ curNotepad, setCurNotepad }), [
    curNotepad,
    setCurNotepad,
  ]);

  return <NotepadContext.Provider value={contextValue} children={children} />;
};

export const Notepad = React.memo((props: NotepadProps) => {
  const notepadEl = useRef<HTMLTextAreaElement>(null);
  const { curNotepad, setCurNotepad } = useContext(NotepadContext);
  const {
    displayedRack,
    placedTiles,
    placedTilesTempScore,
  } = useTentativeTileContext();
  const { gameContext } = useGameContextStoreContext();
  const board = gameContext.board;
  const addPlay = useCallback(() => {
    const contiguousTiles = contiguousTilesFromTileSet(placedTiles, board);
    let play = '';
    let position = '';
    const leave = sortTiles(displayedRack.split('').sort().join(''));
    if (contiguousTiles?.length === 2) {
      position = humanReadablePosition(
        contiguousTiles[1],
        contiguousTiles[0][0]
      );
      let inParen = false;
      for (const tile of contiguousTiles[0]) {
        if (!tile.fresh) {
          if (!inParen) {
            play += '(';
            inParen = true;
          }
        } else {
          if (inParen) {
            play += ')';
            inParen = false;
          }
        }
        play += tile.letter;
      }
      if (inParen) play += ')';
    }
    setCurNotepad(
      `${curNotepad ? curNotepad + '\n' : ''}${
        play ? position + ' ' + play + ' ' : ''
      }${placedTilesTempScore ? placedTilesTempScore + ' ' : ''}${leave}`
    );
    // Return focus to board on all but mobile so the key commands can be used immediately
    if (!isMobile()) {
      document.getElementById('board-container')?.focus();
    }
  }, [
    displayedRack,
    placedTiles,
    placedTilesTempScore,
    curNotepad,
    setCurNotepad,
    board,
  ]);
  useEffect(() => {
    if (notepadEl.current && !(notepadEl.current === document.activeElement)) {
      notepadEl.current.scrollTop = notepadEl.current.scrollHeight || 0;
    }
  }, [curNotepad]);
  const handleNotepadChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurNotepad(e.target.value);
    },
    [setCurNotepad]
  );
  const easterEggEnabled = useMemo(() => /catcam/i.test(curNotepad), [
    curNotepad,
  ]);
  const notepadContainer = (
    <div className="notepad-container" style={props.style}>
      <textarea
        className="notepad"
        value={curNotepad}
        ref={notepadEl}
        spellCheck={false}
        style={props.style}
        onChange={handleNotepadChange}
      />
      <React.Fragment>
        {easterEggEnabled && <EasterEgg />}
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          type="primary"
          onClick={addPlay}
        />
      </React.Fragment>
    </div>
  );
  if (props.includeCard) {
    return (
      <Card
        title="Notepad"
        className="notepad-card"
        extra={
          <React.Fragment>
            {easterEggEnabled && <EasterEgg />}
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              type="primary"
              onClick={addPlay}
            />
          </React.Fragment>
        }
      >
        {notepadContainer}
      </Card>
    );
  }
  return notepadContainer;
});

// usage: type catcam on the notepad
const EasterEgg = (props: any) => {
  const ctx = useMemo(() => {
    const AudioContext =
      window.AudioContext ||
      ((window as any).webkitAudioContext as AudioContext);
    return new AudioContext();
  }, []);

  const muterRef = useRef(ctx.createGain());

  const stopIt = useCallback(() => {
    muterRef.current.gain.setValueAtTime(0, ctx.currentTime);
    muterRef.current = ctx.createGain();
    muterRef.current.gain.setValueAtTime(1, ctx.currentTime);
    muterRef.current.connect(ctx.destination);
  }, [ctx]);

  useEffect(() => {
    return () => {
      stopIt();
    };
  }, [stopIt]);

  const handler = useCallback(
    (song: string) => {
      stopIt();

      // Hz, sec, sec
      const playFreq = (freq: number, timeOn: number, duration: number) => {
        const env = ctx.createGain();
        // TODO: find a believable ADSR envelope
        env.gain.setValueAtTime(1, timeOn);
        env.gain.linearRampToValueAtTime(0.5, timeOn + 0.125 * duration);
        env.gain.setValueAtTime(0.5, timeOn + 0.875 * duration);
        env.gain.linearRampToValueAtTime(0.25, timeOn + duration);
        env.connect(muterRef.current);
        const osc = ctx.createOscillator();
        osc.frequency.value = freq;
        osc.type = 'sine'; // or 'sawtooth'?
        osc.connect(env);
        osc.start(timeOn);
        osc.stop(timeOn + duration);
        return osc;
      };

      let dur = 60 / 120;
      const t0 = ctx.currentTime;
      let t = 0;
      const playNote = (note: number, beats: number) => {
        if (note) {
          playFreq(440 * 2 ** ((note - 69) / 12), t0 + t * dur, beats * dur);
        }
        t += beats;
      };

      if (song === 'catcam') {
        // https://www.youtube.com/watch?v=J7UwSVsiwzI
        dur = 60 / 128;
        // 69 is middle A and 60 is middle C
        const song0 = [[0, 4]]; // 4 beats
        const song1a = [
          [83, 3],
          [81, 0.5],
          [83, 1],
          [84, 1],
          [83, 1.5],
          [81, 0.5],
          [79, 2.5],
        ]; // 10 beats
        const song1 = [...song1a, [76, 5], [0, 1]]; // 16 beats
        const song2a = [...song1a, [76, 4], [0, 1]]; // 15 beats
        const song2b = [
          [79, 0.5],
          [76, 0.5],
        ]; // 1 beat
        const song3 = [
          [74, 2.5],
          [72, 0.5],
          [74, 0.5],
          [76, 1],
          [80, 1],
          [81, 1],
          [83, 1.5],
        ]; // 8 beats
        const song4 = [
          [74, 5.5],
          [76, 2.5 / 3],
          [74, 2.5 / 3],
          [69, 2.5 / 3],
        ]; // 8 beats
        const song5a = [[71, 4]]; // 4 beats
        const song5b = [
          [71, 1],
          [0, 3],
        ]; // 4 beats
        const song1_d = song1.map(([note, beats]) => [note - 12, beats]);
        const song2a_d = song2a.map(([note, beats]) => [note - 12, beats]);
        const fullSong = [
          ...song0, // 4 beats
          ...song0, // 4 beats
          ...song1_d, // 16 beats
          ...song2a_d, // 15 beats
          ...song2b, // 1 beat
          ...song3, // 8 beats
          ...song3, // 8 beats
          ...song4, // 8 beats
          ...song5a, // 4 beats
          ...song0, // 4 beats
          ...song1, // 16 beats
          ...song2a, // 15 beats
          ...song2b, // 1 beat
          ...song3, // 8 beats
          ...song3, // 8 beats
          ...song4, // 8 beats
          ...song5b, // 4 beats
        ];

        for (const [note, beats] of fullSong) {
          playNote(note, beats);
        }

        const accompaniment = [
          40,
          40,
          45,
          45,
          40,
          40,
          45,
          45,
          40,
          40,
          38,
          40,
          38,
          40,
          38,
          38,
        ];

        t = 0;
        for (const note1 of [...accompaniment, ...accompaniment]) {
          const note2 = note1 + 12;
          for (let i = 0; i < 4; ++i) {
            for (const note of [note1, note2]) {
              playNote(note, 0.5);
            }
          }
        }
        playNote(40, 1);

        for (const t1 of [82, 98]) {
          t = t1;
          for (let i = 0; i < 6; ++i) {
            for (const note of [79, 78, 76, 74]) {
              playNote(note, 1 / 4);
            }
          }
        }
      }

      if (song === 'startgame') {
        dur = 60 / 180;
        playNote(50, 0.5);
        playNote(54, 0.5);
        playNote(57, 0.5);
        playNote(64, 0.5);
        playNote(62, 0.5);
        playNote(66, 0.5);
        playNote(69, 0.5);
        playNote(76, 0.5);
      }

      if (song === 'makemove') {
        dur = 60 / 240;
        playNote(50, 0.5);
        playNote(0, -0.375);
        playNote(53, 0.5);
        playNote(0, -0.375);
        playNote(57, 0.5);
      }

      if (song === 'oppmove') {
        dur = 60 / 240;
        playNote(57, 0.5);
        playNote(0, -0.375);
        playNote(53, 0.5);
        playNote(0, -0.375);
        playNote(50, 0.5);
      }
    },
    [stopIt, ctx]
  );

  return (
    <React.Fragment>
      <Button
        shape="circle"
        icon={<React.Fragment>&#x1f63b;</React.Fragment>}
        type="primary"
        onClick={() => handler('catcam')}
      />
      <Button
        shape="circle"
        icon={<React.Fragment>&#x27f2;</React.Fragment>}
        type="primary"
        onClick={() => handler('startgame')}
      />
      <Button
        shape="circle"
        icon={<React.Fragment>&#x25b6;</React.Fragment>}
        type="primary"
        onClick={() => handler('makemove')}
      />
      <Button
        shape="circle"
        icon={<React.Fragment>&#x25c0;</React.Fragment>}
        type="primary"
        onClick={() => handler('oppmove')}
      />
    </React.Fragment>
  );
};
