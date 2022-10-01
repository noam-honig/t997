import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
import { TasksController } from "../shared/TasksController";
export const api = remultExpress({
  getUser:request=>request.session!['user'],
  entities: [Task],
  controllers:[TasksController]
});
