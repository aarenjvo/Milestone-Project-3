function Creation() {
  
  return(
    <div>
      <header class="header">
        <h1>Blog Postings</h1>
      </header>
      <main class="main">
        <form id="blogPostings">
          <input type="text" name="name" placeholder="Thoughts..."></input>
          <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </main>
      <div>
        <ul>
          <li>
            <span>Anthony</span>
            <button>Edit</button>
            <button>Remove</button>
          </li>
          <li>
          <span>Aaren</span>
            <button>Edit</button>
            <button>Remove</button>
          </li>
          <li>
          <span>TJ</span>
            <button>Edit</button>
            <button>Remove</button>
            <li>
            <span>Freddy</span>
            <button>Edit</button>
            <button>Remove</button>
            </li>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Creation