// @flow
//
import { openDB } from 'idb';

const dbPromise : Promise<Object> = openDB('matchplay', 1, {
  upgrade(upgradeDB) {
    if (!upgradeDB.objectStoreNames.contains('player')) {
      upgradeDB.createObjectStore('player', {keyPath: 'id'});
    }
    if (!upgradeDB.objectStoreNames.contains('game')) {
      upgradeDB.createObjectStore('game', {autoIncrement: true});
    }
  }
});

export default dbPromise;
