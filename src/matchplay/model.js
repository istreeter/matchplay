// @flow

export type Player = {|
    +name: string,
    +color: string,
    +played: number,
    +won: number,
    +precedence: Date,
  |};

export type Game = {|
    +date: Date,
    +winner?: number,
    +players: $ReadOnlyArray<number>,
    +holes: $ReadOnlyArray<$ReadOnlyMap<number, number>>, // map from playerId to points
  |};
