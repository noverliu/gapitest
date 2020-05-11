import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import gapi from './libs/gapi'
function App() {
  let [key,setKey]=useState('');
  let search=()=>{
      // gapi.search({
      //   query:key
      // }).then(data=>{
      //   console.log(data);

      // }).catch(err=>{
      //   console.error(err);
      // })
  }
  return (
    <div className="App">
      <header className="App-header">
        <input onChange={(e)=>{
          setKey(e.target.value)
        }}></input>
        <span>{key}</span>
        <button onClick={(e)=>search()}>search</button>
      </header>
    </div>
  );
}

export default App;
