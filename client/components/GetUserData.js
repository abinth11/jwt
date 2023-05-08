import React, { useState } from "react";
const GetUserData = () => {
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState("");

  const handleShowData = async () => {
    setShowData(!showData);
  };
  const getUserData = async () => {
    if (!showData) {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:3000/get-user-data", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      })
        .then(async (response) => {
          console.log(response);
          const parsedResponse = await response.json();
          if(!parsedResponse?.status){
            alert(parsedResponse?.message)
            return 
          } else {
            const { data } = parsedResponse;
          console.log(parsedResponse);
          if (data) {
            alert(parsedResponse?.successMessage);
            setUserData(data);
          } else {
            alert("unable to get the user data");
          }

          }
          
        })
        .catch((err) => {
          console.log(err);
        });
      handleShowData();
    }
    handleShowData();
  };

  return (
    <div className='user-data'>
      <button className='user-data-button' onClick={getUserData}>
        {showData ? "Hide User Data" : "Get User Data"}
      </button>

      {showData && (
        <div className='user-data-details'>
          <h2>User Data</h2>
          <p>
            <strong>Name:</strong> {userData?.username}
          </p>
          <p>
            <strong>Email:</strong> {userData?.email}
          </p>
          <p>
            <strong>Password:</strong> {userData?.password}
          </p>
          <p>
            <strong>Created At:</strong> {userData?.createdAt}
          </p>
        </div>
      )}
    </div>
  );
};
export default GetUserData;
