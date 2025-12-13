import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_ratio" AS ENUM('1/1', '2/3', '3/4', '4/3', '16/9');
  CREATE TYPE "public"."enum_media_dispositions_type" AS ENUM('fullWidth', 'landscape', 'dual', 'grid');
  CREATE TABLE "project_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_dispositions_id" integer
  );
  
  CREATE TABLE "media_dispositions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_media_dispositions_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media_dispositions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "projects" RENAME COLUMN "title" TO "name";
  ALTER TABLE "media" ADD COLUMN "ratio" "enum_media_ratio" NOT NULL;
  ALTER TABLE "media" ADD COLUMN "caption" varchar;
  ALTER TABLE "projects" ADD COLUMN "_order" varchar;
  ALTER TABLE "projects" ADD COLUMN "client" varchar NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "agency" varchar NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "website" varchar;
  ALTER TABLE "projects" ADD COLUMN "description" jsonb;
  ALTER TABLE "projects" ADD COLUMN "project_type_id" integer NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "main_image_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "project_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_dispositions_id" integer;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_dispositions_fk" FOREIGN KEY ("media_dispositions_id") REFERENCES "public"."media_dispositions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_dispositions_rels" ADD CONSTRAINT "media_dispositions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media_dispositions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_dispositions_rels" ADD CONSTRAINT "media_dispositions_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "project_types_updated_at_idx" ON "project_types" USING btree ("updated_at");
  CREATE INDEX "project_types_created_at_idx" ON "project_types" USING btree ("created_at");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_media_dispositions_id_idx" ON "projects_rels" USING btree ("media_dispositions_id");
  CREATE INDEX "media_dispositions_updated_at_idx" ON "media_dispositions" USING btree ("updated_at");
  CREATE INDEX "media_dispositions_created_at_idx" ON "media_dispositions" USING btree ("created_at");
  CREATE INDEX "media_dispositions_rels_order_idx" ON "media_dispositions_rels" USING btree ("order");
  CREATE INDEX "media_dispositions_rels_parent_idx" ON "media_dispositions_rels" USING btree ("parent_id");
  CREATE INDEX "media_dispositions_rels_path_idx" ON "media_dispositions_rels" USING btree ("path");
  CREATE INDEX "media_dispositions_rels_media_id_idx" ON "media_dispositions_rels" USING btree ("media_id");
  ALTER TABLE "projects" ADD CONSTRAINT "projects_project_type_id_project_types_id_fk" FOREIGN KEY ("project_type_id") REFERENCES "public"."project_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_types_fk" FOREIGN KEY ("project_types_id") REFERENCES "public"."project_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_dispositions_fk" FOREIGN KEY ("media_dispositions_id") REFERENCES "public"."media_dispositions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects__order_idx" ON "projects" USING btree ("_order");
  CREATE INDEX "projects_project_type_idx" ON "projects" USING btree ("project_type_id");
  CREATE INDEX "projects_main_image_idx" ON "projects" USING btree ("main_image_id");
  CREATE INDEX "payload_locked_documents_rels_project_types_id_idx" ON "payload_locked_documents_rels" USING btree ("project_types_id");
  CREATE INDEX "payload_locked_documents_rels_media_dispositions_id_idx" ON "payload_locked_documents_rels" USING btree ("media_dispositions_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "project_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_dispositions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_dispositions_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "project_types" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "media_dispositions" CASCADE;
  DROP TABLE "media_dispositions_rels" CASCADE;
  ALTER TABLE "projects" RENAME COLUMN "name" TO "title";
  ALTER TABLE "projects" DROP CONSTRAINT "projects_project_type_id_project_types_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_main_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_project_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_dispositions_fk";
  
  DROP INDEX "projects__order_idx";
  DROP INDEX "projects_project_type_idx";
  DROP INDEX "projects_main_image_idx";
  DROP INDEX "payload_locked_documents_rels_project_types_id_idx";
  DROP INDEX "payload_locked_documents_rels_media_dispositions_id_idx";
  ALTER TABLE "media" DROP COLUMN "ratio";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "projects" DROP COLUMN "_order";
  ALTER TABLE "projects" DROP COLUMN "client";
  ALTER TABLE "projects" DROP COLUMN "agency";
  ALTER TABLE "projects" DROP COLUMN "website";
  ALTER TABLE "projects" DROP COLUMN "description";
  ALTER TABLE "projects" DROP COLUMN "project_type_id";
  ALTER TABLE "projects" DROP COLUMN "main_image_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "project_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_dispositions_id";
  DROP TYPE "public"."enum_media_ratio";
  DROP TYPE "public"."enum_media_dispositions_type";`);
}
