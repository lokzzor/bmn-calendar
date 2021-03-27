import React, { useRef, /* useEffect, useCallback  */ } from 'react';
import './AddEvent.css';
import { useDispatch, useSelector } from 'react-redux';
import { Spring } from 'react-spring/renderprops'
import moment from "moment"; import MomentUtils from '@date-io/moment';
import { EventListNoActive } from '../../../Actions/event'

import Alert from '@material-ui/lab/Alert';
//import API from '../../../Reducers/API';
import { addevent, getRoomsMap,sCalendarSelect,firstchartfunc,secondchartfunc,getCalendarNewEvent } from '../../../Actions/simpleget'
import { TextField, IconButton, InputBase, ListItem ,Checkbox, MenuItem, FormControl,InputLabel, OutlinedInput,FormControlLabel, InputAdornment} from '@material-ui/core'
import { red, blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker,KeyboardDatePicker } from "@material-ui/pickers";

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

  const currencies = [
    { value: 'Day', label: 'Day'},
    { value: 'Week', label: 'Week'},
  ];

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
    nofill:false,
    repeatatintervals:1,
    repeatattime:'Day',
    checkedfinish:true,
    checkedfinish2:false,
    finishday: moment().add(1, 'day').format('YYYY-MM-DD'),
    finishafter:10
  });
  React.useEffect(() => { 
    setState({person_login:isAuth.currentUser.loginName, event_name: '', room_name: '', event_start: moment().format('YYYY-MM-DD 08:00'), event_end: moment().format('YYYY-MM-DD 21:00'), checkedAll: false, checkedRepeat: false, error: '', nofill:false, repeatatintervals:1, repeatattime:'Day', checkedfinish:true, checkedfinish2:false, finishday: moment().add(1, 'day').format('YYYY-MM-DD'), finishafter:10 });   
  }, [isAuth]);
  React.useEffect(() => {
    dispatch(getRoomsMap());
  }, [dispatch])

  const handleChecked = (event) => { setState({ ...state, [event.target.name]: event.target.checked }); };

  const createEvent = () => {
    if(state.event_name!=='' && state.room_name !== ''){
      dispatch(addevent(state));
      setTimeout( function() { dispatch(EventListNoActive()); }, 1000 );
      setTimeout( function() { dispatch(getCalendarNewEvent()) }, 100 );
      setTimeout( function() { dispatch(EventListNoActive()); }, 1000 );
      setTimeout( function() { dispatch(sCalendarSelect()); }, 1000 );
      setTimeout( function() { dispatch(firstchartfunc()); }, 1000 );
      setTimeout( function() { dispatch(secondchartfunc()); }, 1000 );

      setState({ ...state, event_name: '', room_name: '', nofill:false });
    } else {      
      setState({ ...state, nofill:true})
      setTimeout( function() { setState({ ...state, nofill: false }) }, 4000 );
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
                        <InputBase className="add-event-maintitle" placeholder="Event Name" value={state.event_name || ""} autoFocus={true} name="event_name" onChange={(event) => setState({ ...state, event_name: event.target.value, nofill:false })} />
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
                          value={state.room_name  || ""}
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
                            inputprops={{ style: { fontSize: "0.95rem" } }}
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
                            inputprops={{ style: { fontSize: "0.95rem" } }}
                            onChange={(event) => setState({ ...state, event_end: event })}
                            disablePast
                            format="YYYY/MM/DD H:mm"
                            inputlabelprops={{
                              shrink: true,
                            }}
                          />
                        </MuiPickersUtilsProvider>}
                        {state.checkedAll && <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker className="border"
                            style={{width: "11rem"}}
                            inputVariant="outlined"
                            ampm={false}
                            label="From"
                            value={state.event_start}
                            onChange={(event) => setState({ ...state, event_start: event })}
                            inputprops={{ style: { fontSize: "0.95rem" } }}
                            disablePast
                            format="YYYY/MM/DD"
                            inputlabelprops={{
                              shrink: true,
                            }}
                          />
                          <KeyboardDatePicker className="border" style={{width: "11rem",margin: "1.5em 0px"}}
                            inputVariant="outlined"
                            ampm={false}
                            label="To"
                            value={state.event_end}
                            onChange={(event) => setState({ ...state, event_end: event })}
                            inputprops={{ style: { fontSize: "0.95rem" } }}
                            disablePast
                            format="YYYY/MM/DD"
                            inputlabelprops={{
                              shrink: true,
                            }}
                          />
                        </MuiPickersUtilsProvider>}
                      </div>
                    </div>
                    { state.checkedRepeat && <div>
                      <div className="add-event-event-repeat">
                        <div>Repeat at intervals</div>
                        <div>The ending</div>
                      </div>
                      <div className="repeatsection">
                        <div className="fitstsectionrep">
                          <TextField
                            className="border"
                            style={{ width: "5rem",marginTop: "1.5em" }}
                            id="outlined-number3"
                            label="Number"
                            type="number"
                            name="repeatatintervals"
                            inputprops={{ min: 1,max:30}}
                            inputlabelprops={{
                              shrink: true,
                            }}
                            variant="outlined"
                            value={state.repeatatintervals}
                            onChange={(event) => setState({ ...state, repeatatintervals: event.target.value })}
                          />
                          <TextField
                            className="border"
                            style={{ width: "7rem",marginTop: "1.5em",marginLeft:"1em" }}
                            id="outlined-select-currency"
                            select
                            label="Select"
                            name="repeatattime"
                            value={state.repeatattime}
                            onChange={(event) => setState({ ...state, repeatattime: event.target.value })}
                            variant="outlined"
                          >
                            {currencies.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                        </TextField>                        
                        </div>
                        <div className="secondsectionrep">
                            <div className="secondsectionrep1">
                                <FormControlLabel
                                  control={<GreenCheckbox checked={state.checkedfinish}                             
                                  onChange={() => setState({ ...state, checkedfinish: true,checkedfinish2:false })}
                                  name="checkedfinish" />}
                                  label="Date"
                                />
                                { !state.checkedfinish && <MuiPickersUtilsProvider locale='ru' utils={MomentUtils}>
                                  <KeyboardDatePicker className="border"                          
                                    style={{width: "11rem",margin: "1.5em 0px",}}
                                    inputVariant="outlined"
                                    ampm={false}
                                    disabled
                                    label="Date"
                                    value={state.finishday}
                                    inputprops={{ style: { fontSize: "0.95rem" } }}
                                    disablePast
                                    format="YYYY/MM/DD"
                                    inputlabelprops={{
                                      shrink: true,
                                    }}
                                  />
                                </MuiPickersUtilsProvider>}
                                { state.checkedfinish && <MuiPickersUtilsProvider locale='ru' utils={MomentUtils}>
                                  <KeyboardDatePicker className="border"                          
                                    style={{width: "11rem",margin: "1.5em 0px",}}
                                    inputVariant="outlined"
                                    ampm={false}
                                    label="Date"
                                    variant="inline"
                                    value={state.finishday}
                                    inputprops={{ style: { fontSize: "0.95rem" } }}
                                    onChange={(event) => setState({ ...state, finishday: event })}
                                    disablePast
                                    format="YYYY/MM/DD"
                                    inputlabelprops={{
                                      shrink: true,
                                    }}
                                  />
                                </MuiPickersUtilsProvider>}
                            </div>
                            <div className="secondsectionrep2">
                                <FormControlLabel
                                      control={
                                        <GreenCheckbox
                                          checked={state.checkedfinish2}
                                          onChange={() => setState({ ...state, checkedfinish2: true,checkedfinish:false })}
                                          name="checkedfinish2"
                                          color="primary"
                                        />
                                      }
                                      label="After"
                                />

                                { !state.checkedfinish2 && <FormControl style={{ width: "11rem" }} variant="outlined" className="border">
                                  <InputLabel htmlFor="outlined-adornment-password">
                                    Number
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-number"
                                    label="Number"
                                    disabled
                                    type="number"
                                    endAdornment={
                                      <InputAdornment position="end">repetitions</InputAdornment>
                                    }
                                    inputprops={{ min: 1}}
                                    inputlabelprops={{
                                      shrink: true,
                                    }}
                                    variant="outlined"
                                    value={state.finishafter}
                                  />
                                </FormControl>}
                                { state.checkedfinish2 && <FormControl style={{ width: "11rem" }} variant="outlined" className="border">
                                  <InputLabel htmlFor="outlined-adornment-password">
                                    Number
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-number2"
                                    label="Number"
                                    type="number"
                                    endAdornment={
                                      <InputAdornment position="end">repetitions</InputAdornment>
                                    }
                                    inputprops={{ min: 1}}
                                    inputlabelprops={{
                                      shrink: true,
                                    }}
                                    variant="outlined"
                                    value={state.finishafter}
                                    onChange={(event) => setState({ ...state, finishafter: event.target.value })}
                                  />
                                </FormControl>}
                            </div>
                        </div>
                      </div>
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