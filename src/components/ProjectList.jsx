import { useState } from "react";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  return <div>ProjectList</div>;
}

export default ProjectList;
