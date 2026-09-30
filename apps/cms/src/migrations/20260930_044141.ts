import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "projects_blocks_paragraph_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "projects_blocks_paragraph_content" ADD CONSTRAINT "projects_blocks_paragraph_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_blocks_paragraph_content_order_idx" ON "projects_blocks_paragraph_content" USING btree ("_order");
  CREATE INDEX "projects_blocks_paragraph_content_parent_id_idx" ON "projects_blocks_paragraph_content" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_paragraph_content_path_idx" ON "projects_blocks_paragraph_content" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_blocks_paragraph_content" CASCADE;`)
}
