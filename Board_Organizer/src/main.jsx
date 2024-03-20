import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Card } from './Components/card'; // Adjust the import path accordingly
import json from './jsonTest.json'; // Assuming you have a JSON file with card data
import jsonList from "./listTest.json"
//import {List} from "./Components/list"
//import {Board} from "./Components/alternativeboard.jsx"
import jsonBoard from "./BoardTest.json"
import Alternative from "./Components/Alternative/alternativeBoard2.jsx"
import YourComponent from "./Components/Alternative/YourComponent.jsx"
//import {Card} from "./Components/AlternativeCard"
import BoardHandler from './Components/BoarddHandler.jsx';


//<Board boardData={jsonBoard}></Board>
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
<BoardHandler/>
  {console.log("jsonBoard: ",jsonBoard)}
  </>,
);