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
    console.log(currentQuestionIndex);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };
  // const ans = new Array(questionBank.anxietyQuestions.length);
  const n = questionBank.anxietyQuestions.length; // Desired length of the array
  const [answers, setAnswers] = useState(new Array(n).fill(0)); // Initialize array with zeros

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Submit Answers");
    // for (let i = 0; i < answers.length; i++) {
    //   console.log(answers[i]);
    // }
    console.log(answers);
  };

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
      <h1>Dashboard</h1>
      <p>{data.msg}! Lets start with a questionnaire to know you better</p>
      {/* <form> */}
      {/* {questionBank.anxietyQuestions.map((question, index) => (
          <div key={index}>
            {question.question}
            <div
              class="btn-group mx-4"
              role="group"
              aria-label="Basic radio toggle button group"
              required
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id={`btnradio${index}-yes`}
                autocomplete="off"
              />
              <label
                class="btn btn-outline-primary"
                for={`btnradio${index}-yes`}
              >
                Yes
              </label>

  <input type="radio" class="btn-check" name="btnradio" id={`btnradio${index}-no`} autocomplete="off"/>
  <label class="btn btn-outline-secondary" for={`btnradio${index}-no`}>No</label>
</div>
</div>
        ))
        
      }
      <div className='mx-auto'>
      <button className='btn btn-success w-50 mx-auto' type="submit">Submit my Answers</button>
      </div>
      </form>
      <Link to="/logout" className="logout-button">Logout</Link>
    </div>
  );
};

export default Dashboard;
