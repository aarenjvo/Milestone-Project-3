import React, { useState, useEffect } from "react";
import '../Create.css';
import { useNavigate } from 'react-router' 

function Create({ onClose, onCreate }) {

    const navigate = useNavigate()

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
        // Retrieve the user_id from local storage or another appropriate place
        const userId = localStorage.getItem('user_id'); // Adjust according to your storage method
        setBlog(prevBlog => ({ ...prevBlog, user_id: userId }));
    }, []);


    async function handleSubmit(e) {
		e.preventDefault()

		await fetch(`http://localhost:5001/blog/post`, {
			method: 'POST',
			headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_id')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(blog)
		}, console.log('Successfully created a blog!'))
        onCreate(blog)
        onClose()
		navigate('/testing')
	}

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
