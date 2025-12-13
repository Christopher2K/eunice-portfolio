import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/Media";
import { MediaDispositions } from "./collections/MediaDispositions";
import { Projects } from "./collections/Projects";
import { ProjectTypes } from "./collections/ProjectTypes";
import { Users } from "./collections/Users";
import { env } from "./env/server";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ProjectTypes, Projects, MediaDispositions],
  cors: "*",
  csrf: ["http://localhost:3000"],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    push: true,
    prodMigrations: migrations,
    pool: {
      connectionString: env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: env.S3_BUCKET,
      config: {
        forcePathStyle: true,
        disableHostPrefix: true,
        region: env.S3_REGION,
        endpoint: env.S3_HOST,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID,
          secretAccessKey: env.S3_ACCESS_SECRET_KEY,
        },
      },
    }),
  ],
});
