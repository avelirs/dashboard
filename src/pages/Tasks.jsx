import { useState, useEffect } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  fetchProjects,
} from "../api/apicalls.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    project: "",
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
    loadProjects();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask(newTask);
      setNewTask({ title: "", description: "", status: "To Do", project: "" });
      loadTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await updateTask(editingTask._id, editingTask);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Tasks</h1>

      <form onSubmit={handleCreateTask} className='mb-4'>
        <Input
          type='text'
          placeholder='Task Title'
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
          className='mb-2'
        />
        <Input
          type='text'
          placeholder='Description'
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className='mb-2'
        />
        <Select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className='mb-2'
        >
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </Select>
        <Select
          value={newTask.project}
          onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
          className='mb-2'
        >
          <option value=''>Select a project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </Select>
        <Button type='submit'>Create Task</Button>
      </form>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {tasks.map((task) => (
          <Card key={task._id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Project: {task.project.name}</p>
              <div className='mt-4'>
                <Button onClick={() => setEditingTask(task)} className='mr-2'>
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteTask(task._id)}
                  variant='destructive'
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingTask && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <Card className='w-96'>
            <CardHeader>
              <CardTitle>Edit Task</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateTask}>
                <Input
                  type='text'
                  placeholder='Task Title'
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  required
                  className='mb-2'
                />
                <Input
                  type='text'
                  placeholder='Description'
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  className='mb-2'
                />
                <Select
                  value={editingTask.status}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, status: e.target.value })
                  }
                  className='mb-2'
                >
                  <option value='To Do'>To Do</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Done'>Done</option>
                </Select>
                <Select
                  value={editingTask.project}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, project: e.target.value })
                  }
                  className='mb-2'
                >
                  <option value=''>Select a project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </Select>
                <Button type='submit' className='mr-2'>
                  Update
                </Button>
                <Button
                  onClick={() => setEditingTask(null)}
                  variant='secondary'
                >
                  Cancel
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
