import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Creation = () => {
  const [blogs, setBlogs] = useState([
    { title: "Introducing myself", body: "lorem ipsum...", author: "Anthony", id: 1 },
    { title: "Introducing myself", body: "lorem ipsum...", author: "TJ", id: 2 },
    { title: "Introducing myself", body: "lorem ipsum...", author: "Aaren", id: 3 },
    { title: "Introducing myself", body: "lorem ipsum...", author: "Freddy", id: 4 }
  ]);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);

  }

  useEffect(() => {
    console.log('use effect ran')
  }, []);

  return (
    <div className="creation">
      <BlogList blogs={blogs} title="All Blogs:" handleDelete={handleDelete} />
    </div>
  )
}

export default Creation;