import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost:5001/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            console.log('Successfully logged in!');
            navigate(`/`);  
        } else {
            console.error('Failed to log in');
        }
    }

    return (
        <div className="login-popup">
            <main>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                required
                                value={user.username}
                                onChange={e => setUser({ ...user, username: e.target.value })}
                                className="form-control"
                                id="username"
                                name="username"
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                required
                                value={user.password}
                                onChange={e => setUser({ ...user, password: e.target.value })}
                                className="form-control"
                                id="password"
                                name="password"
                            />
                        </div>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Login" />
                </form>
            </main>
        </div>
    );
}

export default Login;