import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CurrentUser } from "../contexts/CurrentUser";
import '../Login.css'

function Login({onClose}) {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(CurrentUser);

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:5001/user/login/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 201) {
            setCurrentUser(data.user);
            localStorage.setItem('token', data.token)
            console.log('Successfully logged in user!');
            navigate('/Main');
        } else {
            setErrorMessage(data.message);
        }
    }

    return (
        <div className="login-popup">
            <h1 className="login-header">Login</h1>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="login-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        required
                        value={credentials.email}
                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                        id="email"
                        name="email"
                    />
                </div>
                <div className="login-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        required
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                        id="password"
                        name="password"
                    />
                </div>
                <div className="login-buttons">
                    <button type="submit" className="login-button login-button-green">Login</button>
                    <button type="button" className="login-button login-button-gray" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
