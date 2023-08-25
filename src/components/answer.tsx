import React from "react";
import "../styles/answer.css";
import { AnswerProps } from "../interfaces/answerProps";

const Answer: React.FC<AnswerProps> = ({
  is_accepted,
  body,
  owner,
  score,
  answer_id,
}) => {
  const checkAnswer = (is_accepted: boolean, score: number) => {
    if (is_accepted) {
      alert("Correct!  This was the chosen answer with a score of " + score);
    } else {
      alert("Sorry, try again");
    }
  };
  return (
    <div className="answer" onClick={() => checkAnswer(is_accepted, score)}>
      <div className="answer-content">
        <div>{body}</div>
      </div>
    </div>
  );
};

export default Answer;
