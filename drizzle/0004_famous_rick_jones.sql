ALTER TABLE "posts" DROP CONSTRAINT "posts_createdBy_users_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "createdBy" DROP NOT NULL;