import { proto3 } from '@bufbuild/protobuf';
import { Action, ActionType } from '../../actions/actions';
import { MessageType } from '../../gen/api/proto/ipc/ipc_pb';
import { GameEndReason } from '../../gen/api/proto/ipc/omgwords_pb';
import {
  DivisionControls,
  DivisionControlsResponse,
  DivisionPairingsDeletedResponse,
  DivisionPairingsResponse,
  DivisionRoundControls,
  FullTournamentDivisions,
  Pairing,
  PlayersAddedOrRemovedResponse,
  ReadyForTournamentGame,
  RoundControl,
  RoundStandings,
  TournamentDataResponse,
  TournamentDivisionDataResponse,
  TournamentDivisionDeletedResponse,
  TournamentGameEndedEvent,
  TournamentGameResult,
  TournamentPerson,
  TournamentRoundStarted,
} from '../../gen/api/proto/ipc/tournament_pb';

import {
  TournamentMetadata,
  TType,
} from '../../gen/api/proto/tournament_service/tournament_service_pb';
import { RecentGame } from '../../tournament/recent_game';
import { encodeToSocketFmt } from '../../utils/protobuf';
import { LoginState } from '../login_state';
import { ActiveGame } from './lobby_reducer';

type TournamentGame = {
  scores: Array<number>;
  results: Array<TournamentGameResult>;
  gameEndReason: GameEndReason;
  id?: string;
};

export type SinglePairing = {
  players: Array<TournamentPerson>;
  outcomes: Array<TournamentGameResult>;
  readyStates: Array<string>;
  games: Array<TournamentGame>;
  pairingCount?: number;
};

type RoundPairings = {
  roundPairings: Array<SinglePairing>;
};

export type Division = {
  tournamentID: string;
  divisionID: string;
  players: Array<TournamentPerson>;
  standingsMap: { [key: number]: RoundStandings };
  pairings: Array<RoundPairings>;
  divisionControls: DivisionControls | undefined;
  roundControls: Array<RoundControl>;
  // currentRound is zero-indexed
  currentRound: number;
  playerIndexMap: { [playerID: string]: number };
  numRounds: number;
  // checkedInPlayers: Set<string>;
};

export type CompetitorState = {
  isRegistered: boolean;
  division?: string;
  status?: TourneyStatus;
  currentRound: number;
};

export const defaultCompetitorState = {
  isRegistered: false,
  currentRound: -1,
};

export type TournamentState = {
  metadata: TournamentMetadata;
  directors: Array<string>;
  // standings, pairings, etc. more stuff here to come.
  started: boolean;
  divisions: { [name: string]: Division };
  competitorState: CompetitorState;

  // activeGames in this tournament.
  activeGames: Array<ActiveGame>;

  finishedTourneyGames: Array<RecentGame>;
  gamesPageSize: number;
  gamesOffset: number;
  finished: boolean;
  initializedFromXHR: boolean;
};

const defaultMetadata = new TournamentMetadata({ type: TType.LEGACY });

export const defaultTournamentState = {
  metadata: defaultMetadata,
  directors: new Array<string>(),
  started: false,
  divisions: {},
  competitorState: defaultCompetitorState,
  activeGames: new Array<ActiveGame>(),
  finishedTourneyGames: new Array<RecentGame>(),
  gamesPageSize: 20,
  gamesOffset: 0,
  finished: false,
  initializedFromXHR: false,
};

export enum TourneyStatus {
  PRETOURNEY = 'PRETOURNEY',
  ROUND_BYE = 'ROUND_BYE',
  ROUND_OPEN = 'ROUND_OPEN',
  ROUND_GAME_FINISHED = 'ROUND_GAME_FINISHED',
  ROUND_READY = 'ROUND_READY', // waiting for your opponent
  ROUND_OPPONENT_WAITING = 'ROUND_OPPONENT_WAITING',
  ROUND_LATE = 'ROUND_LATE', // expect this to override opponent waiting
  ROUND_GAME_ACTIVE = 'ROUND_GAME_ACTIVE',
  ROUND_FORFEIT_LOSS = 'ROUND_FORFEIT_LOSS',
  ROUND_FORFEIT_WIN = 'ROUND_FORFEIT_WIN',
  POSTTOURNEY = 'POSTTOURNEY',
}

export const readyForTournamentGame = (
  sendSocketMsg: (msg: Uint8Array) => void,
  tournamentID: string,
  competitorState: CompetitorState
) => {
  const evt = new ReadyForTournamentGame();
  const division = competitorState.division;
  if (!division) {
    return;
  }
  const round = competitorState.currentRound;
  evt.division = division;
  evt.tournamentId = tournamentID;
  evt.round = round;
  sendSocketMsg(
    encodeToSocketFmt(MessageType.READY_FOR_TOURNAMENT_GAME, evt.toBinary())
  );
};

const findOpponentIdx = (
  player: number,
  playerIndexMap: { [playerID: string]: number },
  pairings: Array<RoundPairings>,
  round: number
): number => {
  if (!pairings[round].roundPairings[player]?.players) {
    return -1;
  }

  let opponent =
    playerIndexMap[pairings[round].roundPairings[player].players[0].id];
  if (opponent === player) {
    opponent =
      playerIndexMap[pairings[round].roundPairings[player].players[1].id];
  }
  return opponent;
};

const deletePairings = (
  existingPairings: Array<RoundPairings>,
  round: number
): Array<RoundPairings> => {
  const updatedPairings = [...existingPairings];

  for (let i = 0; i < updatedPairings[round].roundPairings.length; i++) {
    updatedPairings[round].roundPairings[i] = {} as SinglePairing;
  }
  return updatedPairings;
};

const reducePairings = (
  players: Array<TournamentPerson>,
  playerIndexMap: { [playerID: string]: number },
  existingPairings: Array<RoundPairings>,
  newPairings: Pairing[]
): Array<RoundPairings> => {
  const updatedPairings = [...existingPairings];

  newPairings.forEach((value: Pairing) => {
    const newSinglePairing = {
      players: value.players.map((v) => players[v]),
      outcomes: value.outcomes,
      readyStates: value.readyStates,
      games: value.games.map((g) => ({
        scores: g.scores,
        gameEndReason: g.gameEndReason,
        id: g.id,
        results: g.results,
      })),
    };

    // check if any of these players are already paired.

    for (let pidx = 0; pidx <= 1; pidx++) {
      const opp = findOpponentIdx(
        value.players[pidx],
        playerIndexMap,
        updatedPairings,
        value.round
      );
      if (opp !== -1) {
        updatedPairings[value.round].roundPairings[opp] = {} as SinglePairing;
      }
    }

    updatedPairings[value.round].roundPairings[value.players[0]] =
      newSinglePairing;
    updatedPairings[value.round].roundPairings[value.players[1]] =
      newSinglePairing;
  });
  return updatedPairings;
};

// Create a deep copy.
const copyPairings = (existingPairings: Array<RoundPairings>) => {
  const pairingsCopy = new Array<RoundPairings>();

  existingPairings.forEach((value: RoundPairings) => {
    const roundPairings = new Array<SinglePairing>();

    value.roundPairings.forEach((value: SinglePairing) => {
      const players = new Array<TournamentPerson>();
      if (!value.players || !value.players.length) {
        roundPairings.push({} as SinglePairing);
      } else {
        value.players.forEach((person) => {
          players.push(person.clone());
        });
        const newSinglePairing = {
          players,
          outcomes: [...value.outcomes],
          readyStates: [...value.readyStates],
          games: value.games.map((g) => ({
            scores: [...g.scores],
            gameEndReason: g.gameEndReason,
            id: g.id,
            results: [...g.results],
          })),
        } as SinglePairing;

        roundPairings.push(newSinglePairing);
      }
    });
    pairingsCopy.push({ roundPairings });
  });
  return pairingsCopy;
};

const reduceStandings = (
  existingStandings: { [key: number]: RoundStandings },
  newStandings: { [key: number]: RoundStandings }
): { [key: number]: RoundStandings } => {
  const updatedStandings: { [key: number]: RoundStandings } = {};

  for (const [k, v] of Object.entries(existingStandings)) {
    updatedStandings[Number(k)] = v;
  }

  for (const [k, v] of Object.entries(newStandings)) {
    updatedStandings[Number(k)] = v;
  }

  return updatedStandings;
};

const divisionDataResponseToObj = (
  dd: TournamentDivisionDataResponse
): Division => {
  const ret = {
    tournamentID: dd.id,
    divisionID: dd.division,
    players: Array<TournamentPerson>(),
    pairings: Array<RoundPairings>(),
    divisionControls: dd.controls, // game request, etc
    roundControls: dd.roundControls,
    currentRound: dd.currentRound,
    playerIndexMap: {},
    numRounds: 0,
    standingsMap: dd.standings,
    //     checkedInPlayers: new Set<string>(),
  };

  // Reduce Standings

  // const standingsMap: { [roundId: number]: RoundStandings } = {};

  // dd.getStandingsMap().forEach((value: RoundStandings, key: number) => {
  //   standingsMap[key] = value;
  // });

  /**
   *     if (value.getCheckedIn()) {
      checkedInPlayers.add(dd.getPlayersList()[index]);
    }
   */

  // Reduce playerIndexMap and players

  const playerIndexMap: { [playerID: string]: number } = {};
  const newPlayers = Array<TournamentPerson>();
  dd.players?.persons.forEach((value: TournamentPerson, index: number) => {
    playerIndexMap[value.id] = index;
    newPlayers.push(value);
  });

  ret.playerIndexMap = playerIndexMap;
  ret.players = newPlayers;

  // Reduce pairings

  const newPairings = new Array<RoundPairings>();
  ret.numRounds = dd.roundControls.length;

  for (let i = 0; i < ret.numRounds; i++) {
    const newRoundPairings = new Array<SinglePairing>();
    dd.players?.persons.forEach(() => {
      newRoundPairings.push({} as SinglePairing);
    });
    newPairings.push({ roundPairings: newRoundPairings });
  }

  for (const v of Object.values(dd.pairingMap)) {
    const newPairing = {
      players: v.players.map((v) => newPlayers[v]),
      outcomes: v.outcomes,
      readyStates: v.readyStates,
      games: v.games.map((g) => ({
        scores: g.scores,
        gameEndReason: g.gameEndReason,
        id: g.id,
        results: g.results,
      })),
    } as SinglePairing;

    newPairings[v.round].roundPairings[
      playerIndexMap[newPairing.players[0].id]
    ] = newPairing;
    newPairings[v.round].roundPairings[
      playerIndexMap[newPairing.players[1].id]
    ] = newPairing;
  }

  ret.pairings = newPairings;

  return ret;
};

export const TourneyGameEndedEvtToRecentGame = (
  evt: TournamentGameEndedEvent
): RecentGame => {
  const evtPlayers = evt.players;

  const players = evtPlayers.map((ep) => ({
    username: ep.username,
    score: ep.score,
    result:
      proto3.getEnumType(TournamentGameResult).findNumber(ep.result)?.name ??
      'NO_RESULT',
  }));

  return {
    players,
    endReason:
      proto3.getEnumType(GameEndReason).findNumber(evt.endReason)?.name ??
      'NONE',
    gameId: evt.gameId,
    time: evt.time,
    round: evt.round,
  };
};

const getPairing = (
  round: number,
  fullPlayerID: string,
  division: Division
): SinglePairing | undefined => {
  if (
    !(
      division.pairings &&
      division.pairings[round] &&
      division.pairings[round].roundPairings
    )
  ) {
    return undefined;
  }
  return division.pairings[round].roundPairings[
    division.playerIndexMap[fullPlayerID]
  ];
};

// The "Ready" button and pairings should be displayed based on:
//    - the tournament having started
//    - player not having yet started the current round's game
//      (how do we determine that? a combination of the live games
//       currently ongoing and a game result already being in for this game?)
const tourneyStatus = (
  division: Division,
  activeGames: Array<ActiveGame>,
  loginContext: LoginState
): TourneyStatus => {
  if (!division) {
    return TourneyStatus.PRETOURNEY; // XXX: maybe a state for not being part of tourney
  }

  const fullPlayerID = `${loginContext.userID}:${loginContext.username}`;
  const pairing = getPairing(division.currentRound, fullPlayerID, division);

  if (!pairing || !pairing.players) {
    return TourneyStatus.PRETOURNEY;
  }

  const playerIdx = pairing.players.map((v) => v.id).indexOf(fullPlayerID);
  if (playerIdx === undefined) {
    return TourneyStatus.PRETOURNEY;
  }
  if (pairing.players[0] === pairing.players[1]) {
    switch (pairing.outcomes[0]) {
      case TournamentGameResult.BYE:
        return TourneyStatus.ROUND_BYE;
      case TournamentGameResult.FORFEIT_LOSS:
        return TourneyStatus.ROUND_FORFEIT_LOSS;
      case TournamentGameResult.FORFEIT_WIN:
        return TourneyStatus.ROUND_FORFEIT_WIN;
    }
    return TourneyStatus.PRETOURNEY;
  }
  if (pairing.games[0] && pairing.games[0].gameEndReason) {
    if (division.currentRound === division.numRounds - 1) {
      return TourneyStatus.POSTTOURNEY;
    }
    // Game already finished
    return TourneyStatus.ROUND_GAME_FINISHED;
  }
  if (
    activeGames.find((ag) => {
      return (
        ag.players[0].displayName === loginContext.username ||
        ag.players[1].displayName === loginContext.username
      );
    })
  ) {
    return TourneyStatus.ROUND_GAME_ACTIVE;
  }
  if (
    pairing.readyStates[playerIdx] === '' &&
    pairing.readyStates[1 - playerIdx] !== ''
  ) {
    // Our opponent is ready
    return TourneyStatus.ROUND_OPPONENT_WAITING;
  } else if (
    pairing.readyStates[1 - playerIdx] === '' &&
    pairing.readyStates[playerIdx] !== ''
  ) {
    // We're ready
    return TourneyStatus.ROUND_READY;
  }

  if (
    pairing.readyStates[playerIdx] === '' &&
    pairing.readyStates[1 - playerIdx] === ''
  ) {
    return TourneyStatus.ROUND_OPEN;
  }

  // Otherwise just return generic pre-tourney
  return TourneyStatus.PRETOURNEY;
};

export function TournamentReducer(
  state: TournamentState,
  action: Action
): TournamentState {
  if (!state.initializedFromXHR) {
    // Throw away messages if we haven't received the XHR back yet.
    // Yes, this can result in potential race conditions.
    // We should buffer messages received prior to the XHR, apply them
    // post-XHR receipt, and make all reducers idempotent.
    if (
      ![
        ActionType.SetDivisionsData,
        ActionType.SetTourneyMetadata,
        ActionType.SetTourneyReducedMetadata,
        ActionType.AddActiveGames,
        ActionType.AddActiveGame,
        // These are legacy events for CLUB/LEGACY tournament types

        ActionType.RemoveActiveGame,
        ActionType.AddTourneyGameResult,
        ActionType.AddTourneyGameResults,
        ActionType.SetTourneyGamesOffset,
      ].includes(action.actionType)
    ) {
      return state;
    }
  }

  switch (action.actionType) {
    case ActionType.SetTourneyMetadata: {
      const m = action.payload as {
        directors: Array<string>;
        metadata: TournamentMetadata;
      };
      console.log('gonna set metadata', m);
      return {
        ...state,
        directors: m.directors,
        metadata: m.metadata,
      };
    }
    case ActionType.SetTourneyReducedMetadata: {
      const m = action.payload as TournamentDataResponse;
      console.log('merging metadata', m);
      const newMetadata = state.metadata.clone();
      newMetadata.name = m.name;
      newMetadata.description = m.description;
      return {
        ...state,
        metadata: newMetadata,
      };
    }

    case ActionType.SetDivisionRoundControls: {
      const drc = action.payload as {
        roundControls: DivisionRoundControls;
        loginState: LoginState;
      };
      const division = drc.roundControls.division;
      // copy old stuff
      let newNumRounds = state.divisions[division].numRounds;
      let newRoundControls = state.divisions[division].roundControls;
      let newPairings = copyPairings(state.divisions[division].pairings);
      let newStandings = reduceStandings(
        state.divisions[division].standingsMap,
        {}
      );

      if (!state.started) {
        // This can only be a full set of round controls
        newPairings = new Array<RoundPairings>();
        newRoundControls = drc.roundControls.roundControls;
        newNumRounds = newRoundControls.length;
        for (let i = 0; i < newNumRounds; i++) {
          // reset all pairings
          const newRoundPairings = new Array<SinglePairing>();
          state.divisions[division].players.forEach(() => {
            newRoundPairings.push({} as SinglePairing);
          });
          newPairings.push({ roundPairings: newRoundPairings });
        }
        newPairings = reducePairings(
          state.divisions[division].players,
          state.divisions[division].playerIndexMap,
          newPairings,
          drc.roundControls.divisionPairings
        );
        newStandings = drc.roundControls.divisionStandings;
      } else {
        // This can only be an individual round control in the future.
        newRoundControls = new Array<RoundControl>();
        state.divisions[division].roundControls.forEach((rc: RoundControl) => {
          newRoundControls.push(rc.clone());
        });
        drc.roundControls.roundControls.forEach((rc: RoundControl) => {
          newRoundControls[rc.round] = rc;
        });
      }

      return Object.assign({}, state, {
        divisions: Object.assign({}, state.divisions, {
          [division]: Object.assign({}, state.divisions[division], {
            roundControls: newRoundControls,
            standingsMap: newStandings,
            pairings: newPairings,
            numRounds: newNumRounds,
          }),
        }),
      });
    }

    case ActionType.SetDivisionControls: {
      const dc = action.payload as {
        divisionControlsResponse: DivisionControlsResponse;
        loginState: LoginState;
      };
      const division = dc.divisionControlsResponse.division;

      const newStandings = reduceStandings(
        state.divisions[division].standingsMap,
        dc.divisionControlsResponse.divisionStandings
      );

      return Object.assign({}, state, {
        divisions: Object.assign({}, state.divisions, {
          [division]: Object.assign({}, state.divisions[division], {
            divisionControls: dc.divisionControlsResponse.divisionControls,
            standingsMap: newStandings,
          }),
        }),
      });
    }

    case ActionType.DeleteDivisionPairings: {
      const dp = action.payload as {
        dpdr: DivisionPairingsDeletedResponse;
        loginState: LoginState;
      };
      const division = dp.dpdr.division;
      const newPairings = deletePairings(
        state.divisions[division].pairings,
        dp.dpdr.round
      );
      const newState = Object.assign({}, state, {
        divisions: Object.assign({}, state.divisions, {
          [division]: Object.assign({}, state.divisions[division], {
            pairings: newPairings,
          }),
        }),
      });
      return newState;
    }

    case ActionType.SetDivisionPairings: {
      const dp = action.payload as {
        dpr: DivisionPairingsResponse;
        loginState: LoginState;
      };
      const division = dp.dpr.division;
      const newPairings = reducePairings(
        state.divisions[division].players,
        state.divisions[division].playerIndexMap,
        state.divisions[division].pairings,
        dp.dpr.divisionPairings
      );

      const newStandings = reduceStandings(
        state.divisions[division].standingsMap,
        dp.dpr.divisionStandings
      );

      const fullLoggedInID = `${dp.loginState.userID}:${dp.loginState.username}`;
      const userIndex =
        state.divisions[division].playerIndexMap[fullLoggedInID];
      let newStatus = state.competitorState.status;
      if (userIndex != null) {
        dp.dpr.divisionPairings.forEach((pairing: Pairing) => {
          if (pairing.round === state.divisions[division].currentRound) {
            const pairingPlayers = pairing.players;
            if (
              pairingPlayers &&
              (pairingPlayers[0] === userIndex ||
                pairingPlayers[1] === userIndex)
            ) {
              let playerIndex = 0;
              if (pairingPlayers[1] === userIndex) {
                playerIndex = 1;
              }
              const outcome = pairing.outcomes[playerIndex];
              if (outcome !== TournamentGameResult.NO_RESULT) {
                newStatus = TourneyStatus.ROUND_GAME_FINISHED;
              }
            }
          }
        });
      }

      const finishedGamesMap: { [id: string]: boolean } = {};
      dp.dpr.divisionPairings.forEach((p) => {
        p.games.forEach((tg) => {
          const gameID = tg.id;
          if (tg.gameEndReason) {
            finishedGamesMap[gameID] = true;
          }
        });
      });

      const newActiveGames = state.activeGames.filter(
        (ag) => !finishedGamesMap[ag.gameID]
      );

      const newState = Object.assign({}, state, {
        competitorState: Object.assign({}, state.competitorState, {
          status: newStatus,
        }),
        divisions: Object.assign({}, state.divisions, {
          [division]: Object.assign({}, state.divisions[division], {
            pairings: newPairings,
            standingsMap: newStandings,
          }),
        }),
        activeGames: newActiveGames,
      });
      return newState;
    }

    case ActionType.SetDivisionPlayers: {
      const dp = action.payload as {
        parr: PlayersAddedOrRemovedResponse;
        loginState: LoginState;
      };

      const division = dp.parr.division;
      const respPlayers = dp.parr.players?.persons;
      const newPlayerIndexMap: { [playerID: string]: number } = {};
      const newPlayers = Array<TournamentPerson>();

      respPlayers?.forEach((value: TournamentPerson, index: number) => {
        newPlayerIndexMap[value.id] = index;
        newPlayers.push(value);
      });

      let expandedPairings = copyPairings(state.divisions[division].pairings);
      let newStandings = reduceStandings(
        state.divisions[division].standingsMap,
        {}
      );

      if (
        state.started &&
        newPlayers.length > state.divisions[division].players.length
      ) {
        // Players have been added and the tournament has already started
        // This means we must expand the current pairings
        const numberOfAddedPlayers =
          newPlayers.length - state.divisions[division].players.length;

        expandedPairings.forEach((value: RoundPairings) => {
          for (let i = numberOfAddedPlayers; i >= 0; i--) {
            value.roundPairings.push({} as SinglePairing);
          }
        });
      }

      if (!state.started) {
        expandedPairings = Array<RoundPairings>();
        for (let i = 0; i < state.divisions[division].numRounds; i++) {
          const newRoundPairings = new Array<SinglePairing>();
          newPlayers.forEach(() => {
            newRoundPairings.push({} as SinglePairing);
          });
          expandedPairings.push({ roundPairings: newRoundPairings });
        }
        newStandings = {};
      }

      const newPairings = reducePairings(
        newPlayers,
        newPlayerIndexMap,
        expandedPairings,
        dp.parr.divisionPairings
      );
      newStandings = reduceStandings(newStandings, dp.parr.divisionStandings);

      const fullLoggedInID = `${dp.loginState.userID}:${dp.loginState.username}`;
      const myPreviousDivision = state.competitorState.division;
      console.log('divisions are', state.divisions);
      let myRegisteredDivision: Division | undefined;
      if (fullLoggedInID in newPlayerIndexMap) {
        myRegisteredDivision = state.divisions[division];
      }
      console.log(
        'registered division',
        myRegisteredDivision,
        fullLoggedInID,
        newPlayerIndexMap
      );
      let competitorState: CompetitorState = state.competitorState;

      if (myRegisteredDivision) {
        competitorState = {
          isRegistered: true,
          division: myRegisteredDivision.divisionID,
          currentRound: myRegisteredDivision.currentRound,
          status: tourneyStatus(
            myRegisteredDivision,
            state.activeGames,
            dp.loginState
          ),
        };
      } else {
        competitorState = {
          ...competitorState,
          isRegistered:
            // we're only still registered if we were already registered,
            // and the division we were registered in is not the division that came in
            // (otherwise, it would have listed us as a player)
            myPreviousDivision !== undefined && myPreviousDivision !== division,
        };
      }
      const newState = Object.assign({}, state, {
        competitorState,
        divisions: Object.assign({}, state.divisions, {
          [division]: Object.assign({}, state.divisions[division], {
            pairings: newPairings,
            standingsMap: newStandings,
            playerIndexMap: newPlayerIndexMap,
            players: newPlayers,
          }),
        }),
      });
      return newState;
    }

    case ActionType.SetTournamentFinished: {
      return {
        ...state,
        finished: true,
      };
    }

    case ActionType.SetDivisionData: {
      // Convert the protobuf object to a nicer JS representation:
      const dd = action.payload as {
        divisionMessage: TournamentDivisionDataResponse;
        loginState: LoginState;
      };
      const divData = divisionDataResponseToObj(dd.divisionMessage);
      const fullLoggedInID = `${dd.loginState.userID}:${dd.loginState.username}`;
      let registeredDivision: Division | undefined;
      if (fullLoggedInID in divData.playerIndexMap) {
        registeredDivision = divData;
      }
      let competitorState: CompetitorState = state.competitorState;
      if (registeredDivision) {
        competitorState = {
          isRegistered: true,
          division: registeredDivision.divisionID,
          currentRound: registeredDivision.currentRound,
          status: tourneyStatus(
            registeredDivision,
            state.activeGames,
            dd.loginState
          ),
        };
      }
      return Object.assign({}, state, {
        competitorState,
        divisions: Object.assign({}, state.divisions, {
          [dd.divisionMessage.division]: divData,
        }),
      });
    }

    case ActionType.DeleteDivision: {
      const dd = action.payload as TournamentDivisionDeletedResponse;
      // Only empty divisions can be deleted, so no need to worry about competitor state

      const deleted = dd.division;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [deleted]: _, ...divisions } = state.divisions;

      return Object.assign({}, state, {
        divisions: Object.assign({}, divisions),
      });
    }

    case ActionType.SetDivisionsData: {
      // Handles XHR request for GetDivisions
      const dd = action.payload as {
        fullDivisions: FullTournamentDivisions;
        loginState: LoginState;
      };

      const divisions: { [name: string]: Division } = {};
      const divisionsMap = dd.fullDivisions.divisions;
      const fullLoggedInID = `${dd.loginState.userID}:${dd.loginState.username}`;
      let registeredDivision: Division | undefined;

      for (const [k, v] of Object.entries(divisionsMap)) {
        divisions[k] = divisionDataResponseToObj(v);
        if (fullLoggedInID in divisions[k].playerIndexMap) {
          registeredDivision = divisions[k];
        }
      }

      let competitorState: CompetitorState = state.competitorState;
      if (registeredDivision) {
        console.log(
          'registereddiv',
          registeredDivision,
          'stateactivegames',
          state.activeGames
        );
        competitorState = {
          isRegistered: true,
          division: registeredDivision.divisionID,
          currentRound: registeredDivision.currentRound,
          status: tourneyStatus(
            registeredDivision,
            state.activeGames,
            dd.loginState
          ),
        };
      }

      return {
        ...state,
        started: dd.fullDivisions.started,
        divisions,
        competitorState,
        initializedFromXHR: true,
      };
    }

    case ActionType.StartTourneyRound: {
      const m = action.payload as {
        trs: TournamentRoundStarted;
        loginState: LoginState;
      };
      // Make sure the tournament ID matches. (Why wouldn't it, though?)
      if (state.metadata.id !== m.trs.tournamentId) {
        return state;
      }
      const division = m.trs.division;
      // Mark the round for the passed-in division to be the passed-in round.

      const newDivisions = Object.assign({}, state.divisions, {
        [division]: Object.assign({}, state.divisions[division], {
          currentRound: m.trs.round,
        }),
      });

      const newStatus =
        state.competitorState.division === division
          ? tourneyStatus(
              newDivisions[division],
              state.activeGames,
              m.loginState
            )
          : state.competitorState.status;

      return Object.assign({}, state, {
        started: true,
        divisions: newDivisions,
        competitorState: Object.assign({}, state.competitorState, {
          currentRound:
            state.competitorState.division === division
              ? m.trs.round
              : state.competitorState.currentRound,
          status: newStatus,
        }),
      });
    }

    case ActionType.SetReadyForGame: {
      const m = action.payload as {
        ready: ReadyForTournamentGame;
        loginState: LoginState;
      };

      const registeredDivision = state.competitorState.division;
      if (!registeredDivision) {
        // this should not happen, we should not get a ready state if we
        // are not in some division
        return state;
      }
      const division = state.divisions[registeredDivision];
      const fullPlayerID = `${m.loginState.userID}:${m.loginState.username}`;
      if (m.ready.round !== division.currentRound) {
        // this should not happen, the ready state should always be for the
        // current round.
        console.error('ready state current round does not match');
        return state;
      }
      if (m.ready.division !== registeredDivision) {
        // this should not happen, the ready state should always be for the
        // current division.
        console.error('ready state current division does not match');
        return state;
      }
      const pairing = getPairing(m.ready.round, fullPlayerID, division);
      if (!pairing) {
        return state;
      }
      const newPairing = {
        ...pairing,
        readyStates: [...pairing.readyStates],
      };
      // find out where _we_ are
      let usLoc;
      const involvedIDs = newPairing.players.map((x) => x.id);
      if (newPairing.players[0].id === fullPlayerID) {
        usLoc = 0;
      } else if (newPairing.players[1].id === fullPlayerID) {
        usLoc = 1;
      } else {
        console.error('unexpected usLoc', newPairing);
        return state;
      }
      let toModify;
      if (m.ready.playerId === fullPlayerID) {
        toModify = usLoc;
      } else {
        // it's the opponent
        toModify = 1 - usLoc;
      }

      newPairing.readyStates[toModify] = m.ready.unready ? '' : 'ready';

      const updatedPairings = copyPairings(division.pairings);
      updatedPairings[m.ready.round].roundPairings[
        division.playerIndexMap[involvedIDs[0]]
      ] = newPairing;
      updatedPairings[m.ready.round].roundPairings[
        division.playerIndexMap[involvedIDs[1]]
      ] = newPairing;

      const newRegisteredDiv = Object.assign(
        {},
        state.divisions[registeredDivision],
        {
          pairings: updatedPairings,
        }
      );

      const newCompetitorState = {
        ...state.competitorState,
        status: tourneyStatus(
          newRegisteredDiv,
          state.activeGames,
          m.loginState
        ),
      };

      return Object.assign({}, state, {
        divisions: Object.assign({}, state.divisions, {
          [registeredDivision]: newRegisteredDiv,
        }),
        competitorState: newCompetitorState,
      });
    }

    // For the following two actions, it is important to recalculate
    // the competitorState if it exists; this is because
    // competitorState.status depends on state.activeGames.
    case ActionType.AddActiveGames: {
      const g = action.payload as {
        activeGames: Array<ActiveGame>;
        loginState: LoginState;
      };
      const registeredDivision = state.competitorState.division;
      let newCompetitorState = state.competitorState;
      if (registeredDivision) {
        newCompetitorState = {
          ...state.competitorState,
          status: tourneyStatus(
            state.divisions[registeredDivision],
            g.activeGames,
            g.loginState
          ),
        };
      }

      return {
        ...state,
        activeGames: g.activeGames,
        competitorState: newCompetitorState,
      };
    }

    case ActionType.AddActiveGame: {
      const { activeGames } = state;
      const g = action.payload as {
        activeGame: ActiveGame;
        loginState: LoginState;
      };
      const registeredDivision = state.competitorState.division;
      let newCompetitorState = state.competitorState;
      if (registeredDivision) {
        newCompetitorState = {
          ...state.competitorState,
          status: tourneyStatus(
            state.divisions[registeredDivision],
            [...state.activeGames, g.activeGame],
            g.loginState
          ),
        };
      }

      return {
        ...state,
        activeGames: [...activeGames, g.activeGame],
        competitorState: newCompetitorState,
      };
    }

    case ActionType.RemoveActiveGame: {
      // LEGACY/Clubhouse event. When games end in regular tournaments, we just get
      // a divisions pairing message.
      const { activeGames } = state;
      const g = action.payload as string;

      const newArr = activeGames.filter((ag) => {
        return ag.gameID !== g;
      });
      return {
        ...state,
        activeGames: newArr,
      };
    }

    case ActionType.AddTourneyGameResult: {
      const { finishedTourneyGames, gamesOffset, gamesPageSize } = state;
      const evt = action.payload as TournamentGameEndedEvent;
      const game = TourneyGameEndedEvtToRecentGame(evt);
      // If a tourney game comes in while we're looking at another page,
      // do nothing.
      if (gamesOffset > 0) {
        return state;
      }

      // Bring newest game to the top.
      const newGames = [game, ...finishedTourneyGames];
      if (newGames.length > gamesPageSize) {
        newGames.length = gamesPageSize;
      }

      return {
        ...state,
        finishedTourneyGames: newGames,
      };
    }

    case ActionType.AddTourneyGameResults: {
      const finishedTourneyGames = action.payload as Array<RecentGame>;
      return {
        ...state,
        finishedTourneyGames,
      };
    }

    case ActionType.SetTourneyGamesOffset: {
      const offset = action.payload as number;
      return {
        ...state,
        gamesOffset: offset,
      };
    }
  }
  throw new Error(`unhandled action type ${action.actionType}`);
}
