import * as migration_20251119_021649_base from "./20251119_021649_base";
import * as migration_20251124_003454 from "./20251124_003454";

export const migrations = [
  {
    up: migration_20251119_021649_base.up,
    down: migration_20251119_021649_base.down,
    name: "20251119_021649_base",
  },
  {
    up: migration_20251124_003454.up,
    down: migration_20251124_003454.down,
    name: "20251124_003454",
  },
];
