import { Link, Outlet, useLocation } from "react-router-dom";
import './Wrapper.scss';

export default function Wrapper() {

    const { pathname } = useLocation();
    
    return (
        <div className="Wrapper">
            <div className="header">
                {
                    pathname !== '/' && (
                        <Link to="/">
                            <button> &#60; HOME</button>
                        </Link>
                    )
                }
                
                <label>Eshan's Mega Mind</label>
            </div>
            <div className="wrapper-body">
                <Outlet />
            </div>
        </div>
    );
}
