import React, { useRef, /* useEffect, useCallback  */ } from 'react';
import './Password.css';

import { changepassword } from '../../../Actions/user'
import { useDispatch, useSelector } from 'react-redux';
import { Spring } from 'react-spring/renderprops'
import Alert from '@material-ui/lab/Alert';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import { TextField, ListItem, IconButton, InputBase, InputAdornment } from '@material-ui/core';



export const ChangePassword = (props) => {
    const dispatch = useDispatch()
    const closeModal = e => { if (modalRef.current === e.target) { props.close(); } };
    const modalRef = useRef();
    const success = useSelector(state => state.other.success);
    const errors = useSelector(state => state.other.errors);

    const isAuth = useSelector(state => state.user);
    const [state, setState] = React.useState({
        login_name: isAuth.currentUser.personName,
        change_password: '',
        again_password: '',
        error: '',
        nofill: false,
        nofill2: false
    });
    const createEvent = () => {
        if (state.change_password !== '' && state.again_password !== '') {
            if (state.change_password === state.again_password) {
                dispatch(changepassword(state));
                setState({ ...state, change_password: '', again_password: '' });
            } else {
                setState({ ...state, nofill2: true })
                setTimeout(function () { setState({ ...state, nofill2: false }) }, 4000);
            }
        } else {
            setState({ ...state, nofill: true })
            setTimeout(function () { setState({ ...state, nofill: false }) }, 3000);
        }
    }
    return (
        <>
            { props.showModal ? (
                <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 0 }}>
                    {props4 =>
                        <div style={props4} className="add-change-background" onClick={closeModal} ref={modalRef}>
                            {state.nofill && <Alert className="alert-change-user" variant="filled" severity="error">Please fill in all fields!!!</Alert>}
                            {state.nofill2 && <Alert className="alert-add-person" variant="filled" severity="error">This password does not match that entered in the password field, please try again.</Alert>}
                            {errors.length > 0 && <Alert className="alert-change-user" variant="filled" severity="error">{errors}</Alert>}
                            {success.length > 0 && <Alert className="alert-change-user" variant="filled" severity="success">{success}</Alert>}
                            <div className="add-change-modalwrapper">
                                <div className="add-change-modal-header">
                                    <p className="add-change-modal-title add-change-h2">Change Person Password</p>
                                    <div className="add-change-closebutton" aria-label='Close modal' onClick={() => props.close()}> <CloseIcon className="add-change-modal-close" /></div>
                                </div>
                                <div className="add-change-content-form">
                                    <form noValidate autoComplete="off">
                                        <div className="add-change-content-form-name">
                                            <div className="add-change-content-form-name1">
                                                <IconButton aria-label="menu"> <MenuIcon /> </IconButton>
                                                <InputBase disabled className="maintitle" placeholder="Login" value={isAuth.currentUser.personName} />
                                            </div>
                                            <div className="add-change-content-form-name2">
                                                <ListItem onClick={createEvent} className="btn btn-primary" button> <p style={{ fontWeight: "bold" }}> <>Change</>{" "}</p></ListItem>
                                            </div>
                                        </div>
                                        <div className="edt-password">
                                            <TextField className="border"  style={{ width: "13.5rem",margin: "1.5em 0px",textAlign:"center" }}
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="start">
                                                    <LockOpenIcon />
                                                    </InputAdornment >
                                                )
                                                }}
                                            id="outlined-select-currency-native" name="change_password" variant="outlined" label="New Password" value={state.change_password} onChange={(event) => setState({ ...state, change_password: event.target.value })}  />
                                            <TextField className="border"  style={{ width: "13.5rem",margin: "1.5em 0px" }}
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="start">
                                                    <LockOpenIcon />
                                                    </InputAdornment >
                                                )
                                                }}
                                            id="outlined-select-currency-native" name="again_password" variant="outlined" label="Comform Password" value={state.again_password} onChange={(event) => setState({ ...state, again_password: event.target.value })}  />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>}
                </Spring>
            ) : null}
        </>
    )
}
