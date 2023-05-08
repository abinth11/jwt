import React, { useState } from "react";
// import "../index.css";

const UserData = () => {
  // const [showData, setShowData] = useState(false);

  // const handleShowData = async () => {
  //   console.log(data);
  //   setShowData(!showData);
  // };
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch("http://localhost:3000/get-user-data", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      })
        .then(async (response) => {
          // const parsedResponse = await response.json()
          // const {data} = parsedResponse
          console.log(response);
          // if(!data?.status){
          //     alert(data?.Message)
          // }else {
          //   alert('successfully logged in')
          //   localStorage.setItem('token', data?.token);
          // }
          // console.log(parsedResponse);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (<h1>hii</h1>)

  // return (
  //   <div className='user-data'>
  //     <button className='user-data-button' onClick={getUserData}>
  //       {showData ? "Hide User Data" : "Get User Data"}
  //     </button>

  //     {showData && (
  //       <div className='user-data-details'>
  //         <h2>User Data</h2>
  //         <p>
  //           <strong>Name:</strong> John Doe
  //         </p>
  //         <p>
  //           <strong>Email:</strong> johndoe@example.com
  //         </p>
  //         <p>
  //           <strong>Password:</strong> ********
  //         </p>
  //         <p>
  //           <strong>Created At:</strong> January 1, 2022
  //         </p>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default UserData;
