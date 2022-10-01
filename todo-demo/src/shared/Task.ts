import { Allow, Entity, Fields, Validators } from "remult";

@Entity("tasks", {
  allowApiCrud: true
})
export class Task {
  @Fields.autoIncrement()
  id = 0;
  @Fields.string<Task>({
    validate: task => {
      if (task.title.length < 3)
        throw new Error("Too Short");
    }
  })
  title = '';
  @Fields.boolean()
  completed = false;
}