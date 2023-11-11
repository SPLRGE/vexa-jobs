ALTER TABLE "posts" ALTER COLUMN "isActive" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "description" varchar(256) NOT NULL;