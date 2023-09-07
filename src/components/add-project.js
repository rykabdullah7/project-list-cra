import React, { useState, useContext } from 'react';
import axiosInstance from './axios-instance';
import UserContext from './user-context';

function AddProject({ onAddProject, onFormSubmit }) {
  const token = useContext(UserContext);
  const [formData, setFormData] = useState({
    projectId: '',
    name: '',
    budget: '',
    timeline: '',
    description: '',
  });

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

        onAddProject(formData);

        setFormData({
          projectId: '',
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
        <div className="form-group col-md-6">
          <label htmlFor="projectId">Project ID</label>
          <input
            type="text"
            className="form-control"
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className='form-row'>
        <div className="form-group col-md-6">
          <label htmlFor="budget">Budget</label>
          <input
            type="text"
            className="form-control"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="timeline">Timeline</label>
          <input
            type="text"
            className="form-control"
            id="timeline"
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
            id="description"
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
