import React from 'react'
import styles from './Address.module.css'
import { Box, IconButton } from "@material-ui/core"
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

const Address = () => {
    return (
        <Box className={styles.textContainer}>
            <h4 className={"h4 bold_LP text-white_LP"} >
                Address information
            </h4>
            <Box mt={2}>
                <p className={styles.contactInfo + " medium_LP"}>
                    Registered office
                </p>
                <p className={styles.contactInfo + " medium_LP"}>
                    Prayash ecommerce pvt ltd
                </p>
                <p className={styles.contactInfo + " medium_LP"}>
                    c-228, sector-22, Noida
                </p>
                <p className={styles.contactInfo + " medium_LP"}>
                    Uttar Pradesh
                </p>
                <p className={styles.contactInfo + " medium_LP"}>
                    +91 9583195831
                </p>
                <p className={styles.contactInfo}>
                    support@wholesaller.com
                </p>
            </Box>
            <Box mt={3}>
                <h6 className="h6 bold_LP text-white_LP">Stay connected</h6>
                <Box mt={2} className={styles.icons}>

                    <a className={styles.iconLink} href="https://twitter.com/wholesallerB2B" target="_blank" rel="noreferrer">
                        <IconButton className={styles.iconBtn} size="medium" >
                            <TwitterIcon className={styles.icon} />
                        </IconButton>
                    </a>
                    <a className={styles.iconLink} href="https://www.facebook.com/wholesallercom-2106505789571422" target="_blank" rel="noreferrer">
                        <IconButton className={styles.iconBtn} size="medium" >
                            <FacebookIcon className={styles.icon} />
                        </IconButton>
                    </a>
                    <a className={styles.iconLink} href="https://www.linkedin.com/company/wholesaller-comw/?viewAsMember=true" target="_blank" rel="noreferrer">
                        <IconButton className={styles.iconBtn} size="medium" >
                            <LinkedInIcon className={styles.icon} />
                        </IconButton>
                    </a>
                    <a className={styles.iconLink} href="https://www.youtube.com/channel/UCus9lTUSyxwl3r4O9TJB4HA" target="_blank" rel="noreferrer">
                        <IconButton className={styles.iconBtn} size="medium" >
                            <YouTubeIcon className={styles.icon} />
                        </IconButton>
                    </a>
                </Box>
            </Box>
            <Box mt={3}>
                <h6 className="h6 bold_LP text-white_LP">Terms and policy</h6>
                <Box mt={2} className={styles.terms}>
                    <p className={styles.termText + "medium_LP"}>
                        <a href="https://docs.google.com/document/d/1VpEuQ1_YcASxgFBovFL9ji9AIM5FZ-fV/edit" target="_blank" rel="noreferrer">
                            Buyer policy
                        </a>
                    </p>
                    <p className={styles.termText + "medium_LP"}>
                        <a href="https://docs.google.com/document/d/1Y4mYg-KctzO0IxtVlNY9MfL-ZWPqOkxM/edit?rtpof=true" target="_blank" rel="noreferrer">
                            Seller policy
                        </a>
                    </p>
                    <p className={styles.termText + "medium_LP"}>
                        <a href="https://docs.google.com/document/d/1hpsH_yUTtHUo0cqdu6jpwVlQznDrNMjm/edit" target="_blank" rel="noreferrer">
                            Return policy
                        </a>
                    </p>
                    <p className={styles.termText + "medium_LP"}>
                        <a href="https://docs.google.com/document/d/1F9f26JYRPUwFPf1UyzJtfLzBZUv8AzAS/edit" target="_blank" rel="noreferrer">
                            Privacy policy
                        </a>
                    </p>
                </Box>
            </Box>
        </Box>

    )
}

export default Address
