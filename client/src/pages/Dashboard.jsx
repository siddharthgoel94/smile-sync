import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import questionBank from "../../utils/QuestionBank";

const Dashboard = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    // console.log(currentQuestionIndex);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };
  // const ans = new Array(questionBank.anxietyQuestions.length);
  const n = questionBank.length; // Desired length of the array
  const [answers, setAnswers] = useState(new Array(n).fill(0)); // Initialize array with zeros

  const modifyArray = (answers) => {
    const arr = new Array(5);
    //8
    let one = 0,
      zero = 0;
    for (let i = 0; i <= 7; i++) {
      if (answers[i] === 1) one++;
      else zero++;
    }
    let res = one / 8.0;
    arr[0] = res;

    //5
    one = 0;
    zero = 0;
    for (let i = 8; i <= 12; i++) {
      if (answers[i] === 1) one++;
      else zero++;
    }
    res = one / 5.0;
    arr[1] = res;

    //9
    one = 0;
    zero = 0;
    for (let i = 13; i <= 21; i++) {
      if (answers[i] === 1) one++;
      else zero++;
    }
    res = one / 9.0;
    arr[2] = res;

    //6
    one = 0;
    zero = 0;
    for (let i = 22; i <= 27; i++) {
      if (answers[i] === 1) one++;
      else zero++;
    }
    res = one / 6.0;
    arr[3] = res;

    //7
    one = 0;
    zero = 0;
    for (let i = 28; i <= 34; i++) {
      if (answers[i] === 1) one++;
      else zero++;
    }
    res = one / 7.0;
    arr[4] = res;

    console.log(arr);
    return arr;
  };
  async function test() {
    const res = await axios.post("http://localhost:3000/predict", {
      body: [0.25, 0, 0.1111111111111111, 0, 0.14285714285714285],
    });
  }
  // test();
  async function handleSubmit() {
    // Handle submission logic here
    console.log("Submit Answers");
    const arr = modifyArray(answers);
    console.log(arr);

    const res = await axios.post("http://localhost:3000/predict", {
      body: arr,
    });
    console.log(answers);
  }

  // const updateIndex = (index, value) => {
  //   setAnswers((prevArray) => {
  //     const newArray = [...prevArray]; // Create a copy of the array
  //     newArray[index] = value; // Update the value at the specified index
  //     return newArray; // Return the updated array
  //   });
  // };
  const handleRadioClick = (index, value) => {
    setAnswers((prevArray) => {
      const newArray = [...prevArray]; // Create a copy of the array
      newArray[index] = value; // Update the value at the specified index
      return newArray; // Return the updated array
    });
    // ans[index] = value;
    // console.log(index, value, ans[index]);
  };

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchLuckyNumber = async () => {
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard",
        axiosConfig
      );
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLuckyNumber();
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  return (
    <div className="dashboard-main">
      <h2>{data.msg}</h2>
      <h2>Welcome to our Questionnaire</h2>
      {/* <p> Lets start with a questionnaire to know you better</p> */}

      {/* <div className="container">
        <h3>Your Personality according to our tests</h3>
        <p>Intoverted</p>
        <p>Shy</p>
        <p>Reserved</p>
      </div> */}
      <div className="container modalbox">
        {currentQuestionIndex < questionBank.length ? (

          
          <>
          <div className="card text-center w-75 mx-auto">
          <div className="card-header fs-3">
          Question {currentQuestionIndex+1}
          </div>
          <div className="card-body">
            <h5 className="card-title"> </h5>
            <p className="card-text fs-2">{questionBank[currentQuestionIndex].question}</p>
            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}

            <div className="text-center">
              <div
                className="btn-group mx-4 mx-auto"
                role="group"
                aria-label="Basic radio toggle button group"
                required
              >
                <input
                  type="radio"
                  className="btn-check btn-lg"
                  name={`btnradio-${currentQuestionIndex}`}
                  id={`btnradio${currentQuestionIndex}-yes`}
                  onClick={() => handleRadioClick(currentQuestionIndex, 1)}
                  // autocomplete="off"
                />
                <label
                  className="btn btn-outline-primary btn-lg"
                  htmlFor={`btnradio${currentQuestionIndex}-yes`}
                >
                  Yes
                </label>

                <input
                  type="radio"
                  className="btn-check btn-lg"
                  name={`btnradio-${currentQuestionIndex}`}
                  id={`btnradio${currentQuestionIndex}-no`}
                  onClick={() => handleRadioClick(currentQuestionIndex, 0)}
                  // autocomplete="off"
                />
                <label
                  className="btn btn-outline-secondary btn-lg"
                  htmlFor={`btnradio${currentQuestionIndex}-no`}
                >
                  No
                </label>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handlePrevQuestion}
                className="btn btn-secondary mx-5"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                className="btn btn-secondary mx-5"
                disabled={currentQuestionIndex === questionBank.length}
              >
                Next
              </button>
            </div>


          </div>
          <div className="card-footer text-muted">
            <div style={{width:`${currentQuestionIndex*2.77}%`}} className="clsdalo"></div>
          </div>
        </div>
          </>
        ) : (
          <div>
            <h2>Thank you for completing the quiz!</h2>
            <a href="resultPage">
            <button
              className="btn btn-success w-50 mx-auto"
              onClick={handleSubmit}
            >
              
              Submit my Answers
              
            </button>
            </a>
            
          </div>
        )}
      </div>
  
      {/* <Link to="/logout" className="logout-button">
        Logout
      </Link> */}
    </div>
  );
};

export default Dashboard;
