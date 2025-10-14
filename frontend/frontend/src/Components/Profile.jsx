import React, { useState } from "react";
import ProfileField from "./ProfileField";
import PasswordField from "./PasswordField";
import "./Profile.css";



const Profile = () => {
  
  const [user, setUser] = useState({
    name: "Your Name",
    email: "your@email.com",
    dob: "",
    gender: "",
    phone: "",
    address: "",
  });

  

  const handleFieldChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  return (
    <div className="profile-form">
      {/* Profile Picture */}
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/120" // replace with uploaded image later
          alt="Profile"
          className="profile-pic"
        />
        <button className="edit-btn">✏️ Edit Photo</button>
    
      </div>

      {/* Basic Details */}
      <div className="profile-section">
        <h4>Basic Details</h4>
        <ProfileField
          label="Name"
          value={user.name}
          editable
          onChange={(val) => handleFieldChange("name", val)}
        />
        <ProfileField
          label="Username"
          value={user.email}
          editable
          type="email"
          onChange={(val) => handleFieldChange("email", val)}
        />
        <ProfileField
          label="DOB"
          value={user.dob}
          editable
          type="date"
          onChange={(val) => handleFieldChange("dob", val)}
        />
        <ProfileField
          label="Gender"
          value={user.gender}
          editable
          onChange={(val) => handleFieldChange("gender", val)}
        />
      </div>

      {/* Contact Details */}
      <div className="profile-section">
        <h4>Contact Details</h4>
        <ProfileField
          label="Mobile No"
          value={user.phone}
          editable
          onChange={(val) => handleFieldChange("phone", val)}
        />
        <ProfileField
          label="Address"
          value={user.address}
          editable
          onChange={(val) => handleFieldChange("address", val)}
        />
      </div>

      {/* Password Section */}
      <div className="profile-section">
        <h4>Password</h4>
        <PasswordField />
      </div>
    </div>
  );
};

export default Profile;
