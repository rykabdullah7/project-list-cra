import React, { useState, useEffect } from 'react';
import axiosInstance from './axios-instance';
import {useUserContext} from './user-context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

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
    <Form className='mx-auto p-5 mb-5 add-project' onSubmit={handleSubmit}>
      <Row>
        <Form.Group className="col-md-4">
          <Form.Label htmlFor="name">Name</Form.Label >
          <Form.Control
            type="text"
            name="name"
            className='input'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="col-md-4">
          <Form.Label  htmlFor="budget">Budget</Form.Label >
          <Form.Control
            type="text"
            name="budget"
            className='input'
            value={formData.budget}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="col-md-4">
          <Form.Label  htmlFor="timeline">Timeline</Form.Label >
          <Form.Control
            type="text"
            name="timeline"
            className='input'
            value={formData.timeline}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="col-md-10">
          <Form.Label  htmlFor="description">Description</Form.Label >
          <Form.Control
            as="textarea"
            name="description"
            className='input'
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit" className="col-md-2 add-btn my-5">
          Add Project
        </Button>
      </Row>
    </Form>
  );
}

export default AddProject;
