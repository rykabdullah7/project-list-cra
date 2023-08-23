import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

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

            console.log(response);
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
        <form className="mx-auto mt-5" style={{ width: 400 }}>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                </small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {loginError && <p className="error-message">{loginError}</p>}
            <button type="submit" className="btn btn-primary" onClick={handleLoginSubmit}>
                Login
            </button>
        </form>
    );
}

export default LoginForm;


