import { useState, useEffect } from "react"
import { useCurrentUser } from "../contexts/CurrentUser";

const NewBlog = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      setAuthor(currentUser.username); // Set author to current user's username
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle blog submission
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form>
        <label>Blog title:</label>
        <input
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <p>{author}</p>
        <button type="submit">Add Blog</button>
        <p>{title}</p>
        <p>{body}</p>
      </form>
    </div>
  )
}

export default NewBlog;