import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    async function handleLoginSubmit(event) {
        event.preventDefault();
        try {
            
            const baseUrl = 'https://app.sheetlabs.com/ARBI/auth';
            const queryParams = new URLSearchParams({
                username: email,
                password: password,
            });

            const url = `${baseUrl}?${queryParams}`;

            const response = await fetch(url, {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json;UTF',
                },
            });

            
            if (response.ok) {
                const data = await response.json();
                const sNo = data[0].sNo;
                const accessToken = data[0].token;
                if (sNo) {
                    sessionStorage.setItem('accessToken', accessToken);
                }
                    props.onLoginSuccess(accessToken);
                    navigate('/project-list');
            } else {
                setLoginError('Invalid username or password');
            }
        } catch (error) {
            setLoginError('Invalid username or password');
            console.error('Error:', error);
        }
    }
    return (
        <Form className="mx-auto mt-5" style={{ width: 400 }}>
            <Form.Group >
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control
                    type="text"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text id="emailHelp" >
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            {loginError && <p className="error-message">{loginError}</p>}
            <Button type="submit" className='mt-3'  onClick={handleLoginSubmit}>
                Login
            </Button>
        </Form>
    );
}

export default LoginForm;


