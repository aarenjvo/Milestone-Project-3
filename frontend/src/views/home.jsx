import React, { useState } from "react"
import Create from "../components/Create"

function Home() {
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const handleCreateClick = () => {
    setShowCreatePopup(true);
  };

  const handleCloseCreatePopup = () => {
    setShowCreatePopup(false);
  };

  const handleCreateDocument = (documentData) => {
    console.log("Document created:", documentData);
    <Create/>
  };

  return(
  <div>
    <nav>
    <a href="#" onClick={handleCreateClick}><h3>Make your creation</h3></a>
      <h3>View Posts</h3>
      <div className="title"><h2>TupGPT</h2></div>
      <h3>Sign Up</h3>
      <h3>Log In</h3>
    </nav>
    <div className="welcome">
      <h1>Welcome!</h1>
      <h3>This is a project created by Freddy Diaz, Aaren Vo,Anthony Deguire, and Tj Jones</h3>
    </div>
    {showCreatePopup && (
        <Create onClose={handleCloseCreatePopup} onCreate={handleCreateDocument} />
      )}
    </div>
    
  )

}

export default Home