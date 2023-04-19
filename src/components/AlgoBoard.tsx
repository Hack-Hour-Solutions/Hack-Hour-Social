import React from "react";
import NavBar from "./NavBar";
import ProblemDisplay from "./ProblemDisplay";

const AlgoBoard = (props) => {
  return (
  <div className="App">
    <NavBar name='Bob' picture="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png"/>
    <ProblemDisplay />
  </div>
  )
} 

export default AlgoBoard;