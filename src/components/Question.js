import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect to manage countdown timer
  useEffect(() => {
    if (timeRemaining === 0) {
      // When timeRemaining hits 0, reset it and trigger onAnswered
      setTimeRemaining(10);
      onAnswered(false);
      return;
    }

    // Set up a timer to decrease timeRemaining every second
    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts or timeRemaining changes
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); // Dependency array: only re-run the effect if timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset time remaining after answering
    onAnswered(isCorrect); // Call onAnswered to notify the parent component
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
