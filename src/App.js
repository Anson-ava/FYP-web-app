import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './component/topBar';
import Content from './component/content';

class App extends Component {
  render() {
    return (
    <div className="App">
      <TopBar/>
      <Content/>
    </div>
  );
  }
}

export default App;

