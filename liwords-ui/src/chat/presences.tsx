import React from 'react';
import { PresenceEntity } from '../store/store';

type Props = {
  players: { [uuid: string]: PresenceEntity };
};

export const Presences = React.memo((props: Props) => {
  const vals = Object.values(props.players);
  vals.sort((a, b) => (a.username < b.username ? -1 : 1));

  const profileLink = (player: PresenceEntity) => (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={`../profile/${player.username}`}
      key={player.uuid}
    >
      {player.username}
    </a>
  );
  const knownUsers = Object.keys(props.players).filter(
    (p) => !props.players[p].anon
  );
  const presences = knownUsers
    .map<React.ReactNode>((u) => profileLink(props.players[u]))
    .reduce((prev, curr) => [prev, ', ', curr]);
  const anonCount = Object.keys(props.players).length - knownUsers.length;
  return (
    <>
      {presences}
      <span className="anonymous">
        {anonCount === 1 ? ' and 1 anonymous viewer' : null}
        {anonCount > 1 ? ` and ${anonCount} anonymous viewers` : null}
      </span>
    </>
  );
});
