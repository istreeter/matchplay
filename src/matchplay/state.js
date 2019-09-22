// @flow

import type {Player} from './model';

export type State = {|
  +players?: $ReadOnlyMap<number, Player>,
  +selectedPlayers: $ReadOnlyMap<number, Player>,
|};
