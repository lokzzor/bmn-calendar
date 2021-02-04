import React, { useRef, /* useEffect, useCallback  */ } from 'react';
import './User.css';
import { FormControlLabel, Checkbox, withStyles, TextField, ListItem, IconButton, InputBase, InputAdornment } from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import { registration } from '../../../Actions/user'
import { useDispatch, useSelector } from 'react-redux';
import { Spring } from 'react-spring/renderprops'
import Alert from '@material-ui/lab/Alert';

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const Adnewuser = (props) => {
    const dispatch = useDispatch()
    const closeModal = e => { if (modalRef.current === e.target) { props.close(); } };
    const modalRef = useRef();
    const success = useSelector(state => state.other.success);
    const errors = useSelector(state => state.other.errors);
    const GreenCheckbox = withStyles({
        root: { color: red[400], '&$checked': { color: blue[600] } }, checked: {}
    })((props) => <Checkbox color="default" {...props} />);

    const [state, setState] = React.useState({
        login_name: '',
        login_pass: '',
        login_passagain: '',
        person_name: '',
        email: '',
        is_admin: true,
        is_active: true,
        error: '',
        nofill: false,
        nofill2: false
    });
    const handleChecked = (event) => { setState({ ...state, [event.target.name]: event.target.checked }); };

    const createEvent = () => {
        if (state.login_name !== '' && state.login_pass !== '' && state.login_passagain !== '' && state.person_name !== '' && state.email !== '') {
            if (state.login_pass !== '' && state.login_passagain !== '' && state.login_pass === state.login_passagain) {
                dispatch(registration(state));
                setState({ ...state, login_name: '', login_pass: '',  login_passagain: '', person_name: '', email: '', is_admin: true, is_active: true });
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
                    {props3 =>
                        <div style={props3} className="add-person-background" onClick={closeModal} ref={modalRef}>
                            {state.nofill && <Alert className="alert-add-person" variant="filled" severity="error">Please fill in all fields!!!</Alert>}
                            {state.nofill2 && <Alert className="alert-add-person" variant="filled" severity="error">This password does not match that entered in the password field, please try again.</Alert>}
                            {errors.length > 0 && <Alert className="alert-add-person" variant="filled" severity="error">{errors}</Alert>}
                            {success.length > 0 && <Alert className="alert-add-person" variant="filled" severity="success">{success}</Alert>}
                            <div className="add-person-modalwrapper">
                                <div className="add-person-modal-header">
                                    <p className="add-person-modal-title add-person-h2">Calendar Create Person</p>
                                    <div className="add-person-closebutton" aria-label='Close modal' onClick={() => props.close()}> <CloseIcon className="add-person-modal-close" /></div>
                                </div>
                                <div className="add-person-content-form">
                                    <form noValidate autoComplete="off">
                                        <div className="add-person-content-form-name">
                                            <div className="add-person-content-form-name1">
                                                <IconButton aria-label="menu"> <MenuIcon /> </IconButton>
                                                <InputBase className="maintitle" placeholder="Login" autoFocus={true} name="login_name" value={state.login_name} onChange={(event) => setState({ ...state, login_name: event.target.value, nofill: false })} />
                                            </div>
                                            <div className="add-person-content-form-name2">
                                                <ListItem onClick={createEvent} className="btn btn-primary" button> <p style={{ fontWeight: "bold" }}> <>Save</>{" "}</p></ListItem>
                                            </div>
                                        </div>
                                        <div className="user-size">
                                            <div className="user-size-add">
                                                <div className="form-room-left">
                                                    <TextField className="border" style={{ width: "14em" }}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="start" style={{ cursor: "default" }}>
                                                                    <LockIcon />
                                                                </InputAdornment >
                                                            )
                                                        }}
                                                        value={state.login_pass} name="login_pass" onChange={(event) => setState({ ...state, login_pass: event.target.value })} id="outlined-select-currency-native" variant="outlined" label="Password" />
                                                    <TextField className="border" style={{ width: "14em" }}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="start" style={{ cursor: "default" }}>
                                                                    <LockIcon />
                                                                </InputAdornment >
                                                            )
                                                        }}
                                                        value={state.login_passagain} name="login_passagain" onChange={(event) => setState({ ...state, login_passagain: event.target.value })} id="outlined-select-currency-native" variant="outlined" label="Conform Password" />
                                                </div>
                                                <div className="form-room-rigth">
                                                    <TextField className="border" style={{ width: "14em" }}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="start" style={{ cursor: "default" }}>
                                                                    <EmailIcon />
                                                                </InputAdornment >
                                                            )
                                                        }}
                                                        value={state.email} name="email" onChange={(event) => setState({ ...state, email: event.target.value })} id="outlined-select-currency-native" variant="outlined" label="Email" />
                                                    <TextField className="border" style={{ width: "14em" }}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="start" style={{ cursor: "default" }}>
                                                                    <AccountCircleIcon />
                                                                </InputAdornment >
                                                            )
                                                        }}
                                                        value={state.person_name} name="person_name" onChange={(event) => setState({ ...state, person_name: event.target.value })} id="outlined-select-currency-native" variant="outlined" label="Person Name" />
                                                </div>
                                            </div>
                                            <div className="checkbox-user">
                                                <FormControlLabel className="border"
                                                    control={<GreenCheckbox checked={state.is_admin} onChange={handleChecked} name="is_admin" />}
                                                    label="Admin Guard"
                                                />
                                                <FormControlLabel className="border"
                                                    control={
                                                        <GreenCheckbox
                                                            checked={state.is_active}
                                                            onChange={handleChecked}
                                                            name="is_active"
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Block Person"
                                                />
                                            </div>
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
