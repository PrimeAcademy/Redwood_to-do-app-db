CREATE TABLE "tasks"(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
  	"isComplete" BOOLEAN DEFAULT FALSE
 );
  
  
-- Adding a new task to DB

INSERT INTO "tasks" ("task")
	VALUES ('groceries');
	
-- Update isComplete for task

UPDATE "tasks" SET "isComplete"= NOT "isComplete" WHERE "id"=1;

-- Delete item from DB by id

DELETE FROM "tasks"
	WHERE "id"=3;