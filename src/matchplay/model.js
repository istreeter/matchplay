// @flow

export type Player = {|
    +id: number,
    +name: string,
    +color: string,
    +played: number,
    +won: number,
    +precedence: Date,
  |};

export type PlayerScorecard = {|
    +player: number,
    +points: $ReadOnlyArray<number>,
  |};

export type Game = {|
    +date: Date,
    +winner?: number,
    +scores : PlayerScorecard,
  |};
