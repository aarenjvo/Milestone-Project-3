import React, { useState } from "react";

function Create({ onClose, onCreate }) {
    const [documentName, setDocumentName] = useState('');
    const [font, setFont] = useState('Arial');
    const [access, setAccess] = useState('Public');

    const handleCreateClick = () => {

        const documentData = {
            documentName,
            font,
            access,
            content: ''
        };

        onCreate(documentData);
        onClose();
    };

    return (
        <div className="create-popup">
            <div>
                <h2>Create New Document</h2>
            </div>
            <div>
                <label htmlFor="documentName">Document Name:</label>
                <input
                    type="text"
                    id="documentName"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                />
            </div>
            <div>
                <h3>Settings Selection</h3>
                <div>
                    <label htmlFor="font">Font:</label>
                    <select id="font" value={font} onChange={(e) => setFont(e.target.value)}>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="access">Access:</label>
                    <select id="access" value={access} onChange={(e) => setAccess(e.target.value)}>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
            </div>
            <button onClick={handleCreateClick}>Create Document</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default Create