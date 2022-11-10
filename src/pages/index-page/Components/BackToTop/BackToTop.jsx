import React, { useState } from 'react'
import styles from "./BackToTop.module.css"
import { Box, IconButton } from "@material-ui/core"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Link } from 'react-scroll';

const BackToTop = () => {

    const [arrowVisible, setArrowVisible] = useState(false)

    // providing background color to header on scroll
    const changeArrowVisibility = () => {
        const height = window.scrollY
        if (height >= 150) {
            setArrowVisible(true)
        }
        else {
            setArrowVisible(false)
        }
    }

    window.addEventListener("scroll", changeArrowVisibility)



    return (
        <Box className={styles.btnContainer} style={{ visibility: arrowVisible ? "visible" : "hidden", opacity: arrowVisible ? 1 : 0 }}>
            <Link
                to="hero"
                smooth={true}
                duration={1500}
            >
                <IconButton style={{ background: "linear-gradient(128deg, rgba(105,91,252,1) 0%, rgba(89,117,248,1) 100%)" }}>
                    <ArrowUpwardIcon style={{ fill: "#fff" }} />
                </IconButton>
            </Link>
        </Box>

    )
}

export default BackToTop

