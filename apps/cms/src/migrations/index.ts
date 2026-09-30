import * as migration_20260619_020020 from './20260619_020020';
import * as migration_20260926_210358_add_reset_password_requested_at from './20260926_210358_add_reset_password_requested_at';
import * as migration_20260930_030820_add_home_global from './20260930_030820_add_home_global';
import * as migration_20260930_032545_change_home_opacity_default_to_zero from './20260930_032545_change_home_opacity_default_to_zero';
import * as migration_20260930_044141 from './20260930_044141';

export const migrations = [
  {
    up: migration_20260619_020020.up,
    down: migration_20260619_020020.down,
    name: '20260619_020020',
  },
  {
    up: migration_20260926_210358_add_reset_password_requested_at.up,
    down: migration_20260926_210358_add_reset_password_requested_at.down,
    name: '20260926_210358_add_reset_password_requested_at',
  },
  {
    up: migration_20260930_030820_add_home_global.up,
    down: migration_20260930_030820_add_home_global.down,
    name: '20260930_030820_add_home_global',
  },
  {
    up: migration_20260930_032545_change_home_opacity_default_to_zero.up,
    down: migration_20260930_032545_change_home_opacity_default_to_zero.down,
    name: '20260930_032545_change_home_opacity_default_to_zero',
  },
  {
    up: migration_20260930_044141.up,
    down: migration_20260930_044141.down,
    name: '20260930_044141'
  },
];
