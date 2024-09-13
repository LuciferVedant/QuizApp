import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

function QuizCreator() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: [],
    correctAnswer: "",
  });

  // Add a new question to the quiz
  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ question: "", options: [], correctAnswer: "" });
  };

  // Save the entire quiz (title and questions) to local storage
  const saveQuiz = () => {
    if (!quizTitle) {
      alert("Please enter a quiz title.");
      return;
    }
    const quizData = { title: quizTitle, questions };
    localStorage.setItem("savedQuiz", JSON.stringify(quizData)); // Save quiz to local storage
    alert("Quiz saved successfully!");
    setQuizTitle("");
    setQuestions([]);
  };

  // Clear quiz data from local storage
  const clearQuizData = () => {
    localStorage.removeItem("savedQuiz");
    alert("Quiz data cleared!");
  };

  return (
    <div>
      <h2>Create a Quiz</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter quiz title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </Form.Group>

        <Card className="mb-3">
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question"
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    question: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Options</Form.Label>
              {["A", "B", "C", "D"].map((option, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  placeholder={`Option ${option}`}
                  className="mb-2"
                  value={currentQuestion.options[index] || ""}
                  onChange={(e) => {
                    const options = [...currentQuestion.options];
                    options[index] = e.target.value;
                    setCurrentQuestion({ ...currentQuestion, options });
                  }}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                as="select"
                value={currentQuestion.correctAnswer}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    correctAnswer: e.target.value,
                  })
                }
              >
                <option value="">Select correct answer</option>
                {["A", "B", "C", "D"].map((option, index) => (
                  <option key={index} value={currentQuestion.options[index]}>
                    {`Option ${option}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="success" onClick={addQuestion}>
              Add Question
            </Button>
          </Card.Body>
        </Card>

        <Button variant="primary" onClick={saveQuiz}>
          Save Quiz
        </Button>
        <Button variant="danger" className="ms-2" onClick={clearQuizData}>
          Clear Quiz Data
        </Button>
      </Form>

      <h4 className="mt-4">Questions Added:</h4>
      {questions.map((q, index) => (
        <Card key={index} className="mb-2">
          <Card.Body>
            <Card.Title>{`Q${index + 1}: ${q.question}`}</Card.Title>
            <ul>
              {q.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <strong>Correct Answer: {q.correctAnswer}</strong>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default QuizCreator;
