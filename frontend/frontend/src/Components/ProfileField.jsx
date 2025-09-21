import React, { useState } from "react";
import "./Profile.css";

const ProfileField = ({ label, value, editable, type = "text", onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    if (onChange) onChange(fieldValue);
  };

  return (
    <div className="profile-item">
      <strong>{label}: </strong>
      {isEditing ? (
        <>
          <input
            type={type}
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <button onClick={handleSave} className="save-btn">
            💾 Save
          </button>
        </>
      ) : (
        <>
          <span>{fieldValue || "Not set"}</span>
          {editable && (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              ✏️ Edit
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileField;
