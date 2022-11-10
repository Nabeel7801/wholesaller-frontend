import React, { useContext } from 'react'
import styles from "./HeroSub.module.css"
import { Box, IconButton, Container } from "@material-ui/core"
import { GlobalState } from '../../context/GlobalState'
import videoBG from '../../img/hero sub/video-bg.webp'
import roundWhite from '../../img/fs-round-white.svg'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Modal from "../Modal/Modal"


const HeroSub = () => {
    const { modal: [showModal, setShowModal] } = useContext(GlobalState)

    return (
        <Box>
            <Box className={styles.roundWhite}  >
                <img src={roundWhite} alt="round shaped white" />
            </Box>
            <Box className="container-spacing">
                <Container maxWidth="lg">
                    <Box mt={{ xs: 0, sm: 10 }}>
                        <Container maxWidth="sm">
                            <Box mb={6}>
                                <h4 className="h4 bold_LP text-center text-primary_LP" >Find more than 1 lakh products from different cities across India</h4>
                            </Box>
                        </Container>
                        <Box className={styles.videoBgContainer}>
                            <img className={styles.image} src={videoBG} alt="video background" />
                            <Box className={styles.playIconContainer}>
                                <IconButton className={styles.playIconButton} onClick={() => setShowModal(true)}>
                                    <PlayCircleFilledIcon fontSize="large" className={styles.playIcon} />
                                </IconButton>
                            </Box>
                        </Box>

                    </Box>
                    <Box>
                        {showModal && <Modal />}
                    </Box>
                </Container>
            </Box>
        </Box >
    )
}

export default HeroSub
