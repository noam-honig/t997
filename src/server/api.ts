import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
import { TasksController } from "../shared/TasksController";
import { createPostgresConnection } from "remult/postgres";
export const api = remultExpress({
  dataProvider: createPostgresConnection({
    connectionString: process.env['DATABASE_URL'] || "postgres://postgres:MASTERKEY@localhost/postgres"
  }),
  getUser: request => request.session!['user'],
  entities: [Task],
  controllers: [TasksController]
});
