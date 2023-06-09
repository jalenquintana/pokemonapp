import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [data, setData] = useState();
  const [name, setName] = useState();
  const [weight, setWeight] = useState();
  const [number, setNumber] = useState(1);

  let URL="https://pokeapi.co/api/v2/pokemon/1"
  if (number && number>0 && number<1010){
    URL=`https://pokeapi.co/api/v2/pokemon/${number}`
  }

  useEffect(()=>{
    axios.get(URL).then((response) => {
      setData(response.data)
      setName(response.data.name)
      setWeight(response.data.weight)
    }).catch((err) => {
      window.alert(err);
    })
  }, [URL])


  return (
    <div className="App">
      <h1>Pokemon Index</h1>
      <h4>Type a number to see a pokemon!</h4>
      <p>Pokemon #</p>
      <input type="number" placeholder="1"onChange={(e)=>(setNumber(e.target.value))}/>
      <h2>Name: {name}</h2>
      <h3>Weight: {weight}</h3>
      <img src={data ? data.sprites.front_default : "<p>No image available</p>"}></img>
      <p>My abilities are:</p>
      {data ? data.abilities.map((value, index) => {
      return(
        <div key={index}>
          {value.ability.name}
        </div>
      )
      }):""}
    </div>
  );
}

export default App;
