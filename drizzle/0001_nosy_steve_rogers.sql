ALTER TABLE "posts" DROP CONSTRAINT "posts_categoryId_categories_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
