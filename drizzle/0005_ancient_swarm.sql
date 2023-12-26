DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE set null ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
