import React, { useState } from 'react';
import '../index.css'

const UserData = () => {
  const [showData, setShowData] = useState(false);

  const handleShowData = () => {
    setShowData(!showData);
  };

  return (
    <div className="user-data">
      <button className="user-data-button" onClick={handleShowData}>
        {showData ? 'Hide User Data' : 'Get User Data'}
      </button>

      {showData && (
        <div className="user-data-details">
          <h2>User Data</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Password:</strong> ********</p>
          <p><strong>Created At:</strong> January 1, 2022</p>
        </div>
      )}
    </div>
  );
};

export default UserData;
