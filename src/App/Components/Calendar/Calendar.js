import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
//import Room from '@material-ui/icons/Room';
import { connect } from 'react-redux'
import { teal, orange, red, blue } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import classNames from "clsx";
import { connectProps } from "@devexpress/dx-react-core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Eventcal } from "../../Functions/AddEvent/AddEvent"

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

const Rooms = state => {
  var roomlist = [];
  setTimeout(function () { for (let i = 0; i < state.other.rooms; i++) { roomlist[i] = state.other.rooms[i].room_name } }, 1000);
  return {
    rooms: state.other.rooms
  }
}

const styless = ({ spacing }) => ({
  addButton: {
    position: "sticky",
    zIndex: '11',
    bottom: spacing(3),
    right: spacing(4),
    marginBottom: '4%',
    marginTop: '-7%'
  },
});
class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      resources: [],
      startDayHour: 8,
      endDayHour: 21,
      showModal: false,
      setShowModal: false,
      locations: [],
      currentFilter: "",
      roomname:[]
    };
    this._isMounted = false;
    this.onLocationsChange = this.onLocationsChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);    
    
    const LOCATIONS_SHORT = [1, 2, 3];
    const styles = ({ spacing, palette, theme }) => ({
      addButton: {
        position: "absolute",
        bottom: spacing(3),
        right: spacing(4)
      },
      flexibleSpace: {
        margin: "0 auto 0 0",
        display: "flex",
        alignItems: "center"
      },
      textField: {
        width: "150px",
        marginLeft: spacing(1),
        marginTop: 0,
        marginBottom: 0,
        height: spacing(4.875)
      },
      locationSelector: {
        marginLeft: spacing(1),
        height: spacing(4.875),
        alignItems: 'center',
      },
      button: {
        paddingLeft: spacing(1),
        paddingRight: spacing(1),
        textTransform: 'capitalize !important',
        "@media (max-width: 800px)": {
          width: spacing(2),
          fontSize: "0.75rem"
        }
      },
      selectedButton: {
        background: blue[400],
        color: blue[50],
        "&:hover": {
          backgroundColor: blue[500]
        },
        border: `1px solid ${blue[400]}!important`,
        borderLeft: `1px solid ${blue[50]}!important`,
        "&:first-child": {
          borderLeft: `1px solid ${blue[50]}!important`
        }
      },
      longButtonText: {
        "@media (max-width: 800px)": {
          display: "none"
        }
      },
      shortButtonText: {
        "@media (min-width: 800px)": {
          display: "none"
        }
      },
      title: {
        fontWeight: "bold",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      },
      textContainer: {
        lineHeight: 1,
        whiteSpace: "pre-wrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%"
      },
      time: {
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis"
      },
      text: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      },
      container: {
        width: "100%"
      },
      weekendCell: {
        backgroundColor: fade(palette.action.disabledBackground, 0.04),
        "&:hover": {
          backgroundColor: fade(palette.action.disabledBackground, 0.04)
        },
        "&:focus": {
          backgroundColor: fade(palette.action.disabledBackground, 0.04)
        }
      },
      weekEnd: {
        backgroundColor: fade(palette.action.disabledBackground, 0.06)
      },
      firstRoomAppointment: {
        backgroundColor: teal[400],
        "&:hover": {
          backgroundColor: teal[500]
        }
      },
      secondRoomAppointment: {
        backgroundColor: orange[400],
        "&:hover": {
          backgroundColor: orange[500]
        }
      },
      thirdRoomAppointment: {
        backgroundColor: red[400],
        "&:hover": {
          backgroundColor: red[500]
        }
      }
    });
    const Filter = withStyles(styles, { name: "TextField" })(
      ({ onFilterChange, filter, classes }) => (
        <TextField
          placeholder="Filter"
          className={classes.textField}
          value={filter}
          onChange={({ target }) => onFilterChange(target.value)}
          variant="outlined"
          hiddenLabel
          margin="dense"
        />
      )
    );
    const handleButtonClick = (locationName, locations) => {
      if (locations.indexOf(locationName) > -1) {
        return locations.filter(location => location !== locationName);
      }
      const nextLocations = [...locations];
      nextLocations.push(locationName);
      return nextLocations;
    };
    
    const getButtonClass = (locations, classes, location) =>
      locations.indexOf(location) > -1 && classes.selectedButton;      
      setTimeout(async() => { 
        const response =  await API.get("/api/get/calendarroommas");
        this.setState(() => ({ roomname: response.data[0].array_agg }));
      }, 100);

      const LocationSelector = withStyles(styles, { name: "LocationSelector" })(
        ({ onLocationsChange, locations, classes }) => (
          <ButtonGroup className={classes.locationSelector}>
            {this.state.roomname.map((location, index) => (
              <Button
                className={classNames(
                  classes.button, "newbut",
                  getButtonClass(locations, classes, location)
                )}
                onClick={() =>
                  onLocationsChange(handleButtonClick(location, locations))
                }
                key={location}
              >
                <>
                  <span className={classes.shortButtonText}>
                    {LOCATIONS_SHORT[index]}
                  </span>
                  <span className={classes.longButtonText}>{location}</span>
                </>
              </Button>
            ))}
          </ButtonGroup>
        )
      );
      const FlexibleSpace = withStyles(styles, { name: "FlexibleSpace" })(
        ({
          classes,
          locations,
          filter,
          onLocationsChange,
          onFilterChange,
          ...restProps
        }) => (
          <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
            <Filter filter={filter} onFilterChange={onFilterChange} />
            <LocationSelector
              locations={locations}
              onLocationsChange={onLocationsChange}
            />
          </Toolbar.FlexibleSpace>
        )
      );

    this.flexibleSpace = connectProps(FlexibleSpace, () => {
      const { locations, currentFilter } = this.state;
      return {
        locations,
        filter: currentFilter,
        onLocationsChange: this.onLocationsChange,
        onFilterChange: this.onFilterChange
      };
    });
  }
  componentDidMount() {
    this._isMounted = true;
    this.event();
    this.intervalId = setInterval(this.event.bind(this), 5000);

    var roomlist = [];
    for (let i = 0; i < this.props.rooms.length; i++) { roomlist[i] = this.props.rooms[i].room_name }
    this.setState({ locations: roomlist });

    setTimeout(() => {
      var roomlist = [];
      for (let i = 0; i < this.props.rooms.length; i++) { roomlist[i] = this.props.rooms[i].room_name }
      this.setState({ locations: roomlist });
    }, 400);
  }

  componentDidUpdate() {
    this.flexibleSpace.update();
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.intervalId);
  }
  onLocationsChange(nextLocations) {
    this.setState({ locations: nextLocations });
  }
  onFilterChange(nextFilter) {
    this.setState({ currentFilter: nextFilter });
  }

  async event() {
    const response = await API.get("/api/get/calendarselect")
    const data = await response.data.map(n => ({
      title: n.event_name,
      startDate: n.event_start,
      endDate: n.event_end,
      location: n.room_name,
      person: n.person_login,
      conform: n.admin_login
    }));
    
    this.setState(() => ({ data: data }));

    const location = await response.data.map(n => ({
      id: n.room_name,
      text: "Room - " + n.room_name
    }));
    const person = await response.data.map(n => ({
      id: n.person_login,
      text: "Author - " + n.person_login,
      conform: n.admin_login,
    }));
    for (let i = 0; i < person.length; i++) { 
      if (person[i].conform === null) { person[i].color = '#808080';  } 
      else if(person[i].conform === 'admin'){person[i].color = "rgb(0, 101, 179)"; } 
      else person[i].color = "blue";
    } // ошибка
    
    var test = [];
    test[0] = { fieldName: "person", instances: person };
    test[1] = { fieldName: "location", instances: location };
    this.setState(() => ({ resources: test }));
    //console.log(test)

  }
  openModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }
  render() {

    const { startDayHour, endDayHour, showModal, setShowModal, data, resources, locations, currentFilter } = this.state;
    //console.log(resources)
    const { classes } = this.props;
    let filteredData = data.filter( dataItem => locations.indexOf(dataItem.location) > -1);
    const lowerCaseFilter = currentFilter.toLowerCase();
    filteredData = filteredData.filter(
      dataItem =>
        dataItem.title.toLowerCase().includes(lowerCaseFilter) ||
        dataItem.location.toLowerCase().includes(lowerCaseFilter)
    );

    return (
      <Paper className="classpapper">
        <div className="hedcalenar">
          <h1 align="center">Meeting Room Reservation System</h1>
        </div>
        <Scheduler
        className="test"
          data={filteredData}
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
          <MonthView DayScaleCell={2} />
          <Toolbar flexibleSpaceComponent={this.flexibleSpace} />
          <DateNavigator />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip
            showCloseButton />
          <Resources data={resources}  />
        </Scheduler>
        <Eventcal close={this.openModal} showModal={showModal} setShowModal={setShowModal} />
        <div className="fab"><Fab color="secondary" onClick={this.openModal} className={classes.addButton} > <AddIcon /> </Fab></div>
      </Paper>
    );
  }
}
export default withStyles(styless, { name: 'EditingDemo' })(connect(Rooms)(Calendar))
