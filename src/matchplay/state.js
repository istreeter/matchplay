// @flow

import type {Player} from './model';

export type State = {|
  +players?: $ReadOnlyArray<Player>,
  +selectedPlayers: $ReadOnlyArray<Player>,
|};
