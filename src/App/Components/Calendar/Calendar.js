import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
//import Room from '@material-ui/icons/Room';
import { teal, orange, red, blue } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import classNames from "clsx";
import { connectProps } from "@devexpress/dx-react-core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Eventcal } from "../../Functions/AddEvent/AddEvent"
import { makeStyles } from '@material-ui/core/styles';

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
  CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui';
import './Calendar.css';
import API from '../../../Reducers/API';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
//import { Eventcal } from "../../functions/addevent/event"


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
const useStyles = makeStyles(theme => ({
  line: {
    height: '2px',
    borderTop: `2px ${theme.palette.primary.main} dotted`,
    width: '100%',
    transform: 'translate(0, -1px)',
  },
  circle: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    background: theme.palette.primary.main,
  },
  nowIndicator: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: ({ top }) => top,
  },
  shadedCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.08),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.20),
      outline: 0,
    },
  },
  shadedPart: {
    backgroundColor: fade(theme.palette.primary.main, 0.08),
    position: 'absolute',
    height: ({ shadedHeight }) => shadedHeight,
    width: '100%',
    left: 0,
    top: 0,
    'td:focus &': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
  },
  appointment: {
    backgroundColor: teal[300],
    '&:hover': {
      backgroundColor: teal[400],
    },
  },
  shadedAppointment: {
    backgroundColor: teal[200],
    '&:hover': {
      backgroundColor: teal[300],
    },
  },
}));
const TimeIndicator = ({
  top, ...restProps
}) => {
  const classes = useStyles({ top });
  return (
    <div {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </div>
  );
};
const TimeTableCell = ({
  currentTimeIndicatorPosition, isShaded, ...restProps
}) => {
  const classes = useStyles({ shadedHeight: currentTimeIndicatorPosition });
  const isNow = !!currentTimeIndicatorPosition;
  return (
    <WeekView.TimeTableCell
      isShaded={isShaded && !isNow}
      currentTimeIndicatorPosition={currentTimeIndicatorPosition}
      className={classNames({
        [classes.shadedCell]: isShaded && !isNow,
      })}
      {...restProps}
    >
      {isNow && isShaded && (
        <div className={classes.shadedPart} />
      )}
    </WeekView.TimeTableCell>
  );
};

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
      roomname:[],
      roomname2:[],
    };
    this._isMounted = false;
    this.onLocationsChange = this.onLocationsChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);    
    
    
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
      const nextLocations = [];//...locations
      nextLocations.push(locationName);
      return nextLocations;
    };
    
    const getButtonClass = (locations, classes, location) => {  
      //console.log(locations)
        return locations.indexOf(location) > -1 && classes.selectedButton;
    }

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
                  {this.state.roomname2[index]}
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
    this.firststart();
    this.event();
    this.intervalId = setInterval(this.event.bind(this), 5000); //if(this.state.data===[]) { this.intervalId = setInterval(this.event.bind(this), 5000);}
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

  async firststart(){
    const response2 =  await API.get("/api/get/calendarroommas");
    var newresponse = await response2.data[0].array_agg;
      if(newresponse === null){
        this.event();
      } 
      else if(response2.data[0] === "Error"){ this.event();            }
      else{
        var temp=[];for(let i=0;i<newresponse.length;i++){ temp[i]=i+1}
        await this.setState(() => ({ roomname: newresponse }));
        await this.setState(() => ({ locations: newresponse[0] }));
        await this.setState(() => ({ roomname2: temp }));
      }
  }
  async event() {
    const response = await API.get("/api/get/calendarselect");
    const data = await response.data.map(n => ({
      id:n.event_id,
      title: n.event_name,
      startDate: n.event_start,
      endDate: n.event_end,
      location: n.room_name,
      person: n.person_login,
      conform: n.admin_login
    }));
    await this.setState(() => ({ data: data }));

    const locat = await response.data.map(n => ({
      id: n.room_name,
      text: "Room - " + n.room_name,
    }));
    const pers = await response.data.map(n => ({
      id: n.event_id,
      text: "Author - " + n.person_login,
      conform: n.admin_login,
    }));

    for (let i = 0; i < pers.length; i++) { 
      if (pers[i].conform === null) { pers[i].color = '#808080';  
      } else{
        pers[i].color = "rgb(0, 101, 179)";
      }  //else if(person[i].conform === 'admin'){person[i].color = "rgb(0, 101, 179)"; } 
    } 
    var test = []; 
    test[0] = { fieldName: "id", title:"Person", instances: pers };    test[1] = { fieldName: "location", title:"Location", instances: locat };
    await this.setState(() => ({ resources: test }));
  }
  openModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }
  render() {
    const { startDayHour, endDayHour, showModal, setShowModal, data, resources, locations, currentFilter } = this.state;
    const { classes } = this.props;
    var filteredData;
    if(locations !==undefined){ filteredData = data.filter( dataItem => locations.indexOf(dataItem.location) > -1); } else filteredData= [];
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
            timeTableCellComponent={TimeTableCell}
          />
          <MonthView DayScaleCell={2} />
          <Toolbar flexibleSpaceComponent={this.flexibleSpace} />
          <DateNavigator />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip
            showCloseButton />
          <Resources data={resources}  />
          <CurrentTimeIndicator
            indicatorComponent={TimeIndicator}
            shadePreviousCells
            shadePreviousAppointments
          />
        </Scheduler>
        <Eventcal close={this.openModal} showModal={showModal} setShowModal={setShowModal} />
        <div className="fab"><Fab color="secondary" onClick={this.openModal} className={classes.addButton} > <AddIcon /> </Fab></div>
      </Paper>
    );
  }
}
export default withStyles(styless, { name: 'EditingDemo' })(Calendar)
