import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function QuizTaker() {
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Fetch the saved quiz from local storage on component mount
  useEffect(() => {
    const savedQuiz = JSON.parse(localStorage.getItem("savedQuiz"));
    if (savedQuiz) {
      setQuiz(savedQuiz);
    } else {
      alert("No quiz found. Please create a quiz first.");
    }
  }, []);

  // Handle the selection of an answer
  const handleAnswerSelection = (answer) => {
    setAnswers([...answers, answer]);
    if (answer === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true); // Show results after the last question
    }
  };

  // Clear quiz data from local storage
  const clearQuizData = () => {
    localStorage.removeItem("savedQuiz");
    setQuiz(null); // Reset quiz state
    setScore(0); // Reset score
    setCurrentQuestionIndex(0); // Reset question index
    setAnswers([]); // Clear answers
    setShowResults(false); // Hide results
    alert("Quiz data cleared!");
  };

  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div>
      <h2>Take Quiz: {quiz.title}</h2>
      {!showResults ? (
        <Card>
          <Card.Body>
            <Card.Title>
              {quiz.questions[currentQuestionIndex].question}
            </Card.Title>
            {quiz.questions[currentQuestionIndex].options.map(
              (option, index) => (
                <Button
                  key={index}
                  variant="outline-primary"
                  className="mb-2"
                  onClick={() => handleAnswerSelection(option)}
                >
                  {option}
                </Button>
              )
            )}
          </Card.Body>
        </Card>
      ) : (
        <div>
          <h3>
            Your Score: {score} / {quiz.questions.length}
          </h3>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retake Quiz
          </Button>
        </div>
      )}
      <Button variant="danger" className="mt-3" onClick={clearQuizData}>
        Clear Quiz Data
      </Button>
    </div>
  );
}

export default QuizTaker;
