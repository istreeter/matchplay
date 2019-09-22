// @flow

import type {Player, Game} from './model';

export type State = {|
  +players?: $ReadOnlyMap<number, Player>,
  +selectedPlayers: $ReadOnlyMap<number, Player>,
  +gameId?: number,
  +game?: Game,
|};
