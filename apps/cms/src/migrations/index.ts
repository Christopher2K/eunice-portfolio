import * as migration_20260619_020020 from './20260619_020020';

export const migrations = [
  {
    up: migration_20260619_020020.up,
    down: migration_20260619_020020.down,
    name: '20260619_020020'
  },
];
