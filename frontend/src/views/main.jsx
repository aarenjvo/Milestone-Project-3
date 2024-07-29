import React, { useState } from "react";
import Create from "../components/Create";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

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

  const currentPageUrl = "/main";
    return (
        <div>
            <nav> <a href="#" onClick={handleCreateClick}><h3>Make your creation</h3></a>
            <div className="title"><h2>TupGPT</h2></div>
            <h3>View Posts</h3>
            </nav>
            <div className="welcome">
            <h1>Welcome!</h1>
            <h3>This is a project created by Freddy Diaz, Aaren Vo, Anthony Deguire, and Tj Jones</h3>
            <h3>If you're seeing this, our records indicate that you've signed in. Cheers.</h3>
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
            {showCreatePopup && (
        <Create onClose={handleCloseCreatePopup} onCreate={handleCreateDocument} />
      )}
        </div>
    )
}
export default Main;