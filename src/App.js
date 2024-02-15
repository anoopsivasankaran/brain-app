import './App.scss';
import {
    createHashRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from './Home';
import Game from './Game';
import Wrapper from './Wrapper';
import Results from './Results';
import { Table } from './Table';
import { MenuPage } from './MenuPage';

//"homepage": "https://anoopsivasankaran.github.io/brain-app",
const router = createHashRouter([
    {
        path: "/",
        element: <Wrapper />,
        children: [
            {
                index: true,
                element: <MenuPage />,
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/table",
                element: <Table />
            },
            {
                path: "/game",
                element: <Game />
            },
            {
                path: "/results",
                element: <Results />
            }
        ]
    },
    
]);
function App() {
  return (
    <div className="App">
        <div className="app-body">
        <RouterProvider router={router} />
       </div>
    </div>
  );
}

export default App;
