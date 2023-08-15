import React, {useState } from 'react';
import Table from './table';
import Project from './project';


function ProjectList() {
  const [projects, setProjects] = useState([
    { name: 'project 1', hidden: false, isStarred: false },
    { name: 'project 2', hidden: false, isStarred: false },
    { name: 'project 3', hidden: false, isStarred: false },
    { name: 'project 4', hidden: false, isStarred: false },
    { name: 'project 5', hidden: false, isStarred: false },
    { name: 'project 6', hidden: false, isStarred: false },
    { name: 'project 7', hidden: false, isStarred: false },
    { name: 'project 8', hidden: false, isStarred: false }
  ]);

  const handleStarClick = (index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        isStarred: !updatedProjects[index].isStarred,
      };
      return updatedProjects;
    });
  };

  const handleHideClick = (index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      const isStarred = updatedProjects[index].isStarred;
      if (!isStarred) {
        updatedProjects[index].hidden = true;
      }
      return updatedProjects;
    });
  };

  const showHiddenProjects = ()=>{
    setProjects(
      projects.map(project => ({...project,hidden:false}))
    )
  }

  return (
    <>
      <h1>Project Portal</h1>
      <button id="unhide" className="btn btn-primary" onClick={showHiddenProjects}>
        Show all projects
      </button>
      <div className="clear"></div>
      <div>
        <Table>

        {projects.map((project, index) => (
            <Project
              key={index}
              project={project}
              onStarClick={() => handleStarClick(index)}
              onHideClick={() => handleHideClick(index)}
            />
          ))}
        </Table>
      </div>
    </>
  );
}

export default ProjectList;
