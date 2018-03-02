import React from 'react'; //es6 에 새로운 문법 var React=require('react'); 와 같은 코드
import Contact from './Contact';

class App extends React.Component{
  render(){
    return(
      <Contact/>
    );
  }
}

export default App;  //module.export=App; 과 같은 코드
//이렇게 하면 다른 코드에서 이 클래스를 불러올수있다.
