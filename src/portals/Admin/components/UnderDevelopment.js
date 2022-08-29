import React from 'react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

function UnderDevelopment(props) {
    
    const styles = {
        pageCenter: {position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'},
    }

    return (
        <h2 style={styles.pageCenter}><AutoFixHighIcon sx={{fontSize: '1.75rem', marginRight: '0.5rem'}}/> {props.webpage} Page | <span style={{fontSize: '1rem'}}>Under Development</span></h2>
    )

}

export default UnderDevelopment