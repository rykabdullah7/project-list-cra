import React, { useState, useEffect } from 'react';
import axiosInstance from './axios-instance';
import {useUserContext} from './user-context';

function AddProject({ onAddProject, onFormSubmit }) {
  const token = useUserContext();
  const [formData, setFormData] = useState({
    projectId:'',
    name: '',
    budget: '',
    timeline: '',
    description: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []); 

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('/projects', {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        const projects = response.data;
        if (projects.length === 0) {
          // If there are no projects, start with projectId '1'
          setFormData({ ...formData, projectId: '1' });
        } else {
          
          const lastProject = projects[projects.length - 1];
          const lastProjectId = lastProject.projectId;
          const newProjectId = (parseInt(lastProjectId) + 1).toString();
          setFormData({ ...formData, projectId: newProjectId });
        }
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = [formData];

      const response = await axiosInstance.post('/projects', projectData, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });


      if (response.status === 204) {

       onAddProject();

        setFormData({
          projectId:'',
          name: '',
          budget: '',
          timeline: '',
          description: '',
        });

        onFormSubmit();
      } else {
        console.error('Failed to create a new project');
      }
    } catch (error) {
      console.error('Error creating a new project:', error);
    }
  };

  return (
    <form className='mx-auto add-project' onSubmit={handleSubmit}>
      <div className='form-row'>

        <div className="form-group col-md-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="budget">Budget</label>
          <input
            type="text"
            className="form-control"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="timeline">Timeline</label>
          <input
            type="text"
            className="form-control"

            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>



      <div className='form-row'>
        <div className="form-group col-md-10">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary col-md-2 my-5">
          Add Project
        </button>
      </div>
    </form>
  );
}

export default AddProject;
