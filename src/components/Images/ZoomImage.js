import React, { useState } from 'react'

function ZoomImage({src}) {

    const [state, setState] = useState({backgroundPosition: '0% 0%'});
    const [isHover, setHover] = useState(false);

    const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        setState({backgroundPosition: `${x}% ${y}%`});
    }

    const styles = {
        figure: {
            width: '100%',
            maxWidth: '450px',
            margin: 'auto',
            backgroundColor: '#ccc',
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            cursor: 'crosshair'
        },
        img: {
            display: 'block',
            width: '100%',
            maxWidth: '450px',
            pointerEvents: 'none',
            opacity: isHover ? "0" : "1"
        }
    }

    return (
        <figure 
            style={{...state, ...styles.figure}}
            // onMouseMove={handleMouseMove} 
            // onMouseEnter={() => setHover(true)}
            // onMouseLeave={() => setHover(false)}
        >
            <img src={src} style={styles.img} />
        </figure>
    )
}

export default ZoomImage