import React, { useState, useEffect } from 'react';
import Table from './table';
import Project from './project';

import axiosInstance from './axios-intercepter';

function ProjectList() {
  const [projects, setProjects] = useState([]);
 

  useEffect(() => {
    fetchProjects();
  },[]);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('/projects');
      
      if (response.status === 200) {
        const data = await response.data;
     
        setProjects(data);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleToggleProject = (index, field) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        isStarred: !updatedProjects[index].isStarred,
      };
      return updatedProjects;
    });
  };

  const handleHideProject = (index, field) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      const isStarred = updatedProjects[index].isStarred;
      if (!isStarred) {
        updatedProjects[index].hidden = true;
      }
      return updatedProjects;
    });
  };

  const showHiddenProjects = () => {
    setProjects(
      projects.map(project => ({...project,hidden:false}))
    )
  };

  return (
    <>
      <h1>Project Portal</h1>
      <button
        id="unhide"
        className="btn btn-primary"
        onClick={showHiddenProjects}
      >
        Show all projects
      </button>
      <div className="clear"></div>
      <div>
        <Table>
          {projects.map((project, index) =>
            project.hidden ? null : (
              <Project
                key={project.id} 
                project={project}
                onStarClick={() => handleToggleProject(index, 'isStarred')}
                onHideClick={() => handleHideProject(index, 'hidden')}
              />
            )
          )}
        </Table>
      </div>
    </>
  );
}

export default ProjectList;
