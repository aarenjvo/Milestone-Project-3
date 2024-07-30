import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { Link } from 'react-router'

function BlogIndex(data) {

	const navigate = useNavigate()
	
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5001/blog`)
			const resData = await response.json()
			setBlogs(resData)
		}
		fetchData()
	}, [])

	let blogsFormatted = blogs.map((blog) => {
		return (
			<div className="col-sm-6" key={blog.user_id}>
				<h2>
					<a href='#' onClick={() => navigate(`/blog/${blog.user_id}`)} >
						{blog.title}
					</a>
				</h2>
				<p className="text-center">
					{blog.content}
				</p>
				{/* <img style={{ maxWidth: 200 }} src={blog.pic} alt={blog.name} />
				<p className="text-center">
					Located in {blog.city}, {blog.state}
				</p> */}
			</div>
		)
	})
	return (
		<main>
			<h1>Blogs</h1>
			<div className="row">
				{blogsFormatted}
			</div>
		</main>
	)
}

export default BlogIndex;