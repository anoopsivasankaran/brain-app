import './App.scss';
import {
    createHashRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from './Home';
import Game from './Game';


const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/game",
        element: <Game />
    }
]);
function App() {
  console.log(window.location.hash);
  return (
    <div className="App">
        <div className="header">
            <label>Eshan's Brain App</label>
        </div>
        <div className="app-body">
        <RouterProvider router={router} />
       </div>
    </div>
  );
}

export default App;
