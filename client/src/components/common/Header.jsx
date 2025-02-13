// import { useContext, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useClerk, useUser } from "@clerk/clerk-react"
// import { userAutherContextObj } from "../../contexts/userAutherContext"

// function Header() {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const navigate = useNavigate()
//   const { signOut } = useClerk()
//   const { currentUser, setCurrentUser } = useContext(userAutherContextObj);
//   const {isSignedIn,user,isLoaded} =useUser();

//   const toggleNavbar = () => {
//     setIsExpanded(!isExpanded)
//   }

//   // Function to sign out
//   async function handleSignOut() {
//     await signOut()
//     setCurrentUser(null)
//     localStorage.removeItem("currentuser")
//     navigate("/")
//   }

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
//       <div className="container-fluid">
//         <Link className="navbar-brand d-flex align-items-center" to="/">
//           <span className="fw-bold text-primary">LOGO</span>
//         </Link>

//         <button 
//           className={`navbar-toggler ${isExpanded ? 'collapsed' : ''}`}
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           onClick={toggleNavbar}
//           aria-expanded={isExpanded}
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className={`collapse navbar-collapse justify-content-end ${isExpanded ? 'show' : ''}`} id="navbarNav">
//           <ul className="navbar-nav gap-2">
//             {!isSignedIn ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link btn btn-outline-primary rounded-pill px-3" to="/">
//                     Home
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link btn btn-outline-success rounded-pill px-3" to="/signin">
//                     Signin
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link btn btn-outline-info rounded-pill px-3" to="/signup">
//                     Signup
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <div className="user-button">
//                 <div style={{position:"relative"}}>
//                   <img src={user.imageUrl} width="40px" className='rounded-circle' alt="" />
//                 <p className='role' style={{position:'absolute',top:"0px",right:"-20px"}}>{currentUser.role}</p>
//                 </div>
//                 <p className='mb-0 user-name' style={{position:"absolute"}}>{user.firstName}</p>
//                 <button className="btn btn-danger signedout-btn" onClick={handleSignOut}>
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Header;



import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, useUser } from "@clerk/clerk-react"
import { userAutherContextObj } from "../../contexts/userAutherContext"

function Header() {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()
  const { signOut } = useClerk()
  const { currentUser, setCurrentUser } = useContext(userAutherContextObj);
  const { isSignedIn, user, isLoaded } = useUser();

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded)
  }

  // Function to sign out
  async function handleSignOut() {
    await signOut()
    setCurrentUser(null)
    localStorage.removeItem("currentuser")
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="fw-bold text-primary">LOGO</span>
        </Link>

        <button 
          className={`navbar-toggler ${isExpanded ? 'collapsed' : ''}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          onClick={toggleNavbar}
          aria-expanded={isExpanded}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${isExpanded ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav gap-3">
            {!isSignedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-primary rounded-pill px-4 py-2 transition-all hover:scale-105" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-success rounded-pill px-4 py-2 transition-all hover:scale-105" to="/signin">
                    Signin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-info rounded-pill px-4 py-2 transition-all hover:scale-105" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <div className="user-button d-flex align-items-center gap-2">
                <div style={{ position: "relative" }}>
                  <img src={user.imageUrl} width="40px" className='rounded-circle' alt="" />
                  <p className='role' style={{ position: 'absolute', top: "0px", right: "-20px", fontSize: "12px", color: "#fff", fontWeight: "bold" }}>
                    {currentUser.role}
                  </p>
                </div>
                <p className='mb-0 user-name' style={{ position: "absolute", left: "50px", fontWeight: "bold", color: "#fff" }}>
                  {user.firstName}
                </p>
                <button className="btn btn-danger rounded-pill px-4 py-2 transition-all hover:scale-105" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header;
