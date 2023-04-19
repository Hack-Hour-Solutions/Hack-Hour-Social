import React from "react";
import NavBar from "./NavBar";
import ProblemDisplay from "./ProblemDisplay";

const AlgoBoard = (props) => {
  // for testing
  let info = {
    name: 'Bob',
    email: 'sponge@bob.com',
    picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png',
    id: 4
  }
  const setInfo = (value) => {
    info = value;
  }
  const user = props.user ? props.user : info;
  const setUser = props.setUser ? props.setUser : setInfo;

  return (
  <div className="App">
    {/* <NavBar name='Bob' picture="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png"/> */}
    {/* <NavBar {...props} /> */}
    <NavBar user={user} setUser={setUser} />
    <ProblemDisplay />
  </div>
  )
} 

export default AlgoBoard;