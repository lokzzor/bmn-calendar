import React, { useRef, /* useEffect, useCallback  */ } from 'react';
import './AddEvent.css';
import { useDispatch, useSelector } from 'react-redux';
import { Spring } from 'react-spring/renderprops'
import moment from "moment"; import MomentUtils from '@date-io/moment';

import Alert from '@material-ui/lab/Alert';
//import API from '../../../Reducers/API';
import { addevent, getRoomsMap } from '../../../Actions/simpleget'
import { TextField, IconButton, InputBase, ListItem ,Checkbox, MenuItem, FormControlLabel, InputAdornment} from '@material-ui/core'
import { red, blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export const Eventcal = (props) => {
  const dispatch = useDispatch()
  const closeModal = e => { if (modalRef.current === e.target) { props.close(); } };
  const isAuth = useSelector(state => state.user);
  const roommap = useSelector(state => state.other.rooms);
  const success = useSelector(state => state.other.success);
  const errors = useSelector(state => state.other.errors);

  const GreenCheckbox = withStyles({
    root: { color: red[400], '&$checked': { color: blue[600] } }, checked: {}
  })((props) => <Checkbox color="default" {...props} />);

  React.useEffect(() => {
    dispatch(getRoomsMap());
  }, [dispatch])
  const modalRef = useRef();

  const [state, setState] = React.useState({
    event_name: '',
    room_name: '',
    person_login: isAuth.currentUser.loginName,
    event_start: moment().format('YYYY-MM-DD 08:00'),
    event_end: moment().format('YYYY-MM-DD 21:00'),
    checkedAll: false,
    checkedRepeat: false,
    error: '',
    nofill:false
  });

  const handleChecked = (event) => { setState({ ...state, [event.target.name]: event.target.checked }); };
  
  const createEvent = () => {
    if(state.event_name!=='' && state.room_name !== ''){
      dispatch(addevent(state));
      setState({ ...state, event_name: '', room_name: '', nofill:false });
    } else {      
      setState({ ...state, nofill:true})
      setTimeout( function() { setState({ ...state, nofill: false }) }, 3000 );
    }
  }
  
  return (
    <>
      { props.showModal ? (
        <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 0 }}>
          {propss =>
            <div style={propss} className="add-event-background" onClick={closeModal} ref={modalRef}>
              { state.nofill && <Alert className="alert-add-event" variant="filled" severity="error">Please fill in all fields!!!</Alert>}
              { errors.length > 0 && <Alert className="alert-add-event" variant="filled" severity="error">{errors}</Alert>}
              { success.length > 0 && <Alert className="alert-add-event" variant="filled" severity="success">{success}</Alert>}
              <div className="add-event-modalwrapper">
                <div className="add-event-modal-header">
                  <p className="add-event-modal-title add-event-h2">Calendar Create Events</p>
                  <div className="add-event-closebutton" aria-label='Close modal' onClick={() => {setState({ ...state, nofill:false });props.close()}}> <CloseIcon className="add-event-modal-close" /></div>
                </div>
                <div className="add-event-content-form">
                  <form noValidate autoComplete="off">
                    <div className="add-event-content-form-name">
                      <div className="add-event-content-form-name1">
                        <IconButton aria-label="menu"> <MenuIcon /> </IconButton>
                        <InputBase className="add-event-maintitle" placeholder="Event Name" value={state.event_name} autoFocus={true} name="event_name" onChange={(event) => setState({ ...state, event_name: event.target.value, nofill:false })} />
                      </div>
                      <div className="add-event-content-form-name2">
                        <ListItem onClick={createEvent} className="btn btn-primary" button>
                          <p style={{ fontWeight: "bold" }}> <>Save</>{" "}</p>
                        </ListItem>
                      </div>
                    </div>
                    <div className="add-event-checkbox-event">
                      <FormControlLabel
                        control={<GreenCheckbox checked={state.checkedAll} onChange={handleChecked} name="checkedAll" />}
                        label="All working day"
                      />
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedRepeat}
                            onChange={handleChecked}
                            name="checkedRepeat"
                            color="primary"
                          />
                        }
                        label="Repeat"
                      />
                    </div>
                    <div className="add-event-event-info">
                      Event Details
                    </div>
                    <div className="add-event-block-info">
                      <div className="info-event-block">
                        <TextField
                          className="border"
                          style={{width: "12rem",textAlign: "left"}}
                          id="outlined-select-currency-native"
                          select
                          value={state.room_name}
                          onChange={(event) => setState({ ...state, room_name: event.target.value,nofill:false })}
                          name="room_name"
                          variant="outlined"
                          label="Room Name"
                        >
                          {(roommap || []).map((option) => (
                            <MenuItem key={option.room_name} name="room_name" value={option.room_name}> {option.room_name} </MenuItem>
                          ))}
                        </TextField>
                        <TextField className="border" disabled style={{ width: "12rem",margin: "1.5em 0px" }}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircleIcon />
                                </InputAdornment >
                              )
                            }}
                            id="outlined-select-currency-native" name="person_login" variant="outlined" label="Person" value={isAuth.currentUser.loginName} />
                        </div>
                      <div className="time-event-block">
                        {!state.checkedAll && <MuiPickersUtilsProvider locale='ru' utils={MomentUtils}>
                          <KeyboardDateTimePicker className="border"                          
                            style={{width: "13rem"}}
                            inputVariant="outlined"
                            ampm={false}
                            label="From"
                            value={state.event_start}
                            inputProps={{ style: { fontSize: "0.95rem" } }}
                            onChange={(event) => setState({ ...state, event_start: event })}
                            disablePast
                            format="YYYY/MM/DD H:mm"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <KeyboardDateTimePicker className="border" style={{width: "13rem", margin: "1.5em 0px"}}
                            inputVariant="outlined"
                            ampm={false}
                            label="To"
                            value={state.event_end}
                            inputProps={{ style: { fontSize: "0.95rem" } }}
                            onChange={(event) => setState({ ...state, event_end: event })}
                            disablePast
                            format="YYYY/MM/DD H:mm"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </MuiPickersUtilsProvider>}
                        {state.checkedAll && <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDateTimePicker className="border"
                            style={{width: "13rem"}}
                            inputVariant="outlined"
                            ampm={false}
                            label="From"
                            disabled
                            value={state.event_start}
                            inputProps={{ style: { fontSize: "0.95rem" } }}
                            disablePast
                            format="YYYY/MM/DD H:mm"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <KeyboardDateTimePicker className="border" style={{width: "13rem",margin: "1.5em 0px"}}
                            inputVariant="outlined"
                            ampm={false}
                            label="To"
                            disabled
                            value={state.event_end}
                            inputProps={{ style: { fontSize: "0.95rem" } }}
                            disablePast
                            format="YYYY/MM/DD H:mm"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </MuiPickersUtilsProvider>}
                      </div>
                    </div>
                    { state.checkedRepeat && <div>
                        block repeat
                      </div>}
                  </form>
                </div>
              </div>
            </div>}
        </Spring>
      ) : null}
    </>
  )
}

/*


            { state.event_start!=='' && state.event_end!=='' && <div className="calendar-input-time">
              <div className="calendar-input-time-head" >
                Свободно = Как будет выглядеть) галка или крест)
              </div>
              <div className="calendar-input-time-content">
                <div className="calendar-input-time-content-event">
                    <div></div>
                    <div></div>
                </div>
                <div className="calendar-input-time-content-time"></div>
                INfo
              </div>
            </div>}
    </>
)}


   const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && props.showModal) {
        props.close();
      }
    },
    [props.setShowModal, props.showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );
 */