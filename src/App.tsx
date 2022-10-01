import { useEffect, useState } from "react"
import { remult } from "remult";
import { Task } from "./shared/Task"

const taskRepo = remult.repo(Task);

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const addTask = async () => {
    if (newTask) {
      const task = await taskRepo.insert({
        title: newTask
      })
      setTasks([...tasks, task])
      setNewTask('');
    }
  }
  const setAllCompleted = async (completed: boolean) => {
    for (const task of await taskRepo.find()) {
      await taskRepo.save({ ...task, completed });
    }
    setTasks(await taskRepo.find());
  }
  useEffect(() => {
    taskRepo.find({
      where: {
        completed: undefined
      }
    }).then(setTasks);
  }, []);
  return <>
    <h2>Todos</h2>
    <main>
      <input placeholder="What needs to be done"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter")
            addTask()
        }} />
      <ul>
        {tasks.map(task => {
          const deleteTask = async () => {
            await taskRepo.delete(task);
            setTasks(tasks.filter(t => t !== task));
          }
          const setCompleted = async (completed: boolean) => {
            const savedTask = await taskRepo.save({ ...task, completed });
            replaceTask(savedTask);
          };
          const replaceTask = (theTask: Task) => {
            setTasks(tasks.map(t => t === task ? theTask : t));
          }
          const setTitle = async (title: string) => {
            const t = { ...task, title };
            replaceTask(t);
          }
          const saveTask = async () => {
            try {
              const savedTask = await taskRepo.save(task);
              replaceTask(savedTask);
            } catch (error: any) {
              alert(error.message)
            }
          }
          return <li key={task.id}>
            <input type="checkbox" checked={task.completed}
              onChange={e => setCompleted(e.target.checked)}
            />
            <input value={task.title}
              onChange={e => setTitle(e.target.value)}
              onBlur={saveTask}
            />
            <button onClick={deleteTask}>X</button>
          </li>
        })}
      </ul>
      <button>Set All Completed</button>
      <button>Set All UnCompleted</button>
    </main>
  </>
}

export default App
