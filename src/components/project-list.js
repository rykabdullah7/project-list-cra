import React, { useState, useEffect} from 'react';
import axiosInstance from './axios-instance';
import ProjectsTable from './table';
import Project from './project';
import {useUserContext} from './user-context';
import AddProject from './add-project';
import Button  from 'react-bootstrap/Button';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const token = useUserContext();
  const [showForm, setShowForm] = useState(false);

  const closeForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('/projects', {
        headers: {
          Authorization: token,
        }
      });

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
      projects.map(project => ({ ...project, hidden: false }))
    )
  };

  return (
    <>
      <h1>Project Portal</h1>
      <div className='container'>

        <Button
          id="unhide"
          onClick={showHiddenProjects}
        >
          Show all projects
        </Button>

        {showForm ? (
          <Button className="cancel" onClick={closeForm}>
            Cancel
          </Button>
        ) : (
          <Button
            className="add-project-btn"
            onClick={() => setShowForm(true)}
          >
            Add Project
          </Button>
        )}
      </div>


      {showForm && (
        <AddProject
          onAddProject={fetchProjects}
          token={token}
          onFormSubmit={closeForm}
        />
      )}

      <div className="clear"></div>
      <div>
        <ProjectsTable>
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
        </ProjectsTable>
      </div>
    </>
  );
}

export default ProjectList;
