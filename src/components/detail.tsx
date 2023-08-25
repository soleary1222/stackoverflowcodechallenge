// DetailView.js
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import constants from "../constants.json";
import Answer from "./answer";
import { AnswerProps } from "../interfaces/answerProps";
import { QuestionProps } from "../interfaces/questionProps";
import "../styles/detail.css";

const HtmlToReactParser = require("html-to-react").Parser;

const htmlParser = (string: string) => {
  const parser = new HtmlToReactParser();
  return parser.parse(string);
};

// Shuffle array function using Fisher-Yates/Durstenfield shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const DetailView = () => {
  const [question, setQuestion] = React.useState<QuestionProps>();
  const [answers, setAnswers] = React.useState<AnswerProps[]>([]);
  const { questionId } = useParams();

  useEffect(() => {
    //Get Question By ID with the body
    const apiKey = constants.apiKey;
    const apiUrl = `https://api.stackexchange.com/2.3/questions/${questionId}?site=stackoverflow&filter=withbody&key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setQuestion(response.data.items[0]);
        //Then get Answers with answer body for the question
        const answerUrl = `https://api.stackexchange.com/2.3/questions/${questionId}/answers?site=stackoverflow&filter=withbody&key=${apiKey}`;
        axios.get(answerUrl).then((response) => {
          const shuffled = shuffleArray(response.data.items);
          setAnswers(shuffled);
          console.log(shuffled);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [questionId]);

  return (
    <div>
      {question && answers && (
        <div className="question-body">
          <div className="question-content">
            <h1>{question.title}</h1>
            <p>{htmlParser(question.body)}</p>
          </div>
          <h1>Select what you believe to be the correct answer:</h1>

          {answers.map((answer: any) => (
            <Answer
              key={answer.answer_id}
              is_accepted={answer.is_accepted}
              score={answer.score}
              owner={answer.owner}
              answer_id={answer.answer_id}
              body={htmlParser(answer.body)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailView;
