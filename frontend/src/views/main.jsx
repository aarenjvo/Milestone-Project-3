import React, { useState } from "react";
import Create from "../components/Create";

function Main() {
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    
  const handleCreateClick = () => {
    setShowCreatePopup(true);
  };

  const handleCloseCreatePopup = () => {
    setShowCreatePopup(false);
  };

  const handleCreateDocument = (documentData) => {
    console.log("Document created:", documentData);
    setShowCreatePopup(false);
  };
    return (
        <div>
            <nav> <a href="#" onClick={handleCreateClick}><h3>Make your creation</h3></a></nav>
            <div className="title"><h2>TupGPT</h2></div>
            <h3>View Posts</h3>
            <div className="welcome">
            <h1>Welcome!</h1>
            <h3>This is a project created by Freddy Diaz, Aaren Vo, Anthony Deguire, and Tj Jones</h3>
            <h3>If you're seeing this, our records indicate that you've signed in. Cheers.</h3>
            </div>
            {showCreatePopup && (
        <Create onClose={handleCloseCreatePopup} onCreate={handleCreateDocument} />
      )}
        </div>
    )
}
export default Main;