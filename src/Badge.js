import './Badge.scss';

export function Badge({type='dimond'}) {
    return <div className={`badge ${type}`}></div>
}