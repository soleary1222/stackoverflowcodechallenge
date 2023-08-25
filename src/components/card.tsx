import React from "react";
import { Link } from "react-router-dom";
import "../styles/card.css";
import { QuestionProps } from "../interfaces/questionProps";

const Card: React.FC<QuestionProps> = ({
  title,
  tags,
  body,
  imageUrl,
  question_id,
  link,
}) => {
  const regex = /(<([^>]+)>)/gi;
  const content = body.replace(regex, "").substring(0, 100) + "...";

  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt="Poster Avatar" />}
      <div className="card-content">
        <Link to={`/detail/${question_id}`}>
          <h2>{title}</h2>
        </Link>
        <div>{content}</div>
        <p>Tags: {tags}</p>
        <a href={link}>Link to StackOverflow</a>
      </div>
    </div>
  );
};

export default Card;
