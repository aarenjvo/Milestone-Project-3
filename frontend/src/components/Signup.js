import { useState } from "react";
import { useNavigate } from "react-router";
import '../SignUp.css'

function Signup({onClose}) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        age: '',
        email: '',
        password: ''
    });

    async function handleSubmit(e) {
        e.preventDefault();

        await fetch(`http://localhost:5001/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }, console.log('Successfully created user!'));
        navigate(`/`);
    }
    
    return (
        <div className="sign-up-popup">
            <main>
                <h1 className="sign-up-header">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="sign-up-field">
                        <label htmlFor="username">Username</label>
                        <input
                            required
                            value={user.username}
                            onChange={e => setUser({ ...user, username: e.target.value })}
                            id="username"
                            name="username"
                        />
                    </div>
                    <div className="sign-up-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="sign-up-field">
                        <label htmlFor="age">Age</label>
                        <input
                            type="age"
                            required
                            value={user.age}
                            onChange={e => setUser({ ...user, age: e.target.value })}
                            id="age"
                            name="age"
                        />
                    </div>
                    <div className="sign-up-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            value={user.password}
                            onChange={e => setUser({ ...user, password: e.target.value })}
                            id="password"
                            name="password"
                        />
                    </div>
                    <div className="sign-up-buttons">
                        <button type="submit" className="sign-up-button sign-up-button-green">Sign Up</button>
                        <button type="button" className="sign-up-button sign-up-button-gray" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Signup;
