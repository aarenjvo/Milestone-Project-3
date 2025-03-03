import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Create from "../components/Create";
import Signup from "../components/Signup";
import Login from '../components/Login';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

function Home() {
  const navigate = useNavigate();
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

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

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleLogin = (loginData) => {
    console.log("User logged in:", loginData);
    setShowLoginPopup(false);
  };
  
  const handleViewPostsClick = () => {
    navigate('/view'); // Navigate to /view route
  };

  const isPopupVisible = showCreatePopup || showSignUpPopup || showLoginPopup;

  const currentPageUrl ="/"
  return (
    <div>
      <nav>
        <a href="#" onClick={handleCreateClick}><h3>Make your creation</h3></a>
        <a href="#" onClick={handleViewPostsClick}><h3>View Posts</h3></a>
        <div className="title"><h2>TupGPT</h2></div>
        <a href="#" onClick={handleSignUpClick}><h3>Sign Up</h3></a> 
        <a href="#" onClick={handleLoginClick}><h3>Log In</h3></a> 
      </nav>
      <div className="welcome">
        <h1>Welcome!</h1>
        <h3>This is a project created by Freddy Diaz, Aaren Vo, Anthony Deguire, and Tj Jones</h3>
        <FacebookShareButton
            url={currentPageUrl}
            quote="Share This Post on Facebook!"
            hashtag="#TupTup"            
            >
            <FacebookIcon />
            </FacebookShareButton>
            <TwitterShareButton
            url={currentPageUrl}
            quote="See it on Twitter!"
            hashtag="Tup Tup"
            >
            <TwitterIcon />
            </TwitterShareButton>
      </div>
      {isPopupVisible && <div className="overlay show" />}
      {showCreatePopup && (
        <Create onClose={handleCloseCreatePopup} onCreate={handleCreateDocument} />
      )}
      {showSignUpPopup && (
        <Signup onClose={handleCloseSignUpPopup} onSignUp={handleSignUp} />
      )}
      {showLoginPopup && (
        <Login onClose={handleCloseLoginPopup} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Home;
