import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './animation.css';
import gapi,{loadClient,execute} from './libs/gapi'
import {CSSTransition,TransitionGroup,SwitchTransition} from 'react-transition-group'
import styled from 'styled-components'

const Style={
  Page:styled.div`
    margin:10px;
    display:flex;
    flex-direction:column;
  `,
  SearchBar:styled.div`
    display:flex;
  `,
  SearchResult:styled.div`

  `
}
const Namecard={
  Box:styled.div`
    display:flex;
    justify-content:center;
    justify-content: center;
    margin-top: 20px;
    border: 1px solid #cbcbe8;
    padding: 10px;
    position: relative;
  `,
  Avatar:styled.div`
    width:160px;
    padding:20px 0;
    & img{
      box-shadow:#444444b5 0 0 3px;
    }
  `,
  Content:styled.div`
    display:flex;
    flex-direction:column;
    padding:0 10px;
    align-items:flex-start;
    text-align:left;
  `,
  Header:styled.div`
    & h2{
      margin:5px 0;
    }
    & small{
      color:#9a9a9a;
    }
  `,
  Body:styled.div``,
  Footer:styled.div``,
  Remove:styled.div`
    position:absolute;
    top:20px;
    right:20px;
    & span{
      border: 1px solid #aaa;
      color: #aaa;
      font-size: 8px;
      cursor: pointer;
      padding: 1px 4px;
    }
  `
}
var list=[];
function App() {
  let [key,setKey]=useState('');
  let [result,setResult]=useState([]);

  let search=async ()=>{
      if(!key){
        alert('input something.')
        return;
      }
      if(!gapi.client.kgsearch)
        await loadClient();
      let res=await execute({query:key,types:['brand']});
      list=JSON.parse(res.body).itemListElement;
      if(list.length==0){
        setResult([]);
        return;
      }
      console.log([list[0].result]);
      setResult([list[0].result]);    
      list.splice(0,1);      
      console.log(list);
  }
  function notme(){
    let newresult=[];
    console.log(list)
    if(list[0]){
      newresult.push(list[0].result);
      list.splice(0,1);
    }
    setResult(newresult);
      
  }
  return (
    <div className="App">
      <Style.Page>
        <Style.SearchBar>
          <input onChange={(e)=>{
            setKey(e.target.value)
          }}></input>
          <button onClick={(e)=>search()}>search</button>
        </Style.SearchBar>
        <Style.SearchResult>          
          <TransitionGroup>
            {result.length==0&&key?(
                <CSSTransition 
                key='noresult'
                classNames="fade"
                timeout={500}>
                <div>no result</div>
                </CSSTransition>
            ):result.map(r=>(
                <CSSTransition 
                  key={r['@id']}
                  classNames="fade"
                  timeout={500}>
                  <Namecard.Box>
                    {!r.image?null:(
                      <Namecard.Avatar>                      
                          <img width="160" src={r.image.contentUrl} alt={r.name}></img>                      
                      </Namecard.Avatar>
                    )}
                    <Namecard.Content>
                      <Namecard.Header>
                        <h2>{r.name}</h2>
                        <small>{r.description}</small>
                      </Namecard.Header>
                      <Namecard.Body>
                        <p>{r.detailedDescription.articleBody}</p>
                      </Namecard.Body>
                    </Namecard.Content>
                    <Namecard.Remove>
                      <span onClick={()=>notme()}>Not me</span>
                    </Namecard.Remove>
                  </Namecard.Box>
                </CSSTransition>
            ))}
          </TransitionGroup>
        </Style.SearchResult>
      </Style.Page>
    </div>
  );
}

export default App;
