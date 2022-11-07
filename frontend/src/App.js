import { useState } from "react";

function Card(props) {

  const { name } = props;

  return (<div>{name}</div>)
}

const model = [
  "card#1",
  "card#2",
  "card#3",
  "card#4",
  "card#5",
  "card#6",
];

function App() {

  const [ state, setState ] = useState(model);

  function buttonOnClick() {
    state.push("card#7");
    setState([...state]);
  }

  return (
    <div>
      {state.map((e, i) => <Card key={i} name={e}/>)}
      <button onClick={buttonOnClick}>Add new card</button>
    </div>
  );
}

export default App;
