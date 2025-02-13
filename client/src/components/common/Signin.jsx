import React from 'react'
import { SignIn } from '@clerk/clerk-react'
function Signin() {
  return (
    <div className='d-flex justify-content-center alig-items-center h-100'>
      <SignIn/>
    </div>
  )
}

export default Signin