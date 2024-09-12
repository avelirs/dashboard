const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      user: req.user.userId,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    console.log("User ID from token:", req.user.userId); // Add this line
    const projects = await Project.find({ user: req.user.userId }).sort({
      order: 1,
    });
    res.json(projects);
  } catch (error) {
    console.error("Error in getProjects:", error); // Add this line
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { ...req.body, order: req.body.order },
      { new: true }
    );
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
