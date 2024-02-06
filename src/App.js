import './App.scss';
import {
    createHashRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from './Home';
import Game from './Game';
import Wrapper from './Wrapper';

//"homepage": "https://anoopsivasankaran.github.io/brain-app",
const router = createHashRouter([
    {
        path: "/",
        element: <Wrapper />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/game",
                element: <Game />
            }
        ]
    },
    
]);
function App() {
  console.log(window.location.hash);
  return (
    <div className="App">
        <div className="app-body">
        <RouterProvider router={router} />
       </div>
    </div>
  );
}

export default App;
