import React, { useCallback } from 'react';
import { useMountedState } from '../utils/mounted';
import { Col, Row, Select, Switch } from 'antd';
import {
  preferredSortOrder,
  setPreferredSortOrder,
  setSharedEnableAutoShuffle,
  sharedEnableAutoShuffle,
} from '../store/constants';
import '../gameroom/scss/gameroom.scss';
import { TileLetter, PointValue } from '../gameroom/tile';
import { BoardPreview } from './board_preview';

const KNOWN_TILE_ORDERS = [
  {
    name: 'Alphabetical',
    value: '',
  },
  {
    name: 'Vowels first',
    value: 'AEIOU',
  },
  {
    name: 'Consonants first',
    value: 'BCDFGHJKLMNPQRSTVWXYZ',
  },
  {
    name: 'Descending points',
    value: 'QZJXKFHVWYBCMPDG',
  },
  {
    name: 'Blanks first',
    value: '?',
  },
];

const KNOWN_BOARD_STYLES = [
  {
    name: 'Default',
    value: '',
  },
  {
    name: 'Cheery',
    value: 'cheery',
  },
  {
    name: 'Almost Colorless',
    value: 'charcoal',
  },
  {
    name: 'Forest',
    value: 'forest',
  },
  {
    name: 'Aflame',
    value: 'aflame',
  },
  {
    name: 'Teal and Plum',
    value: 'tealish',
  },
  {
    name: 'Pastel',
    value: 'pastel',
  },
  {
    name: 'Vintage',
    value: 'vintage',
  },
  {
    name: 'Balsa',
    value: 'balsa',
  },
  {
    name: 'Mahogany',
    value: 'mahogany',
  },
  {
    name: 'Metallic',
    value: 'metallic',
  },
];

const KNOWN_TILE_STYLES = [
  {
    name: 'Default',
    value: '',
  },
  {
    name: 'Charcoal',
    value: 'charcoal',
  },
  {
    name: 'White',
    value: 'whitish',
  },
  {
    name: 'Mahogany',
    value: 'mahogany',
  },
  {
    name: 'Balsa',
    value: 'balsa',
  },
  {
    name: 'Brick',
    value: 'brick',
  },
  {
    name: 'Forest',
    value: 'forest',
  },
  {
    name: 'Teal',
    value: 'tealish',
  },
  {
    name: 'Plum',
    value: 'plumish',
  },
  {
    name: 'Pastel',
    value: 'pastel',
  },
  {
    name: 'Fuchsia',
    value: 'fuchsiaish',
  },
  {
    name: 'Blue',
    value: 'blueish',
  },
  {
    name: 'Metallic',
    value: 'metallic',
  },
];

const makeTileOrderValue = (tileOrder: string, autoShuffle: boolean) =>
  JSON.stringify({ tileOrder, autoShuffle });

export const Preferences = React.memo(() => {
  const { useState } = useMountedState();

  const [darkMode, setDarkMode] = useState(
    localStorage?.getItem('darkMode') === 'true'
  );
  const initialTileStyle = localStorage?.getItem('userTile') || 'Default';
  const [userTile, setUserTile] = useState<string>(initialTileStyle);

  const initialBoardStyle = localStorage?.getItem('userBoard') || 'Default';
  const [userBoard, setUserBoard] = useState<string>(initialBoardStyle);

  const toggleDarkMode = useCallback(() => {
    const useDarkMode = localStorage?.getItem('darkMode') !== 'true';
    localStorage.setItem('darkMode', useDarkMode ? 'true' : 'false');
    if (useDarkMode) {
      document?.body?.classList?.add('mode--dark');
      document?.body?.classList?.remove('mode--default');
    } else {
      document?.body?.classList?.add('mode--default');
      document?.body?.classList?.remove('mode--dark');
    }
    setDarkMode((x) => !x);
  }, []);

  const handleUserTileChange = useCallback((tileStyle: string) => {
    const classes = document?.body?.className
      .split(' ')
      .filter((c) => !c.startsWith('tile--'));
    document.body.className = classes.join(' ').trim();
    if (tileStyle) {
      localStorage.setItem('userTile', tileStyle);
      document?.body?.classList?.add(`tile--${tileStyle}`);
    } else {
      localStorage.removeItem('userTile');
    }
    setUserTile(tileStyle);
  }, []);

  const handleUserBoardChange = useCallback((boardStyle: string) => {
    const classes = document?.body?.className
      .split(' ')
      .filter((c) => !c.startsWith('board--'));
    document.body.className = classes.join(' ').trim();
    if (boardStyle) {
      localStorage.setItem('userBoard', boardStyle);
      document?.body?.classList?.add(`board--${boardStyle}`);
    } else {
      localStorage.removeItem('userBoard');
    }
    setUserBoard(boardStyle);
  }, []);

  const [reevaluateTileOrderOptions, setReevaluateTileOrderOptions] =
    useState(0);
  const [tileOrder, setTileOrder] = useState(preferredSortOrder ?? '');
  const handleTileOrderAndAutoShuffleChange = useCallback((value) => {
    try {
      const parsedStuff = JSON.parse(value);
      const { tileOrder: newTileOrder, autoShuffle: newAutoShuffle } =
        parsedStuff;
      setTileOrder(newTileOrder);
      setPreferredSortOrder(newTileOrder);
      setSharedEnableAutoShuffle(newAutoShuffle);
      setReevaluateTileOrderOptions((x) => (x + 1) | 0);
    } catch (e) {
      console.error(e);
    }
  }, []);
  const localEnableAutoShuffle = sharedEnableAutoShuffle;
  const tileOrderValue = React.useMemo(
    () => makeTileOrderValue(tileOrder, localEnableAutoShuffle),
    [tileOrder, localEnableAutoShuffle]
  );
  const tileOrderOptions = React.useMemo(() => {
    void reevaluateTileOrderOptions;
    const ret: Array<{ name: React.ReactElement; value: string }> = [];
    const pushTileOrder = (
      name: string,
      value: string,
      autoShuffle: boolean
    ) => {
      // Design only wants "Random" for "Alphabetical".
      if (
        !(
          (tileOrder === value && autoShuffle === localEnableAutoShuffle) ||
          name === 'Alphabetical' ||
          !autoShuffle
        )
      ) {
        return;
      }
      let nameText = name;
      let hoverHelp = null;
      if (autoShuffle !== localEnableAutoShuffle) {
        hoverHelp = `(turn ${autoShuffle ? 'on' : 'off'} auto-shuffle)`;
      }
      if (name === 'Alphabetical' && autoShuffle) {
        nameText = 'Random';
        hoverHelp = '(automatically shuffle tiles at every turn)';
      } else if (autoShuffle) {
        // The page should still work logically if this is set manually.
        // localStorage.enableAutoShuffle = true;
        nameText = `${nameText} (auto-shuffle)`;
      }
      ret.push({
        name: (
          <React.Fragment>
            {nameText}
            {hoverHelp && (
              <React.Fragment>
                {' '}
                <span className="hover-help">{hoverHelp}</span>
              </React.Fragment>
            )}
          </React.Fragment>
        ),
        value: makeTileOrderValue(value, autoShuffle),
      });
    };
    const addTileOrder = ({ name, value }: { name: string; value: string }) => {
      pushTileOrder(name, value, false);
      pushTileOrder(name, value, true);
    };
    let found = false;
    for (const { name, value } of KNOWN_TILE_ORDERS) {
      if (value === tileOrder) found = true;
      addTileOrder({ name, value });
    }
    if (!found) {
      addTileOrder({ name: 'Custom', value: tileOrder });
    }
    return ret;
  }, [reevaluateTileOrderOptions, tileOrder, localEnableAutoShuffle]);

  return (
    <div className="preferences">
      <h3>Preferences</h3>
      <div className="section-header">Display</div>
      <div className="toggle-section">
        <div className="title">Dark mode</div>
        <div>Use the dark version of the Woogles UI on Woogles.io</div>
        <Switch
          defaultChecked={darkMode}
          onChange={toggleDarkMode}
          className="dark-toggle"
        />
      </div>
      <div className="section-header">OMGWords settings</div>
      <Row>
        <Col span={12}>
          <div className="tile-order">Default tile order</div>
          <Select
            className="tile-order-select"
            size="large"
            defaultValue={tileOrderValue}
            onChange={handleTileOrderAndAutoShuffleChange}
          >
            {tileOrderOptions.map(({ name, value }) => (
              <Select.Option value={value} key={value}>
                {name}
              </Select.Option>
            ))}
          </Select>
          <div className="tile-order">Tile style</div>
          <div className="tile-selection">
            <Select
              className="tile-style-select"
              size="large"
              defaultValue={userTile}
              onChange={handleUserTileChange}
            >
              {KNOWN_TILE_STYLES.map(({ name, value }) => (
                <Select.Option value={value} key={value}>
                  {name}
                </Select.Option>
              ))}
            </Select>
            <div className="previewer">
              <div className={`tile-previewer tile--${userTile}`}>
                <div className="tile">
                  <TileLetter rune="W" />
                  <PointValue value={4} />
                </div>
                <div className="tile">
                  <TileLetter rune="O" />
                  <PointValue value={1} />
                </div>
                <div className="tile">
                  <TileLetter rune="O" />
                  <PointValue value={1} />
                </div>
                <div className="tile blank">
                  <TileLetter rune="G" />
                  <PointValue value={0} />
                </div>
                <div className="tile">
                  <TileLetter rune="L" />
                  <PointValue value={1} />
                </div>
                <div className="tile">
                  <TileLetter rune="E" />
                  <PointValue value={1} />
                </div>
                <div className="tile">
                  <TileLetter rune="S" />
                  <PointValue value={1} />
                </div>
              </div>
              <div className={`tile-previewer tile--${userTile}`}>
                <div className="tile second-color">
                  <TileLetter rune="O" />
                  <PointValue value={1} />
                </div>
                <div className="tile second-color blank">
                  <TileLetter rune="M" />
                  <PointValue value={0} />
                </div>
                <div className="tile second-color">
                  <TileLetter rune="G" />
                  <PointValue value={2} />
                </div>
              </div>
            </div>
            <div className="board-style">Board style</div>
            <div className="board-selection">
              <Select
                className="board-style-select"
                size="large"
                defaultValue={userBoard}
                onChange={handleUserBoardChange}
              >
                {KNOWN_BOARD_STYLES.map(({ name, value }) => (
                  <Select.Option value={value} key={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="previewer">
              <BoardPreview />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
});
