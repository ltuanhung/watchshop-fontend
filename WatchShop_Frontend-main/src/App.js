import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Content from './page/Content.js'


function App() {
    
  return (
    <>
    
    <div className="wrapper">
        <div className="container">
            <div className="dashboard"> 
                <Content />
            </div>
        </div>
    </div>
   
    </>
  );
}

export default App;
