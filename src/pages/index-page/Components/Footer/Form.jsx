import React from 'react'
import styles from './Form.module.css'
import { Box, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form"

const useStyles = makeStyles(() => ({
    btn: {
        /* important is being used to override material ui style orders */
        backgroundColor: "rgb(250, 251, 255)",
        padding: "1rem 0",
        transition: "all .5s",
        fontWeight: 400,
        borderRadius: "5px",
        width: "200px",
        color: "rgb(119, 119, 119)",
        "&:hover": {
            backgroundColor: "rgb(46, 192, 221)",
            color: "rgb(250, 251, 255)"
        }
    }

}),
);

const Form = () => {
    const classes = useStyles()
    const { register, handleSubmit, reset } = useForm({})

    const onSubmit = (loginForm) => {
        console.log('loginData', loginForm);
        reset()
    }
    return (
        <Box >
            <Box >
                <h4 className={"h4 bold_LP"} style={{ color: "rgb(250, 251, 255)" }}>
                    Get in Touch
                </h4>
                <Box mt={4}>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <span >
                            <input className={styles.inputField} type="text" name="name" placeholder="Name" {...register('name', { required: true })} />
                        </span>
                        <span >
                            <input className={styles.inputField} type="email" name="email" placeholder="Email" {...register('email', { required: true })} />
                        </span>
                        <span >
                            <textarea className={styles.inputField} rows={8} cols={60} name="description" placeholder="Message" {...register('message', { required: true })} />
                        </span>
                        <Box mt={2} className={classes.loginBtnContainer}>
                            <Button type="submit" size="large" className={classes.btn}>
                                Send Message
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box >

    )
}

export default Form
