import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
//import Room from '@material-ui/icons/Room';

import {
  Scheduler,
  WeekView,
  Resources,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  MonthView,    
} from '@devexpress/dx-react-scheduler-material-ui';
import './Calendar.css';
import API from '../../../Reducers/API';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
//import { Eventcal } from "../../functions/addevent/event"

export default class Calendar extends React.PureComponent {
    componentDidMount() {
        this.event();
    }
    componentDidUpdate() {
    }
    async event() {
        const response = await API.get("/api/get/calendarselect")
        const data = await response.data.map(n => ({
            title: n.event_name,
            startDate:n.event_start,
            endDate:n.event_end,
            location:n.room_name,
            person:n.person_login,
            conform:n.admin_login
        }) );
        this.setState(() => ({ data: data }));

        const location =await response.data.map(n => ({
            id:n.room_name,
            text:"Room - "+ n.room_name
        }) );
        const person =await response.data.map(n => ({
            id:n.person_login,
            text:"Author - "+n.person_login,
            conform: n.admin_login,
        }) );
        for(let i = 0; i < person.length; i++) {if(person[i].conform == null) { person[i].color = '#808080';}}
        //console.log(person)
        var test=[];
        test[0]={fieldName: "person", instances:person};
        test[1]={fieldName: "location", instances:location};
        this.setState(() => ({ resources: test }));
    }

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this)

    this.state = {
      data: [],
      resources: [],
      startDayHour: 8,
      endDayHour: 21,
      showModal: false,
      setShowModal: false,
    };
  }
  openModal() {
    this.setState(() => ({ setShowModal: !this.state.setShowModal }));
  }
  render() {
    const {startDayHour, endDayHour, data, resources} = this.state;
/*     const setShowModal=this.state.setShowModal;
    const showModal=this.state.setShowModal; */
    return (
      <Paper style={{position:"relative !important"}}>
        <Scheduler
          data={data}
          locale='en-GB'
          firstDayOfWeek={1}
        >
          <ViewState
            defaultCurrentDate={new Date()}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          <WeekView
            name="work-week"
            displayName="Week"
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />
          <MonthView DayScaleCell={2}/>
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip 
          showCloseButton/>
          <Resources data={resources} allowMultiple={true}  />
        </Scheduler>
        {/*  <Eventcal close={this.openModal} showModal={showModal} setShowModal={setShowModal} />
         */}<Fab color="secondary" className="MuiFabbut" > <AddIcon onClick={this.openModal} /> </Fab>
       </Paper>
    );
  }
}