import React, { useState } from "react";
import "./Profile.css";

const PasswordField = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    alert("Password updated (demo only, not saved)");
  };

  return (
    <div className="profile-item">
      <strong>Password: </strong>
      {isEditing ? (
        <>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSave} className="save-btn">
            💾 Save
          </button>
        </>
      ) : (
        <>
          <span>********</span>
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            ✏️ Change
          </button>
        </>
      )}
    </div>
  );
};

export default PasswordField;
