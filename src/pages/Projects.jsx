import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  fetchProjects,
  updateProject,
  createProject,
  deleteProject,
} from "../api/apicalls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setError(null);
      const data = await fetchProjects();
      console.log("Fetched projects:", data);
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
      setError("Failed to load projects. Please try again later.");
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const newProjectData = await createProject(newProject);
      setProjects([...projects, newProjectData]);
      setNewProject({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project. Please try again.");
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      await updateProject(editingProject._id, editingProject);
      setEditingProject(null);
      loadProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      setError("Failed to update project. Please try again.");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      loadProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Failed to delete project. Please try again.");
    }
  };

  const onDragEnd = async (result) => {
    console.log("onDragEnd called", result);
    if (!result.destination) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedProjects = items.map((project, index) => ({
      ...project,
      order: index,
    }));

    setProjects(updatedProjects);

    try {
      await updateProject(reorderedItem._id, {
        order: result.destination.index,
      });
    } catch (error) {
      console.error("Error updating project order:", error);
      setError("Failed to update project order. Please try again.");
      loadProjects();
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Projects</h1>
      {error && <p className='text-red-500'>{error}</p>}

      <form onSubmit={handleCreateProject} className='mb-4'>
        <Input
          type='text'
          placeholder='Project Name'
          value={newProject.name}
          onChange={(e) =>
            setNewProject({ ...newProject, name: e.target.value })
          }
          required
          className='mb-2'
        />
        <Input
          type='text'
          placeholder='Description'
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          className='mb-2'
        />
        <Button type='submit'>Create Project</Button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        {projects.length > 0 ? (
          <Droppable droppableId='projects'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {projects.map((project, index) => (
                  <Draggable
                    key={project._id}
                    draggableId={project._id}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='mb-4'
                      >
                        <CardHeader>
                          <CardTitle>{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{project.description}</p>
                          <div className='mt-4'>
                            <Button
                              onClick={() => setEditingProject(project)}
                              className='mr-2'
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteProject(project._id)}
                              variant='destructive'
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          <p>No projects available.</p>
        )}
      </DragDropContext>

      {editingProject && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <Card className='w-96'>
            <CardHeader>
              <CardTitle>Edit Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProject}>
                <Input
                  type='text'
                  placeholder='Project Name'
                  value={editingProject.name}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      name: e.target.value,
                    })
                  }
                  required
                  className='mb-2'
                />
                <Input
                  type='text'
                  placeholder='Description'
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  className='mb-2'
                />
                <Button type='submit' className='mr-2'>
                  Update
                </Button>
                <Button
                  onClick={() => setEditingProject(null)}
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
};

export default Projects;
