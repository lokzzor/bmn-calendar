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
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import first from "../../Components/Weather/img/first.jpg";

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
        nofill2: false,
        showPassword: false,
    });
    const handleChecked = (event) => { setState({ ...state, [event.target.name]: event.target.checked }); };
    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
      };
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
                                                <ListItem onClick={createEvent} className="btn btn-primary" button> <p style={{ fontWeight: "bold" }}> <>Create</>{" "}</p></ListItem>
                                            </div>
                                        </div>
                                        <div className="user-size" style={{background: "url(" + first+ ") center"}}>
                                            <div className="user-size-add">
                                                <div className="form-room-left">
                                                <TextField
                                                        className="border" style={{ width: "14em" }}
                                                        variant="outlined"
                                                        type={state.showPassword ? 'text' : 'password'}
                                                        label="Password"
                                                        name="login_pass"
                                                        value={state.login_pass}
                                                        onChange={(event) => setState({ ...state, login_pass: event.target.value })}
                                                        InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                            >
                                                                {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                        }}
                                                    />                                                    
                                                    <TextField
                                                        className="border" style={{ width: "14em" }}
                                                        variant="outlined"
                                                        type={state.showPassword ? 'text' : 'password'}
                                                        label="Conform Password"
                                                        name="login_passagain"
                                                        value={state.login_passagain}
                                                        onChange={(event) => setState({ ...state, login_passagain: event.target.value })}
                                                        InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                            >
                                                                {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                        }}
                                                    />
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
                                                        value={state.email} name="email" onChange={(event) => setState({ ...state, email: event.target.value })}  variant="outlined" label="Email" />
                                                    <TextField className="border" style={{ width: "14em" }}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="start" style={{ cursor: "default" }}>
                                                                    <AccountCircleIcon />
                                                                </InputAdornment >
                                                            )
                                                        }}
                                                        value={state.person_name} name="person_name" onChange={(event) => setState({ ...state, person_name: event.target.value })}  variant="outlined" label="Person Name" />
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
                                                    label="Active Person"
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
