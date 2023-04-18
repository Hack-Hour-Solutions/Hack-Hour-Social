import React, { FC, ReactElement } from "react";

type ProblemProps = {
  title: string,
  url: string,
  difficulty: string
}

const ProblemDisplay: FC<ProblemProps> = ({ title, url, difficulty }): ReactElement => (
  <div id='problem-display'>
    <h3>Today's Hack Hour</h3>
    <p>
      <strong>Title:</strong>
      {title}
    </p>
    <p>
      <strong>Link: </strong>
      <a href={url}>{url}</a>
    </p>
    <p>
      <strong>Difficulty: </strong>
      {difficulty}
    </p>
  </div>
);

export default ProblemDisplay;