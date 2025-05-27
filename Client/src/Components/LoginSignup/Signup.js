import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, Tooltip, Zoom, Alert } from '@mui/material';
import { useSignup } from '../../hooks/useSignup';
import './Style/AuthStyle.css';
import ReactGA from 'react-ga4'

const Signup = ({ setActive }) => {
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
                    <Grid item xs={12} md={4}>
                        <div className='s_Container left'>
                            <h2 style={{ marginBottom: '10px', color: 'white' }}>Welcome Back!</h2>
                            <Typography variant="body2" style={{ color: 'white', width: '280px' }}>
                                To keep connected with us please login with your personal information.
                            </Typography>
                            <Link to={{ pathname: '/login', state: { redirectTo } }}>
                                <input type='submit' value="Log in" className='submit' onClick={() => (setActive('login'))} />
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <div className='f_container'>
                            <h2 style={{ margin: '8px', color: 'rgb(255, 144, 163)' }}>Create Your Account</h2>
                            <hr width="10%" style={{ backgroundColor: "rgb(255, 144, 163)", height: '3px', border: 'none', margin: '8px' }} />
                            <FormComponent />
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Signup;

const FormComponent = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [retypedPassword, setRetypedPassword] = useState('')
    const { signup, isLoading, error, setError } = useSignup()

    const location = useLocation();
    const { redirectTo } = location?.state || {redirectTo: "/"};

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== retypedPassword) {
            setError("Re-type Password must be matched with above password")
        } else {
            await signup(name, email, password, redirectTo)
        }
    }

    return (
        <form id='login_form' onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name address' className='input_box' required />
            <br />

            <label>Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email address' className='input_box' required />
            <br />

            <label>Password</label>
            <Tooltip
                TransitionComponent={Zoom}
                title={
                        <pre> Your password must:<br />
                            &#8194; Be at least 8 characters<br />
                            &#8194; Have at least one number<br />
                            &#8194; Have at least one symbol<br />
                            &#8194; Have at least one upper case letter<br />
                            &#8194; Have at least one lower case letter
                        </pre>
                }
                placement="right"
                disableHoverListener
                arrow
            >
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="input_box" required />
            </Tooltip>
            <br />

            <label>Re-type Password</label>
            <Tooltip title="Must be matched with above password" disableHoverListener placement='right' arrow>
                <input type="password" name="re-password" value={retypedPassword} onChange={(e) => setRetypedPassword(e.target.value)} placeholder='Re-Enter Password ' className='input_box' required />
            </Tooltip>

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <button type='submit' className={isLoading ? 'submit-disabled': 'submit'} disabled={isLoading}>Create Account </button>
        </form>
    )
}