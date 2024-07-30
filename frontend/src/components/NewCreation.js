import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import BlogCard from './BlogCard'
import Create from './Create'

function NewCreation() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5001/user/${id}`)
            const resData = await response.json()
            setUser(resData)
        }
        fetchData()
    }, [id])

    if (user === null) {
        return <h1>Loading</h1>
    }

    async function createBlog(blogAttributes) {
        const response = await fetch(`http://localhost:5001/user/${id}/blogs`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogAttributes)
        })

        const blog = await response.json()

        setUser({
            ...user,
            blogs: [
                ...user.blogs,
                blog
            ]
        })
        navigate(`/blog`)
    }



    let blogs = (
        <h3 className="inactive">
            No blogs yet!
        </h3>
    )
    let title = (
        <h3 className="inactive">
            No Title yet
        </h3>
    )
    if (user.blogs.length) {
        title = (
            <h3>
                Here is your first post!
            </h3>
        )
        blogs = user.blogs.map(blog => {
            return (
                <BlogCard key={blog.user_id} blog={blog} />
            )
        })
    }


    return (
        <main>
            <div className="row">
                {/* <div className="col-sm-6">
                    <img style={{ maxWidth: 200 }} src={user.pic} alt={user.username} />
                    <h3>
                        Located in {user.city}, {user.state}
                    </h3>
                </div> */}
                <div className="col-sm-6">
                    <h1>{user.username}</h1>
                    <h2>
                        Title
                    </h2>
                    {title}
                    <br />
                    <h2>Post a Blog</h2>
                    <Create
                        user={user}
                        onSubmit={createBlog}
                    />
                </div>
            </div>
        </main>
    )
}

export default NewCreation