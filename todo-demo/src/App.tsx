import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Task } from './shared/Task'
import { remult } from 'remult';
import { TasksController } from './shared/TasksController';

const taskRepo = remult.repo(Task);

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  useEffect(() => {
    taskRepo.find().then(setTasks);
  }, []);

  const addTask = async () => {
    if (newTaskTitle) {
      setTasks([...tasks, await taskRepo.insert({
        title: newTaskTitle
      })]);
      setNewTaskTitle('');
    }
  };
  const setAll = async (completed: boolean) => {
    await TasksController.setAll(completed);
    setTasks(await taskRepo.find());
  };

  return <main>
    <h2>Todos </h2>
    <input value={newTaskTitle}
      onChange={e => setNewTaskTitle(e.target.value)}
      onBlur={addTask}
    />
    <ul>
      {tasks.map(task => {
        const deleteTask = async () => {
          await taskRepo.delete(task);
          setTasks(tasks.filter(t => t !== task));
        }

        const setCompleted = async (completed: boolean) => {
          const updatedTask = await taskRepo.save({ ...task, completed });
          replaceTask(updatedTask);
        }

        const replaceTask = (updatedTask: Task) => {
          setTasks(tasks.map(t => t === task ? updatedTask : t));
        }

        const setTitle = (title: string) => {
          const updatedTask = { ...task, title };
          replaceTask(updatedTask);
        }
        const saveTask = async () => {
          try {
            replaceTask(await taskRepo.save(task));
          } catch (err: any) {
            alert(err.message);
          }
        }

        return (<li key={task.id}>
          <input type="checkbox" checked={task.completed}
            onChange={e => setCompleted(e.target.checked)}
          />
          <input
            value={task.title}
            onChange={e => setTitle(e.target.value)}
            onBlur={saveTask}
          />
          <button onClick={deleteTask} >x</button>
        </li>)
      })}
    </ul>
    <button onClick={() => setAll(!tasks.find(t => t.completed))}>Toggle Completed</button>
  </main>
}

export default App
