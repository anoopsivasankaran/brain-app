import './Image.scss';

export default function Image({src, alt="alt"}) {
    return (
        <div className="Image">
            <img src={src} alt={alt}/>
        </div>
    );
}
