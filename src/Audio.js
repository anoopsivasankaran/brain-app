import './Audio.scss';

export default function Audio({src}) {
    return (
        <div className="Audio" key={src}>
            <video controls name="media">
                <source src={src} type="audio/mp4" />
            </video>
        </div>
    );
}
