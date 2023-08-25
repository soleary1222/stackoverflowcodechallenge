// src/components/Questions.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import constants from "../constants.json";
import { QuestionProps } from "../interfaces/questionProps";

const Home: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);

  useEffect(() => {
    // Get Question List sorted by recently created, filtered by questions having at least two answers and at least one accepted one
    const apiKey = constants.apiKey;
    const apiUrl = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=creation&site=stackoverflow&filter=withbody&key=${apiKey}&accepted=true&answers=2`;

    axios
      .get(apiUrl)
      .then((response) => {
        setQuestions(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Recent StackOverflow Questions</h1>
      <div className="card-container">
        {questions.map((question) => (
          <Card
            key={question.question_id}
            title={question.title}
            tags={question.tags.join(", ")}
            imageUrl={question.owner.profile_image}
            body={question.body}
            question_id={question.question_id}
            link={question.link}
            owner={question.owner}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
