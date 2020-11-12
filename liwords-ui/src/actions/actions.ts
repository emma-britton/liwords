export type Action = {
  actionType: ActionType;
  payload: unknown;
};

export enum ActionType {
  /* lobby actions */
  AddSoughtGame,
  AddSoughtGames,
  RemoveSoughtGame,

  AddMatchRequest,
  AddMatchRequests,

  AddActiveGame,
  AddActiveGames,
  RemoveActiveGame,

  /* tourney actions */
  AddTourneyGame,
  AddTourneyGames,

  /* game actions */
  AddGameEvent,
  RefreshTurns,
  RefreshHistory,
  ClearHistory,
  EndGame,

  /* login state actions */
  SetAuthentication,
  SetConnectedToSocket,
  SetCurrentLagMs,
}
