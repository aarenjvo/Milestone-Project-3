import React, { useState } from "react";
import Create from "../components/Create";
import Signup from "../components/Signup";

function Home() {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

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

  const handleSignUpClick = () => {
    setShowSignUpPopup(true);
  };

  const handleCloseSignUpPopup = () => {
    setShowSignUpPopup(false);
  };

  const handleSignUp = (signUpData) => {
    console.log("User signed up:", signUpData);
    setShowSignUpPopup(false);
  };

  return (
    <div>
      <nav>
        <a href="#" onClick={handleCreateClick}><h3>Make your creation</h3></a>
        <h3>View Posts</h3>
        <div className="title"><h2>TupGPT</h2></div>
        <a href="#" onClick={handleSignUpClick}><h3>Sign Up</h3></a> 
        <h3>Log In</h3>
      </nav>
      <div className="welcome">
        <h1>Welcome!</h1>
        <h3>This is a project created by Freddy Diaz, Aaren Vo, Anthony Deguire, and Tj Jones</h3>
      </div>
      {showCreatePopup && (
        <Create onClose={handleCloseCreatePopup} onCreate={handleCreateDocument} />
      )}
      {showSignUpPopup && (
        <Signup onClose={handleCloseSignUpPopup} onSignUp={handleSignUp} />
      )}
    </div>
  );
}

export default Home;
