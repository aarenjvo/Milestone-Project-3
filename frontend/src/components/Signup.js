import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"

function Signup() {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: '',
        age: '',
        email: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        await fetch(`http://localhost:5001/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }, console.log('Successfully created user!'))
        navigate(`/`)
    }

    return (
        <div className="sign-up-popup">
            <main>
                <h1>Sign Up</h1>
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
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                required
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value })}
                                className="form-control"
                                id="email"
                                name="email"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="age"
                                required
                                value={user.age}
                                onChange={e => setUser({ ...user, age: e.target.value })}
                                className="form-control"
                                id="age"
                                name="age"
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
                    <input className="btn btn-primary" type="submit" value="Sign Up" />
                </form>
            </main >
        </div>
    )
}
export default Signup