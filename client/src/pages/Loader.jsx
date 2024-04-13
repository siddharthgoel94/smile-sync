import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for redirection
import '../styles/loader.css'
import {HashLoader} from 'react-spinners'
 

const Loader = () => {
  // const history = useHistory();
   // Initialize history object
  const navigate=useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the desired page after 4 seconds
      // history.push('/resultPage');
       // Replace '/target-page' with your desired target URL
       navigate("/resultPage");
    }, 4000); // 4000 milliseconds = 4 seconds

    return () => clearTimeout(timer); // Cleanup function to clear the timeout when component unmounts
  }, [history]); // Add history object to dependencies array to avoid useEffect being called on every render
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"90vh"}}>
    <HashLoader 
    color="#36d7b7"
    size={200} />
    </div>
    
    
    
  )
}

export default Loader
