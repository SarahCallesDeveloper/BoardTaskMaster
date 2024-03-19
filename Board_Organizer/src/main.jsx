import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Card } from './Components/card'; // Adjust the import path accordingly
import json from './jsonTest.json'; // Assuming you have a JSON file with card data
import jsonList from "./listTest.json"
//import {List} from "./Components/list"
//import {Board} from "./Components/Board"
import jsonBoard from "./BoardTest.json"
import {Board} from "./Components/alternativeboard"
import Alternative from "./Components/Alternative/alternativeBoard2.jsx"
//import {Card} from "./Components/AlternativeCard"


//<Board boardData={jsonBoard}></Board>
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Alternative/>
 <Board board={jsonBoard}/>
  {console.log("jsonBoard: ",jsonBoard)}
  </>,
);