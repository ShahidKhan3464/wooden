import React, { useState } from 'react'
import * as yup from 'yup';
import * as auth from "../../Auth/_redux/authRedux";
import { useFormik } from "formik";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { login } from "../../Auth/_redux/authCrud";
import { useStyles, Input } from '../dialog/style';
import Dialog from '../dialog/Dialog';
import { Box, Typography, Button, FormControlLabel, Checkbox, FormControl, FormHelperText, CircularProgress } from '@material-ui/core'

const Login = (props) => {
    const classes = useStyles();
    const [loginButtonLoading, setloginButtonLoading] = useState(false)

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(5, 'Password should be of minimum 5 characters length')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setloginButtonLoading(true)
            const { email, password } = values
            login(email, password)
                .then((data) => {
                    setloginButtonLoading(false)
                    props.login(data);
                })
                .catch((response) => {
                    setloginButtonLoading(false)
                    if (!response) {
                        alert("Some thing went wrong")
                        // CustomAlert("Some thing went wrong", "error");
                    }
                    else if (response.body) {
                        let responseBody = JSON.parse(response.body);
                        if (responseBody.error === "invalid_grant") {
                            alert('Login Failed. Email or password is not correct.')
                            // CustomAlert('Login Failed. Email or password is not correct.' , 'warning')
                        }
                    }
                });
        },
    });

    return (
        <Dialog show={props.isModal} setIsModal={props.setIsModal} >
            <div className={classes.content}>
                <Box component='h2' className={classes.title}>
                    Welcome Back To <Typography component='span' className={classes.span}>  Wooden Door</Typography>
                </Box>

                <form className={classes.form} autoComplete='off' onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <Input
                            id="email"
                            name="email"
                            className={classes.input}
                            placeholder="EMAIL ADDRESS"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            helpertext={formik.touched.email && formik.errors.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                        // classes={{ focused: classes.focused, input: classes.autoFill }}
                        // InputProps={{ style: { height: '2em', color: '#FFFFFF' }, classes: { root: { borderBottom: 'red !important' } } }}
                        />
                        {
                            formik.touched.email
                            && <FormHelperText
                                id={formik.touched.email}
                                className={classes.error}
                            >
                                {formik.errors.email}
                            </FormHelperText>
                        }
                    </FormControl>

                    <FormControl>
                        <Input
                            id="password"
                            name="password"
                            type='password'
                            placeholder="PASSWORD"
                            className={classes.input}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            helpertext={formik.touched.password && formik.errors.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                        />
                        {formik.touched.password
                            && <FormHelperText
                                className={classes.error}
                                id={formik.touched.password}
                            >
                                {formik.errors.password}
                            </FormHelperText>
                        }
                    </FormControl>

                    <FormControlLabel
                        control={<Checkbox color="default" className={classes.checkbox} />}
                        label={<Typography className={classes.input}>Remember</Typography>}
                    />

                    {/* <Button
                        bg='#353535'
                        font='Inter'
                        color='#FFFFFF'
                    >
                        Login
                    </Button> */}

                    <Button disabled={loginButtonLoading} startIcon={loginButtonLoading && <CircularProgress size='1em' color="inherit" />} loading={true} className={classes.button} type="submit">Login</Button>
                </form>
            </div >
        </Dialog>
    )
}

export default injectIntl(connect(null, auth.actions)(Login));