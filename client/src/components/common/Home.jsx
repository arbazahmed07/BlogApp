// import { useContext, useEffect, useState } from 'react'
// import { userAutherContextObj } from '../../contexts/userAutherContext'
// import { useUser } from '@clerk/clerk-react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// function Home() {
//   const { currentUser, setCurrentUser } = useContext(userAutherContextObj)

//   const { isSignedIn, user, isLoaded } = useUser()
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // console.log("isSignedIn :", isSignedIn)
//    console.log("User :", user)
//   // console.log("isLolded :", isLoaded)



//   async function onSelectRole(e) {
//     //clear error property
//     setError('')
//     const selectedRole = e.target.value;
//     currentUser.role = selectedRole;
//     let res = null;
//     try {
//       if (selectedRole === 'author') {
//         res = await axios.post('http://localhost:3000/author-api/author', currentUser)
//         let { message, payload } = res.data;
//         // console.log(message, payload)
//         if (message === 'author') {
//           setCurrentUser({ ...currentUser, ...payload })
//           //save user to localstorage
//           localStorage.setItem("currentuser",JSON.stringify(payload))
//           // setError(null)
//         } else {
//           setError(message);
//         }
//       }
//       if (selectedRole === 'user') {
//         console.log(currentUser)
//         res = await axios.post('http://localhost:3000/user-api/user', currentUser)
//         let { message, payload } = res.data;
//         console.log(message)
//         if (message === 'user') {
//           setCurrentUser({ ...currentUser, ...payload })
//            //save user to localstorage
//            localStorage.setItem("currentuser",JSON.stringify(payload))
//         } else {
//           setError(message);
//         }
//       }
//       if (selectedRole === 'admin') {
//         console.log(currentUser)
//         res = await axios.post('http://localhost:3000/admin-api/admin', currentUser)
//         let { message, payload } = res.data;
//         // console.log("admin bolte",message)
//         if (message === 'admin') {
//           setCurrentUser({ ...currentUser, ...payload })
//            //save user to localstorage
//            localStorage.setItem("currentuser",JSON.stringify(payload))
//         } else {
//           setError(message);
//         }
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   }


//   useEffect(() => {
//     if (isSignedIn === true) {
//       setCurrentUser({
//         ...currentUser,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.emailAddresses[0].emailAddress,
//         profileImageUrl: user.imageUrl,
//       });
//     }
//   }, [isLoaded])



//   useEffect(() => {

//     if (currentUser?.role === "user" && error.length === 0) {
//       navigate(`/user-profile/${currentUser.email}`);
//     }
//     if (currentUser?.role === "author" && error.length === 0) {
//       // console.log("first")
//       navigate(`/author-profile/${currentUser.email}`);
//     }
//     if (currentUser?.role === "admin" && error.length === 0) {
//       // console.log("first")
//       navigate(`/admin-profile/${currentUser.email}`);
//     }

//   }, [currentUser]);

//   // console.log("cu",currentUser)
//   //console.log("is loaded",isLoaded)

//   return (
//     <div className='container'>
//       {
//         isSignedIn === false && <div>
//           <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam neque consequatur nemo, enim expedita alias nobis iste obcaecati, eum dolor deserunt voluptatum odio aperiam, officiis sequi voluptates molestias atque sint?</p>
//           <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam neque consequatur nemo, enim expedita alias nobis iste obcaecati, eum dolor deserunt voluptatum odio aperiam, officiis sequi voluptates molestias atque sint?</p>
//           <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam neque consequatur nemo, enim expedita alias nobis iste obcaecati, eum dolor deserunt voluptatum odio aperiam, officiis sequi voluptates molestias atque sint?</p>

//         </div>
//       }

//       {
//         isSignedIn === true &&
//         <div>
//           <div className='d-flex justify-content-evenly align-items-center bg-info p-3'>
//             <img src={user.imageUrl} width="100px" className='rounded-circle' alt="" />
//             <p className="display-6">{user.firstName}</p>
//             <p className="lead">{user.emailAddresses[0].emailAddress}</p>
//           </div>
//           <p className="lead">Select role</p>
//           {error.length !== 0 && (
//             <p
//               className="text-danger fs-5"
//               style={{ fontFamily: "sans-serif" }}
//             >
//               {error}
//             </p>
//           )}
//           <div className='d-flex role-radio py-3 justify-content-center'>
//           <div className="form-check">
//               <input type="radio" name="role" id="admin" value="admin" className="form-check-input" onChange={onSelectRole} />
//               <label htmlFor="admin" className="form-check-label">Admin</label>
//             </div>

//             <div className="form-check me-4">
//               <input type="radio" name="role" id="author" value="author" className="form-check-input" onChange={onSelectRole} />
//               <label htmlFor="author" className="form-check-label">Author</label>
//             </div>
//             <div className="form-check">
//               <input type="radio" name="role" id="user" value="user" className="form-check-input" onChange={onSelectRole} />
//               <label htmlFor="user" className="form-check-label">User</label>
//             </div>
//           </div>
//         </div>



//       }
//     </div>
//   )
// }

// export default Home;


import { useContext, useEffect, useState } from 'react';
import { userAutherContextObj } from '../../contexts/userAutherContext';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAutherContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSelectRole(e) {
    setError('');
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    let res = null;
    try {
      if (selectedRole === 'author') {
        res = await axios.post('http://localhost:3000/author-api/author', currentUser);
        let { message, payload } = res.data;
        if (message === 'author') {
          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem("currentuser", JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'user') {
        res = await axios.post('http://localhost:3000/user-api/user', currentUser);
        let { message, payload } = res.data;
        if (message === 'user') {
          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem("currentuser", JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'admin') {
        res = await axios.post('http://localhost:3000/admin-api/admin', currentUser);
        let { message, payload } = res.data;
        if (message === 'admin') {
          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem("currentuser", JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "admin" && error.length === 0) {
      navigate(`/admin-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  return (
    
      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          {isSignedIn === false && (
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card border-0 shadow-lg">
                  <div className="card-body p-5">
                    <h1 className="display-6 text-center mb-4">Welcome to BlogVerse</h1>
                    
                    <div className="text-center mb-5">
                      <img 
                        src="/api/placeholder/600/300"
                        alt="Blogging Platform" 
                        className="img-fluid rounded-3 shadow mb-4"
                      />
                    </div>
  
                    <div className="p-4 bg-white rounded-3 mb-4">
                      <h3 className="h4 mb-3">Share Your Story</h3>
                      <p className="lead text-muted">
                        Join our community of passionate writers and readers. Whether you're here to share your expertise, 
                        chronicle your adventures, or discover new perspectives, BlogVerse provides the perfect platform 
                        for your voice to be heard.
                      </p>
                    </div>
  
                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <div className="p-4 bg-white rounded-3 h-100">
                          <img 
                            src="/api/placeholder/300/200" 
                            alt="Write and Publish"
                            className="img-fluid rounded-3 mb-3"
                          />
                          <h4 className="h5 mb-3">Write & Publish</h4>
                          <p className="text-muted mb-0">
                            Create beautiful articles with our easy-to-use editor. Add images, 
                            format text, and publish with just a few clicks. Your words, your way.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-4 bg-white rounded-3 h-100">
                          <img 
                            src="/api/placeholder/300/200" 
                            alt="Connect with Readers"
                            className="img-fluid rounded-3 mb-3"
                          />
                          <h4 className="h5 mb-3">Connect with Readers</h4>
                          <p className="text-muted mb-0">
                            Engage with your audience through comments. 
                            Build a following and join a community of like-minded individuals.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
  
          {isSignedIn === true && (
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card border-0 shadow-lg">
                  <div className="card-body p-5">
                    <div className="text-center mb-5">
                      <div className="position-relative d-inline-block mb-4">
                        <img 
                          src={user.imageUrl} 
                          className="rounded-circle border border-4 border-white shadow" 
                          alt="Profile" 
                          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2 border border-3 border-white">
                          <div className="bg-success rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                        </div>
                      </div>
                      <h2 className="display-6 mb-2">Welcome, {user.firstName}!</h2>
                      <p className="text-muted fs-5 mb-0">{user.emailAddresses[0].emailAddress}</p>
                    </div>
  
                    <div className="border-top border-bottom py-4 mb-4">
                      <h3 className="h4 text-center mb-4">Choose Your Journey</h3>
                      {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                          <i className="bi bi-exclamation-triangle-fill me-2"></i>
                          {error}
                          <button type="button" className="btn-close" onClick={() => setError("")}></button>
                        </div>
                      )}
                      <div className="row justify-content-center g-3">
                        <div className="col-md-4">
                          <div className="form-check custom-radio border rounded-3 p-3 text-center h-100">
                            <input
                              type="radio"
                              name="role"
                              id="admin"
                              value="admin"
                              className="form-check-input"
                              onChange={onSelectRole}
                            />
                            <label className="form-check-label w-100" htmlFor="admin">
                              <i className="bi bi-shield-lock fs-4 d-block mb-2"></i>
                              <span className="fw-bold d-block mb-2">Admin</span>
                              <small className="text-muted">Manage the platform and maintain community standards</small>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check custom-radio border rounded-3 p-3 text-center h-100">
                            <input
                              type="radio"
                              name="role"
                              id="author"
                              value="author"
                              className="form-check-input"
                              onChange={onSelectRole}
                            />
                            <label className="form-check-label w-100" htmlFor="author">
                              <i className="bi bi-pen fs-4 d-block mb-2"></i>
                              <span className="fw-bold d-block mb-2">Author</span>
                              <small className="text-muted">Create and publish your own articles</small>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check custom-radio border rounded-3 p-3 text-center h-100">
                            <input
                              type="radio"
                              name="role"
                              id="user"
                              value="user"
                              className="form-check-input"
                              onChange={onSelectRole}
                            />
                            <label className="form-check-label w-100" htmlFor="user">
                              <i className="bi bi-person fs-4 d-block mb-2"></i>
                              <span className="fw-bold d-block mb-2">Userr</span>
                              <small className="text-muted">Explore articles and engage with authors</small>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center text-muted">
                      <small>Your role determines how you'll interact with the BlogVerse community</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default Home;