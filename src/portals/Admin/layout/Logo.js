import * as React from 'react';
import { useTheme } from '@mui/material/styles';

const Logo = props => {
    const theme = useTheme();
    return (
        <svg
            width={200}
            height={45}
            viewBox="0 0 200 45"
            {...props}
        >
            <g
                aria-label="~Admin Panel~"
                style={{
                    lineHeight: 1.25,
                }}
                fontWeight={400}
                fontSize={12}
                fontFamily="Permanent Marker"
                letterSpacing={0}
                wordSpacing={0}
                strokeWidth={0.265}
                fill={theme.palette.secondary.light}
            >
                <path d="M38.3,24.9h-6.1l-0.9,1.9c-0.1,0.3-0.2,0.5-0.2,0.6c0,0.3,0.2,0.5,0.7,0.6v0.3h-4.4V28c0.3-0.1,0.5-0.1,0.6-0.3
                    c0.1-0.1,0.3-0.4,0.5-0.8l4.9-10.2c0.2-0.3,0.2-0.6,0.2-0.8c0-0.3-0.2-0.5-0.6-0.6V15h4.7v0.3c-0.4,0.1-0.6,0.3-0.6,0.6
                    c0,0.2,0.1,0.4,0.2,0.6l5.1,10.3c0.2,0.4,0.4,0.7,0.6,0.9c0.2,0.2,0.4,0.3,0.7,0.3v0.3h-4.9V28c0.4-0.1,0.6-0.3,0.6-0.6
                    c0-0.1-0.1-0.3-0.2-0.6L38.3,24.9z M37.4,23.1l-2.2-4.7l-2.2,4.7H37.4z"/>
                <path d="M46,27.3v-8.9c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3v-0.3h6.4c1.3,0,2.4,0.2,3.2,0.5c1.1,0.5,1.9,1.2,2.3,2.3
                    c0.3,0.8,0.5,1.6,0.5,2.6c0,1.9-0.6,3.3-1.7,4.2c-0.5,0.4-1.1,0.7-1.8,0.9c-0.7,0.2-1.5,0.3-2.5,0.3h-6.4v-0.3
                    c0.2-0.1,0.4-0.1,0.5-0.3C46,27.7,46,27.5,46,27.3z M48.6,26.4h2.8c1.3,0,2.2-0.3,2.8-0.9c0.6-0.6,0.9-1.5,0.9-2.6s-0.3-2-0.9-2.6
                    c-0.3-0.3-0.7-0.5-1.1-0.7s-1-0.2-1.7-0.2h-2.8V26.4z"/>
                <path d="M67,28.3l-4-7.2v6.2c0,0.2,0,0.4,0.1,0.5s0.3,0.2,0.5,0.3v0.3H60v-0.3c0.2-0.1,0.4-0.1,0.5-0.3c0.1-0.1,0.1-0.3,0.1-0.5
                    v-8.9c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3v-0.3h4.6v0.3c-0.3,0.1-0.5,0.3-0.5,0.6c0,0.3,0.1,0.6,0.3,1l2.7,4.9l2.7-4.9
                    c0.3-0.5,0.5-0.9,0.5-1.1c0-0.3-0.2-0.4-0.5-0.5v-0.3h4.5v0.3c-0.2,0.1-0.4,0.2-0.5,0.3c-0.1,0.1-0.1,0.3-0.1,0.5v8.9
                    c0,0.2,0,0.4,0.1,0.5s0.3,0.2,0.5,0.3v0.3h-3.9v-0.3c0.2-0.1,0.4-0.1,0.5-0.3c0.1-0.1,0.1-0.3,0.1-0.5v-6.2L67,28.3z"/>
                <path d="M80.1,18.4v8.9c0,0.2,0,0.4,0.1,0.5s0.3,0.2,0.5,0.3v0.3h-3.9v-0.3c0.2-0.1,0.4-0.1,0.5-0.3c0.1-0.1,0.1-0.3,0.1-0.5v-8.9
                    c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3v-0.3h3.9v0.3c-0.2,0.1-0.4,0.2-0.5,0.3C80.2,18,80.1,18.2,80.1,18.4z"/>
                <path d="M86.2,21.1v6.2c0,0.2,0,0.4,0.1,0.5s0.3,0.2,0.5,0.3v0.3h-3.6v-0.3c0.2-0.1,0.4-0.1,0.5-0.3c0.1-0.1,0.1-0.3,0.1-0.5v-8.9
                    c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3v-0.3h4.2v0.3c-0.3,0.1-0.4,0.2-0.4,0.4c0,0.2,0.1,0.3,0.3,0.5l5.9,5.8v-6
                    c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3v-0.3h3.6v0.3c-0.2,0.1-0.4,0.2-0.5,0.3c-0.1,0.1-0.1,0.3-0.1,0.5v8.9c0,0.2,0,0.4,0.1,0.5
                    s0.3,0.2,0.5,0.3v0.3h-3.9v-0.3c0.3-0.1,0.4-0.2,0.4-0.4c0-0.1,0-0.2-0.1-0.3s-0.3-0.3-0.5-0.6L86.2,21.1z"/>
                <path d="M107.9,22.9v4.4c0,0.2,0,0.3,0.1,0.5s0.3,0.2,0.5,0.2v0.3h-4.2V28c0.2-0.1,0.4-0.2,0.5-0.3c0.1-0.1,0.1-0.3,0.1-0.4V16
                    c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3V15h8.3c1,0,1.7,0.1,2.3,0.2s1.1,0.4,1.5,0.7c0.4,0.3,0.8,0.8,1.1,1.3
                    c0.3,0.6,0.4,1.2,0.4,1.8c0,0.9-0.2,1.7-0.7,2.4c-0.4,0.6-1,1-1.7,1.2s-1.6,0.4-2.9,0.4H107.9z M107.9,20.7h4.4
                    c0.9,0,1.5-0.1,1.9-0.3c0.2-0.1,0.4-0.3,0.6-0.6s0.2-0.6,0.2-0.9c0-0.3-0.1-0.6-0.2-0.9s-0.3-0.5-0.6-0.6c-0.4-0.2-1-0.3-1.9-0.3
                    h-4.4V20.7z"/>
                <path d="M126.8,25.6h-5l-0.6,1.2c-0.1,0.3-0.2,0.5-0.2,0.7c0,0.3,0.2,0.5,0.6,0.6v0.3h-4v-0.3c0.2,0,0.4-0.1,0.6-0.2
                    c0.1-0.1,0.3-0.3,0.4-0.7l4-8.1c0.1-0.3,0.2-0.6,0.2-0.8c0-0.3-0.2-0.5-0.5-0.6v-0.3h4.2v0.3c-0.4,0.1-0.5,0.4-0.5,0.7
                    c0,0.2,0.1,0.5,0.2,0.8l4.1,7.8c0.2,0.4,0.4,0.7,0.5,0.8c0.1,0.1,0.3,0.2,0.6,0.3v0.3H127v-0.3c0.4-0.1,0.6-0.3,0.6-0.6
                    c0-0.2-0.1-0.5-0.2-0.7L126.8,25.6z M126,24.1l-1.8-3.5l-1.7,3.5H126z"/>
                <path d="M135.9,21.1v6.2c0,0.2,0,0.4,0.1,0.5s0.3,0.2,0.5,0.3v0.3h-3.6v-0.3c0.2-0.1,0.4-0.1,0.5-0.3c0.1-0.1,0.1-0.3,0.1-0.5v-8.9
                    c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3v-0.3h4.2v0.3c-0.3,0.1-0.4,0.2-0.4,0.4c0,0.2,0.1,0.3,0.3,0.5l5.9,5.8v-6
                    c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3v-0.3h3.6v0.3c-0.2,0.1-0.4,0.2-0.5,0.3c-0.1,0.1-0.1,0.3-0.1,0.5v8.9c0,0.2,0,0.4,0.1,0.5
                    s0.3,0.2,0.5,0.3v0.3h-3.9v-0.3c0.3-0.1,0.4-0.2,0.4-0.4c0-0.1,0-0.2-0.1-0.3s-0.3-0.3-0.5-0.6L135.9,21.1z"/>
                <path d="M151.5,23.7v2.7h6.9c0.2,0,0.4,0,0.5-0.1s0.2-0.3,0.3-0.5h0.3V29h-0.3c-0.1-0.2-0.1-0.4-0.3-0.5c-0.1-0.1-0.3-0.1-0.5-0.1
                    h-10.2v-0.3c0.2-0.1,0.4-0.1,0.5-0.3c0.1-0.1,0.1-0.3,0.1-0.5v-8.9c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3v-0.3h9.9
                    c0.2,0,0.4,0,0.5-0.1s0.2-0.3,0.3-0.5h0.3V20h-0.3c-0.1-0.2-0.2-0.4-0.3-0.5c-0.1-0.1-0.3-0.1-0.5-0.1h-6.6v2.4h4.1
                    c0.2,0,0.4,0,0.5-0.1s0.2-0.3,0.3-0.5h0.3v3.2h-0.3c-0.1-0.2-0.2-0.4-0.3-0.5c-0.1-0.1-0.3-0.1-0.5-0.1H151.5z"/>
                <path d="M164.9,26.4h6.1c0.2,0,0.4,0,0.5-0.1s0.2-0.3,0.3-0.5h0.3V29h-0.3c-0.1-0.2-0.2-0.4-0.3-0.5c-0.1-0.1-0.3-0.1-0.5-0.1h-9.4
                    v-0.3c0.2-0.1,0.4-0.1,0.5-0.3c0.1-0.1,0.1-0.3,0.1-0.5v-8.9c0-0.2,0-0.4-0.1-0.5s-0.3-0.2-0.5-0.3v-0.3h3.9v0.3
		            c-0.2,0.1-0.4,0.2-0.5,0.3s-0.1,0.3-0.1,0.5V26.4z"/>
            </g>
        </svg>
    );
};

export default Logo;