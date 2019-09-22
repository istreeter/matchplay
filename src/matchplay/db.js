// @flow
//
import { openDB, deleteDB } from 'idb';

const dbPromise = async () => {
  await deleteDB('matchplay');
  return await openDB('matchplay2', 1, {
    upgrade(upgradeDB) {
      const playerOs = upgradeDB.createObjectStore('player', {autoIncrement: true});
      playerOs.createIndex('precedence', 'precedence');

      const gameOs = upgradeDB.createObjectStore('game', {autoIncrement: true});
      gameOs.createIndex('date', 'date');
    }
  });
}

export default dbPromise();
