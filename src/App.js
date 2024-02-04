import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from './Home';
import Game from './Game';


const router = createBrowserRouter([
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
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
