import React from "react";
import ProblemDisplay from "./ProblemDisplay";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <NavBar name='Bob' picture="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png"/>
      <ProblemDisplay title='title' url='link' difficulty='difficulty'/>
    </div>
  )
}

export default App
