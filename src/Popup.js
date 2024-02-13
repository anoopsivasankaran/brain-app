import './Popup.scss';

export function Popup({message, onYes, onNo}) {
    return (
        <div className="Popup">
            <div className='Popup-body'>
                <div className='Popup-message'>
                    {message}
                </div>
                <div className="Popup-footer">
                    <button className="yes" onClick={onYes}>YES</button>
                    <button className="no" onClick={onNo}>NO</button>
                </div>
            </div>
        </div>
    );
}