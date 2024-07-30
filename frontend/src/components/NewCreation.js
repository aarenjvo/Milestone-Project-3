import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

function NewCommentForm({ place, onSubmit }) {

    const [authors, setAuthors] = useState([])

    const [blog, setBlog] = useState({
        user_id: '',
        title: '',
        content: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5001/users`)
            const users = await response.json()
            setBlog({ ...blog, user_id: users[0]?._id })
            setAuthors(users)
        }
        fetchData()
    }, [])

    let authorOptions = authors.map(author => {
        return <option key={author._id} value={author._id}>{author.username}</option>
    })

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(blog)
        setBlog({
            user_id: authors[0]?._id,
            title: '',
            content: '',
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="title">Title</label>
                    <textarea
                        required
                        value={blog.title}
                        onChange={e => setBlog({ ...blog, title: e.target.value })}
                        className="form-control"
                        id="title"
                        name="title"
                    />
                </div>
                <div className="form-group col-sm-12">
                    <label htmlFor="content">Content</label>
                    <textarea
                        required
                        value={blog.content}
                        onChange={e => setBlog({ ...blog, content: e.target.value })}
                        className="form-control"
                        id="content"
                        name="content"
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-4">
                    <label htmlFor="state">Author</label>
                    <select className="form-control" value={blog.user_id} onChange={e => setBlog({ ...blog, user_id: e.target.value })}>
                        {authorOptions}
                    </select>
                </div>
            </div>
            <input className="btn btn-primary" type="submit" value="Add Comment" />
        </form>
    )
}

export default NewCommentForm