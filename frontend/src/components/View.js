import { useState } from "react"
import { useNavigate } from "react-router"

function View() {

	const navigate = useNavigate()

	const [blog, setBlog] = useState({
        username: '',
        title: '',
        content: ''
	})

	async function handleSubmit(e) {
		e.preventDefault()

		await fetch(`https://milestone-project-3-backend.onrender.com/blog/post`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(blog)
		})

		navigate('/')
	}

	return (
		<main>
			<h1>Create a New Doc</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Doc Name</label>
					<input
						required
						value={blog.username}
						onChange={e => setBlog({ ...blog, username: e.target.value })}
						className="form-control"
						id="username"
						name="username"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						required
						value={blog.title}
						onChange={e => setBlog({ ...blog, title: e.target.value })}
						className="form-control"
						id="title"
						name="title"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="content">Content</label>
					<input
						value={blog.content}
						onChange={e => setBlog({ ...blog, content: e.target.value })}
						className="form-control"
						id="content"
						name="content"
					/>
				</div>
				<input className="btn btn-primary" type="submit" value="Add Blog" />
			</form>
		</main>
	)
}

export default View