import React from 'react'
import successGif from "../assets/successGif.gif"

const DummyPage = () => {
  return (
    <div>
      <h4>Congratulations! Your profile will be built on the basis of the responses submitted by you on the platform.Based on them you can find people simillar to you registered on our platform and can indulge in a converstion with them if you feel like :)
       
    </h4>
    <h4 style={{marginTop:"1rem"}}> Go to <a href="findFriends">My friends Section</a>.</h4>
    <div className='mx-auto'>
        <img src={successGif} alt="Success gif" className='mx-auto' />
    </div>
    </div>
    
  )
}

export default DummyPage
