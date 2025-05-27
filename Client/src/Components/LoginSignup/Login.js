import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, Tooltip, Zoom, Alert } from '@mui/material';
import { useLogin } from '../../hooks/useLogin';
import './Style/AuthStyle.css';
import ReactGA from 'react-ga4'

const Login = ({ setActive }) => {
    const location = useLocation();
    const { redirectTo } = location?.state || {redirectTo: "/"};

    React.useEffect(() => {
        ReactGA.send({
            hitType: "pageView",
            page: window.location.pathname
        })
    }, [])

    return (
        <>
            <Paper elevation={3} className='auth_paper' style={{ borderRadius: '8px' }}>
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <div className='f_container'>
                            <h2 style={{ marginBottom: '10px', color: 'rgb(255, 144, 163)' }}>Log in to your Account</h2>
                            <hr width="10%" style={{ backgroundColor: "rgb(255, 144, 163)", height: '3px', border: 'none', margin: '10px' }} />
                            <FormComponent />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className='s_Container right'>
                            <h2 style={{ marginBottom: '10px', color: 'white' }}>Hello, New Friend!</h2>
                            <Typography variant="body2" className="s_typography" >
                                Fill up personal information and start journey with us.
                            </Typography>
                            <Link to={{ pathname: '/signup', state: { redirectTo } }}>
                                <input type='submit' value="Create Account" className='submit' onClick={() => (setActive('signup'))} />
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Login;

const FormComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const location = useLocation();
    const { redirectTo } = location?.state || {redirectTo: "/"};

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, redirectTo)
    }

    return (
        <form id='login_form' onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email address' className='input_box' />
            <br />

            <label>Password</label>
            <Tooltip TransitionComponent={Zoom}
                title={
                        <pre> Your password must:<br />
                            &#8194; Be at least 8 characters<br />
                            &#8194; Have at least one number<br />
                            &#8194; Have at least one symbol<br />
                            &#8194; Have at least one upper case letter<br />
                            &#8194; Have at least one lower case letter
                        </pre>
                }
                placement='right'
                disableHoverListener
                arrow>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password ' className='input_box' />
            </Tooltip>


            {error && <Alert severity="error" sx={{ mt: 2 }} variant="standard">{error}</Alert>}
            <button type='submit' className={isLoading ? 'submit-disabled': 'submit'} disabled={isLoading}>Log In </button>
        </form>
    )
}

