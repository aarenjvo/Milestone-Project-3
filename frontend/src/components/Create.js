import React, { useState, useEffect, useContext } from "react";
import '../Create.css';
import { useNavigate } from 'react-router'
import { CurrentUserContext } from "../contexts/CurrentUser";
// import NewCreation from './NewCreation'

function Create({ onClose, onSubmit }) {

    const navigate = useNavigate()

    const [users, setUsers] = useState([])


    const [font, setFont] = useState('Arial');
    const [access, setAccess] = useState('Public');
    const [blog, setBlog] = useState({
        user_id: '',
        title: '',
        content: '',
        font,
        access
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5001/user`)
            const users = await response.json()
            setBlog({ ...blog, user_id: users[0]?._id })
            setUsers(users)
        }
        fetchData()
    }, [blog])

    let userOptions = users.map(user => {
        return <option key={user._id} value={user._id}>{user.username}</option>
    })

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(blog)
        setBlog({
            user_id: users[0]?._id,
            title: '',
            content: ''
        })
    }

    const { currentUser } = useContext(CurrentUserContext)

    if (!currentUser) {
        return <p>You must be logged in to create a blog</p>
    }

    // async function handleSubmit(e) {
    // 	e.preventDefault()

    // 	const response = await fetch(`http://localhost:5001/user/post`, {
    // 		method: 'POST',
    // 		headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    // 			'Content-Type': 'application/json'
    // 		},
    // 		body: JSON.stringify(blog)
    // 	}, console.log('Successfully created a blog!'))
    //     const data = await response.json()
    //     console.log(data)

    //     setBlog({
    //         ...blog
    //     })

    //     onCreate(blog)
    //     onClose()
    // 	navigate('/testing')
    // }

    return (
        <form onSubmit={handleSubmit}>
            <div className="create-popup">
                <div className="create-header">
                    <h2>Create New Document</h2>
                </div>
                <div className="create-field">
                    <label htmlFor="documentName">Document Title:</label>
                    <input
                        type="text"
                        id="documentName"
                        value={blog.title}
                        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                    />
                </div>
                <div className="create-content">
                    <label htmlFor="documentContent">Content:</label>
                    <input
                        type="text"
                        id="documentContent"
                        value={blog.content}
                        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                    />
                </div>
                {/* <div className="form-group col-sm-4">
                    <label htmlFor="state">User</label>
                    <select className="form-control" value={blog.user_id} onChange={e => setBlog({ ...blog, user_id: e.target.value })}>
                        {userOptions}
                    </select>
                </div> */}
                <div className="create-settings">
                    <h3>Settings Selection</h3>
                    <div className="create-field">
                        <label htmlFor="font">Font:</label>
                        <select
                            id="font"
                            value={font}
                            onChange={(e) => setFont(e.target.value)}
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                        </select>
                    </div>
                    <div className="create-field">
                        <label htmlFor="access">Access:</label>
                        <select
                            id="access"
                            value={access}
                            onChange={(e) => setAccess(e.target.value)}
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                </div>
                <div className="create-buttons">
                    <button onClick={handleSubmit} className="create-button create-button-green">
                        Create Document
                    </button>
                    <button onClick={onClose} className="create-button create-button-gray">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Create;
