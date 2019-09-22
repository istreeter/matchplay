// @flow
//
import { openDB, deleteDB } from 'idb';

const dbPromise = async () => {
  await deleteDB('matchplay');
  return await openDB('matchplay2', 1, {
    upgrade(upgradeDB) {
      const playerOs = upgradeDB.createObjectStore('player', {autoIncrement: true});
      playerOs.createIndex('precedence', 'precedence');
      upgradeDB.createObjectStore('game', {autoIncrement: true});
    }
  });
}

export default dbPromise();
