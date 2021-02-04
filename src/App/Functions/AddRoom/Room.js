import React, { useRef, /* useEffect, useCallback  */ } from 'react';
import './Room.css';

import { TextField, ListItem, IconButton, InputBase, InputAdornment } from '@material-ui/core';
import { addroom } from '../../../Actions/simpleget'
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Spring } from 'react-spring/renderprops'

import CloseIcon from '@material-ui/icons/Close';
import PlaceIcon from '@material-ui/icons/Place';
import DomainIcon from '@material-ui/icons/Domain';
import MenuIcon from '@material-ui/icons/Menu';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import DescriptionIcon from '@material-ui/icons/Description';

export const Roomcreate = (props) => {
    const dispatch = useDispatch()
    const closeModal = e => { if (modalRef.current === e.target) { props.close(); } };

    const success = useSelector(state => state.other.success);
    const errors = useSelector(state => state.other.errors);
    const [state, setState] = React.useState({
        room_name: '',
        building_number: '',
        room_number: '',
        capacity: '',
        description: '',
        error: '',
        nofill: false
    });
    const createEvent = () => {
        if (state.room_name !== '' && state.room_number !== '' && state.building_number !== '') {
            dispatch(addroom(state));
            setState({ ...state, room_name: '', room_number: '', building_number: '',capacity:'',description:'', nofill: false });
        } else {
            setState({ ...state, nofill: true })
            setTimeout( function() { setState({ ...state, nofill: false }) }, 3000 );
            
        }
    }

    const modalRef = useRef();
    return (
        <>
            { props.showModal ? (
                <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 0 }}>
                    {props2 =>
                        <div style={props2} className="add-room-background" onClick={closeModal} ref={modalRef}>
                            { state.nofill && <Alert className="alert-add-room" variant="filled" severity="error">Please fill in all fields!!!</Alert>}
                            { errors.length > 0 && <Alert className="alert-add-room" variant="filled" severity="error">{errors}</Alert>}
                            { success.length > 0 && <Alert className="alert-add-room" variant="filled" severity="success">{success}</Alert>}
                            <div className="room-modalwrapper">
                                <div className="room-modal-header">
                                    <p className="add-room-modal-title add-room-h2">Calendar Create Room</p>
                                    <div className="add-room-closebutton" aria-label='Close modal' onClick={() => {setState({ ...state, nofill:false }); props.close()}}> <CloseIcon className="add-room-modal-close" /></div>
                                </div>
                                <div className="add-room-content-form">
                                    <form noValidate autoComplete="off">
                                        <div className="add-room-content-form-name">
                                            <div className="add-room-content-form-name1">
                                                <IconButton aria-label="menu"> <MenuIcon /> </IconButton>
                                                <InputBase className="maintitle" placeholder="Room Name" value={state.room_name} autoFocus={true} name="room_name" onChange={(event) => setState({ ...state, room_name: event.target.value, nofill: false })} />
                                            </div>
                                            <div className="add-room-content-form-name2">
                                                <ListItem onClick={createEvent} className="btn btn-primary" button> <p style={{ fontWeight: "bold" }}> <>Save</>{" "}</p></ListItem>
                                            </div>
                                        </div>
                                        <div className="room-side">
                                            <div className="add-room-form-room-content">
                                                <TextField style={{ width: "14em" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="start" style={{ cursor: "default" }}>
                                                                <DomainIcon />
                                                            </InputAdornment >
                                                        )
                                                    }}
                                                    value={state.building_number} name="building_number" onChange={(event) => setState({ ...state, building_number: event.target.value })} id="outlined-select-currency-native" variant="outlined" label="Building" />
                                                <TextField style={{ width: "14em" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="start" style={{ cursor: "default" }}>
                                                                <PlaceIcon />
                                                            </InputAdornment >
                                                        )
                                                    }}
                                                    value={state.room_number} name="room_number" onChange={(event) => setState({ ...state, room_number: event.target.value })}  id="outlined-select-currency-native" variant="outlined" label="Room Number" />
                                                <TextField style={{ width: "14em" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="start" style={{ cursor: "default" }}>
                                                                <GroupWorkIcon />
                                                            </InputAdornment >
                                                        )
                                                    }}
                                                    value={state.capacity} name="capacity" onChange={(event) => setState({ ...state, capacity: event.target.value })}  id="outlined-select-currency-native" variant="outlined" label="Capacity" />
                                                <TextField style={{ width: "14em" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="start" style={{ cursor: "default" }}>
                                                                <DescriptionIcon />
                                                            </InputAdornment >
                                                        )
                                                    }}
                                                    value={state.description}  name="description" onChange={(event) => setState({ ...state, description: event.target.value })}  id="outlined-select-currency-native" variant="outlined" label="Description" />
                                            </div>
                                            <div className="room-right-side">
                                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/4eacb444836431.582047bcb4aa6.jpg" style={{ objectFit: "fill", width: "100%" }} alt=""></img>
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
