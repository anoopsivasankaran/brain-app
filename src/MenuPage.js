import { Link } from 'react-router-dom';
import './MenuPage.scss';
import { getMenuItems } from './config';

export function MenuPage() {
    const menuItems = getMenuItems();
    return (
        <div className="MenuPage">
            {
                menuItems.map(({key, name, image}) => {
                    return (
                        <Link className="menu-item" key={key} to={`/home?match=${key}`}>
                            <div className="menu-image">
                                <img width={40} height={40} src={image} alt={name}/>
                            </div>
                            <div className="menu-info">{name}</div>
                        </Link>
                    )
                })
            }
        </div>
    );
}
