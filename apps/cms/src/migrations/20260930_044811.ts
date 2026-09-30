import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_projects_blocks_media_content_type" ADD VALUE 'portrait' BEFORE 'dual';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_blocks_media_content" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_projects_blocks_media_content_type";
  CREATE TYPE "public"."enum_projects_blocks_media_content_type" AS ENUM('fullWidth', 'landscape', 'dual', 'grid');
  ALTER TABLE "projects_blocks_media_content" ALTER COLUMN "type" SET DATA TYPE "public"."enum_projects_blocks_media_content_type" USING "type"::"public"."enum_projects_blocks_media_content_type";`)
}
