import React from 'react'
import { useEffect, useState } from 'react'
// import User from './User'
import Header from './Header'


function UserActions({userData}) {
  console.log(userData)
  //LOGIN FUNCTIONALITY

  //login constants
//   const [name, setName] = useState('')
//   const [userData, setUserData] = useState({})
//   const [IsLoggedIn, setIsLoggedIn] = useState(false)
//   // const [newUser, setNewUser] = useState('')
   const [user_id, setUser_Id] = useState(null)
  
//   const [users, setUsers] = useState([])
    
//     useEffect (() => {
//         fetch("https://obscure-springs-19515.herokuapp.com/users")
//          .then(res => res.json())
//          .then(data => setUsers(data))
//     }, [])

//   //let userData

//   //fetches users with name == user input
//   const  targetUser = users.find(user => {
//     if (user.name === name) {
//       return true;
//     }
  
//     return false;
//   });
  

//   function handleSubmit(e) {
//     // console.log("clicked")
//   targetUser ?
    
//     fetch(`https://obscure-springs-19515.herokuapp.com/users/${name}`)
//       .then(res => res.json())
//       .then(data => setUserData(data))
//       .then(setIsLoggedIn(true))
//     // console.log(userData)
      
//     // console.log(IsLoggedIn)
//     :
//     alert("sorry, unrecognized name")
//   }

  //GET FUNCTIONALITY

  //state for holding jobs.json
  const [userJobs, setUserJobs] = useState([])

  //fetch job(s) with a particular user id
  useEffect(() => {
    console.log(userData)
    fetch(`https://obscure-springs-19515.herokuapp.com/jobs/${userData.id}`)
      .then(response => response.json())
      .then(data => setUserJobs(data))
  }, [])

console.log(userJobs)
  //form StateVar
  const [formData, setFormData] = useState([]);

  //stores input value into StateVar
  function handleChange(e) {

    setUser_Id(userData.id)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      "user_id": user_id
    })
   console.log(formData)
  }

  // POST FUNCTIONALITY

  //Post Jobs functionality
  function handlePostJob(e) {
    e.preventDefault();
  userData.id === user_id ?  
    fetch("https://obscure-springs-19515.herokuapp.com/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => setUserJobs({
        ...userJobs,
        data
      }))

      
      :
      alert("sorry, unrecognized name")
  }

   //DELETE FUNCTIONALITY
   function handleDelete(targetJob) {
     const modifiedJobs = userJobs.filter((job) => job !== targetJob) 

    // e.stopPropagation()
     console.log(targetJob)
    //e.preventDefault();
    fetch(`https://obscure-springs-19515.herokuapp.com/jobs/${targetJob.id}`, {
        method: "DELETE",
     })
     //.then(res => res.json())
     setUserJobs(modifiedJobs)
    // .then 
   }




  // useEffect (() => {
  //     fetch(`https://obscure-springs-19515.herokuapp.com/jobs/${name}`)
  //         .then(response => response.json())
  //         .then(data => console.log(data)) 

  // })
//    const [UserFormData, setUserFormData] = useState([])

//   function handleNewUserName(e) {
//     setUserFormData({
//       ...UserFormData,
//       [e.target.name]: e.target.value,
//     })

//   }

//   function handlePostNewUser(e) {
//     e.preventDefault()
//     console.log(UserFormData)
//     fetch("https://obscure-springs-19515.herokuapp.com/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(UserFormData),
//     })
//       .then(res => res.json())
//       .then(data => console.log(data));
//   }

  return (
      <div>
        <div className="header-container">
          <Header />
        </div>
        <div>
        
          <form id="form">
            <input type="text" name="title" placeholder="job-title" onBlur={handleChange} />
            <input type="text" name="recruiter" placeholder="recruitername" onBlur={handleChange} />
            <input type="text" name="location" placeholder="enter url" onBlur={handleChange} />
            <input type="text" name="stack" placeholder="skills" onBlur={handleChange} />
            {/* <input type="integer" name="UserID" onBlur={handleChange}/> */}
             <button type="submit" className="submit" onClick={handlePostJob}>
              Add a Job
            </button>
          </form>

          {/* <div>
     <User userData={userData}/> 
    </div>    */}

        </div>

        <div className="jobs">
      {userJobs.map((job) => (
        <div key={job.id} className={"job-container"}>
          <div className={"part1"}>
          <div className = {"position"}>
            <a href = {job.location}>{job.title}</a></div>
          <div className={"company"}>
          <span className = {"cname"}>{job.recruiter}</span>
          </div>
         
        </div>
        
        <div className="part2">
        <span className= "details">{job.stack}</span>
        <button type="button" className ={"icon-box"} onClick={(e) => {
          e.preventDefault()
          handleDelete(job)}} >delete</button>
        </div>
        </div>
      ))}
      
    </div>

       


        <div className="footer"></div>
      </div>
  )
}

export default UserActions