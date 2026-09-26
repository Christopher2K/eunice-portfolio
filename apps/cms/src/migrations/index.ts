import * as migration_20260619_020020 from "./20260619_020020";
import * as migration_20260926_210358_add_reset_password_requested_at from "./20260926_210358_add_reset_password_requested_at";

export const migrations = [
  {
    up: migration_20260619_020020.up,
    down: migration_20260619_020020.down,
    name: "20260619_020020",
  },
  {
    up: migration_20260926_210358_add_reset_password_requested_at.up,
    down: migration_20260926_210358_add_reset_password_requested_at.down,
    name: "20260926_210358_add_reset_password_requested_at",
  },
];
