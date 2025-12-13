{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  env = {
    POSTGRES_USER = "postgres";
    POSTGRES_PASSWORD = "postgres";
    POSTGRES_DB = "eunice-cms";
    DATABASE_URI = "postgres://postgres:postgres@localhost:5432/eunice-cms";

    S3_HOST = "http://127.0.0.1:9000";
    S3_ACCESS_KEY_ID = "bcsjX40Ze53gINavlU2y";
    S3_ACCESS_SECRET_KEY = "Sa6RNTBGbm9w35DIYfvLFQ4ApHUZe1MVW27CdcEP";
    S3_BUCKET = "payload-cms";
    S3_REGION = "us-east-1";

    PAYLOAD_SECRET = "a9d06e1c9974e7e6416d5006c1bd169e6d942772e2dd3226a481acc48e3e40f0";

    PAYLOAD_URL = "http://localhost:3001";
    PORTFOLIO_URL = "http://localhost:3000";
  };

  services.postgres = {
    enable = true;
    package = pkgs.postgresql_17_jit;
    listen_addresses = "127.0.0.1";
    initialDatabases = [
      {
        name = config.env.POSTGRES_DB;
        pass = config.env.POSTGRES_PASSWORD;
        user = config.env.POSTGRES_USER;
      }
    ];
    port = 5432;
  };

  services.minio = {
    enable = true;
    region = config.env.S3_REGION;
    accessKey = config.env.S3_ACCESS_KEY_ID;
    secretKey = config.env.S3_ACCESS_SECRET_KEY;
    buckets = [ config.env.S3_BUCKET ];
  };

  # https://devenv.sh/scripts/
  processes."dev:cms".exec = ''
    pnpm --filter cms dev
  '';

  processes."dev:portfolio".exec = ''
    pnpm --filter portfolio dev
  '';
}
