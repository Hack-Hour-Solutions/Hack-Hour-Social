import React, { FC, ReactElement } from "react";
import axios, { AxiosResponse } from "axios";

const ProblemDisplay: FC<{}> = (): ReactElement => {
  let title: string = '';
  let url: string = '';
  let difficulty: string = '';

  // (async (): Promise<void> => {
  //   try {
  //     const response: AxiosResponse = await axios.get('/api/problem');
  //     title = response.data.title;
  //     url = response.data.url;
  //     difficulty = response.data.difficulty;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })();

  return (
    <div id='problem-display'>
    <h3>Today's Hack Hour</h3>
    <p>
      <strong>Title:</strong>
      {title}
    </p>
    <p>
      <strong>Link: </strong>
      <a href={url} target="_blank" rel="noopener noreferrer">Go to Leetcode</a>
    </p>
    <p>
      <strong>Difficulty: </strong>
      {difficulty}
    </p>
  </div>
  )
};

export default ProblemDisplay;