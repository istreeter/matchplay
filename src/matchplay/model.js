// @flow

export type DbPlayer = {|
    +name: string,
    +color: string,
    +played: number,
    +won: number,
    +precedence: Date,
  |};

export type Player = {|
  id: number,
  ...DbPlayer,
|};

export type PlayerScorecard = {|
    +player: number,
    +points: $ReadOnlyArray<number>,
  |};

export type Game = {|
    +date: Date,
    +winner?: number,
    +scores : $ReadOnlyArray<PlayerScorecard>,
  |};
