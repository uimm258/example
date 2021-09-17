import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Header() {
    const dispatch = useDispatch();
    const userStatus = useSelector(store => store.user);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginModal, setIsLoginModal] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const clearDetailsReducer = () => {
        dispatch({
            type: 'CLEAR_DETAILS'
        })
    }

    const openLoginModal = (isLoginModal) => {
        setOpen(true);
        setIsLoginModal(isLoginModal);
    };

    const login = () => {
        if (password.trim().length > 0 && username.trim().length > 0) {
            dispatch({
                type: 'LOGIN_USER',
                payload: { username, password }
            });
            setOpen(false);
        }
    };

    const logout = () => {
        dispatch({
            type: 'LOGOUT_USER'
        })
    };

    const register = () => {
        if (password.trim().length > 0 && username.trim().length > 0) {
            dispatch({
                type: 'REGISTER_USER',
                payload: { username, password }
            });
            setOpen(false);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isLoginModal ? 'Please Login' : 'Please Register'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={({ target: { value } }) => setUsername(value)}
                    />

                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={({ target: { value } }) => setPassword(value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={isLoginModal ? login : register}>{isLoginModal ? 'Login' : 'Register'}</Button>
                </DialogActions>
            </Dialog>

            <div id="header-container">
                <h1 id="app-title">Maymay's Movies</h1>

                <Box m={1}>
                    <Button component={Link} to="/" onClick={clearDetailsReducer}>
                        <HomeIcon />Home
                    </Button>

                    {
                        userStatus ?
                            <>
                                <Button component={Link} to="/addmovie">
                                    <AddBoxIcon />Add Movie
                                </Button>

                                <Button onClick={logout}>
                                    <LoginIcon />Log Out
                                </Button>
                            </>
                            :
                            <>
                                <Button onClick={() => openLoginModal(true)}>
                                    <LogoutIcon />Log In
                                </Button>

                                <Button onClick={() => openLoginModal(false)}>
                                    <PersonAddIcon />Register
                                </Button>
                            </>
                    }
                </Box>
            </div>
        </>
    )
}

export default Header;
