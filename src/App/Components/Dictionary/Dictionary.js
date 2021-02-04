import React from 'react'
import './Dictionary.css';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Roomcreate } from "../../Functions/AddRoom/Room"
import { Adnewuser } from "../../Functions/AddUser/User"
import { ChangePassword } from "../../Functions/ChangePassword/Password"



const Dictionary = () => {
  const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) };

  const [room, roomShowModal] = React.useState(false);
  const [person, personShowModal] = React.useState(false);
  const [pass, passShowModal] = React.useState(false);


  const rooms = () => { roomShowModal(!room) };
  const persons = () => { personShowModal(!person) };
  const passw = () => { passShowModal(!pass) };

  return (
    <>
      <div className="dictinary-main">
        <div className="dictinary_section_header">
          <div>
            <p>
              Your pipes
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1C4.14 1 1 4.14 1 8C1 11.86 4.14 15 8 15C11.859 15 15 11.859 15 8C15 4.141 11.859 1 8 1ZM8 13C5.243 13 3 10.757 3 8C3 5.243 5.243 3 8 3C10.757 3 13 5.243 13 8C13 10.757 10.757 13 8 13Z" fill="#8492A6"></path><path d="M8.073 4.5C7.406 4.5 6.778 4.76 6.305 5.232C5.914 5.623 5.914 6.255 6.305 6.646C6.696 7.037 7.328 7.037 7.719 6.646C7.774 6.592 7.893 6.5 8.073 6.5C8.349 6.5 8.573 6.724 8.573 7C8.573 7.18 8.482 7.298 8.427 7.354C8.372 7.408 8.253 7.5 8.073 7.5C7.521 7.5 7.073 7.948 7.073 8.5C7.073 9.052 7.521 9.5 8.073 9.5C8.74 9.5 9.368 9.24 9.84 8.769C10.313 8.297 10.573 7.669 10.573 7.001C10.573 5.621 9.452 4.5 8.073 4.5Z" fill="#8492A6"></path><path d="M8.71 10.289C8.66 10.249 8.61 10.199 8.56 10.17C8.5 10.13 8.44 10.1 8.38 10.079C8.32 10.05 8.26 10.029 8.2 10.019C8 9.98 7.8 9.999 7.62 10.079C7.49 10.13 7.39 10.199 7.29 10.289C7.2 10.39 7.13 10.489 7.08 10.619C7.03 10.74 7 10.87 7 10.999C7 11.27 7.1 11.52 7.29 11.709C7.48 11.899 7.73 11.999 8 11.999C8.27 11.999 8.52 11.899 8.71 11.709C8.9 11.52 9 11.27 9 10.999C9 10.869 8.98 10.739 8.92 10.619C8.87 10.49 8.8 10.39 8.71 10.289Z" fill="#8492A6"></path></svg>
            </p>
            <p>Here are all your processes</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4C7.448 4 7 4.448 7 5V8C7 8.265 7.105 8.52 7.293 8.707L9.293 10.707C9.488 10.903 9.744 11 10 11C10.256 11 10.512 10.902 10.707 10.707C11.098 10.316 11.098 9.684 10.707 9.293L9 7.586V5C9 4.448 8.552 4 8 4Z" fill="#8492A6"></path><path d="M13.657 2.343C12.145 0.832 10.136 0 8 0C5.863 0 3.854 0.832 2.343 2.343C0.832 3.855 0 5.864 0 8C0 10.137 0.832 12.146 2.343 13.657C2.461 13.775 2.599 13.868 2.724 13.978H1.5C0.948 13.978 0.5 14.425 0.5 14.978C0.5 15.531 0.948 15.978 1.5 15.978H5C5.552 15.978 6 15.531 6 14.978V11.5C6 10.947 5.552 10.5 5 10.5C4.448 10.5 4 10.947 4 11.5V12.447C3.921 12.376 3.833 12.318 3.757 12.242C2.624 11.109 2 9.603 2 8C2 6.398 2.624 4.891 3.757 3.757C4.891 2.624 6.397 2 8 2C9.602 2 11.109 2.624 12.243 3.757C13.376 4.891 14 6.397 14 8C14 9.603 13.376 11.11 12.242 12.243C11.108 13.376 9.602 14 8 14C7.448 14 7 14.447 7 15C7 15.553 7.448 16 8 16C10.136 16 12.145 15.168 13.656 13.656C15.168 12.147 16 10.137 16 8C16 5.863 15.168 3.854 13.657 2.343Z" fill="#8492A6"></path></svg>
        </div>
        <div className="dictinary_section_content">
          <div className="dictinary-fCcBNx fade-in">
            <div className="dictinary-card-content">
              <p className="dictinary-card-counter">
                Open
                    </p>
              <div className="dictinary_card__logo-wrapper">
                <span className=" ">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.9 11H12.1C10.938 11 10 11.9613 10 13.1522V36.1087C10 37.2996 10.938 38.2609 12.1 38.2609H29.824C29.978 38.2609 30.132 38.3183 30.258 38.4043L37.16 43.6987C37.398 43.8996 37.706 44 38 44C38.21 44 38.42 43.957 38.63 43.8565C39.106 43.6126 39.4 43.1104 39.4 42.5652V38.2609H42.9C44.062 38.2609 45 37.2996 45 36.1087V13.1522C45 11.9613 44.062 11 42.9 11ZM33.59 23.827L31.042 26.467L31.658 30.2404C31.756 30.8143 31.21 31.2735 30.734 31.0009L27.5 29.193L24.266 31.0009C23.79 31.2591 23.244 30.8143 23.342 30.2404L23.958 26.467L21.41 23.827C21.004 23.4109 21.214 22.6791 21.76 22.593L25.316 22.0478L26.94 18.5613C27.178 18.0448 27.85 18.0448 28.088 18.5613L29.712 22.0478L33.268 22.593C33.786 22.6791 33.996 23.4109 33.59 23.827Z" fill="#FF6F00"></path></svg>                      </span>
              </div>
              <p className="dictinary-card-content-title">Add New Dictionary</p>
            </div>
          </div>
          <div onClick={rooms.bind(this)} className="dictinary-ZFeuk fade-in">
            <div className="dictinary-card-content">
              <p className="dictinary-card-counter">
                Open
                    </p>
              <div className="dictinary_card__logo-wrapper">
                <span className=" ">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.25 9L11 18.75V36.75C11 37.02 11.15 37.275 11.39 37.41L27.89 46.41C27.995 46.47 28.13 46.5 28.25 46.5C28.37 46.5 28.505 46.47 28.61 46.41L45.11 37.41C45.35 37.275 45.5 37.02 45.5 36.75V18.75L28.25 9ZM27.5 44.49L13.295 36.735L22.625 31.395C22.985 31.185 23.105 30.735 22.91 30.375C22.7 30.015 22.25 29.895 21.89 30.09L12.5 35.46V19.605L27.5 28.08V44.49ZM28.25 26.775L14.045 18.75L27.5 11.145V20.25C27.5 20.67 27.83 21 28.25 21C28.67 21 29 20.67 29 20.25V11.145L42.455 18.75L28.25 26.775ZM44 35.46L34.625 30.105C34.265 29.895 33.8 30.03 33.605 30.39C33.395 30.75 33.53 31.215 33.89 31.41L43.22 36.75L29 44.49V28.08L44 19.605V35.46Z" fill="#F6338A"></path></svg>                      </span>
              </div>
              <p className="dictinary-card-content-title">Add New Room</p>
            </div>
          </div>
          <Roomcreate close={rooms.bind(this)} showModal={room} setShowModal={roomShowModal} />
        </div>
        <div className="dictinary_section_content2">
          <div onClick={persons.bind(this)} className="dictinary-cgplf fade-in">
            <div className="dictinary-card-content">
              <p className="dictinary-card-counter">
                Open
                    </p>
              <div className="dictinary_card__logo-wrapper">
                <span className=" ">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 15C23.5 12.51 25.51 10.5 28 10.5C30.49 10.5 32.5 12.51 32.5 15C32.5 17.49 30.49 19.5 28 19.5C25.51 19.5 23.5 17.49 23.5 15ZM35.5 33.75V28.5C35.5 24.36 32.14 21 28 21C23.86 21 20.5 24.36 20.5 28.5V33.75C20.5 34.995 21.505 36 22.75 36H23.5V44.25C23.5 45.495 24.505 46.5 25.75 46.5H30.25C31.495 46.5 32.5 45.495 32.5 44.25V36H33.25C34.495 36 35.5 34.995 35.5 33.75Z" fill="#2979FF"></path><path opacity="0.4" d="M38.5 18C40.99 18 43 15.99 43 13.5C43 11.01 40.99 9 38.5 9C36.01 9 34 11.01 34 13.5C34 15.99 36.01 18 38.5 18ZM17.5 18C19.99 18 22 15.99 22 13.5C22 11.01 19.99 9 17.5 9C15.01 9 13 11.01 13 13.5C13 15.99 15.01 18 17.5 18ZM19 33.75V28.5C19 25.62 20.365 23.07 22.465 21.42C21.145 20.235 19.42 19.5 17.5 19.5C13.36 19.5 10 22.86 10 27V30.75C10 31.995 11.005 33 12.25 33H13V39.75C13 40.995 14.005 42 15.25 42H19.75C20.995 42 22 40.995 22 39.75V37.425C20.29 37.08 19 35.565 19 33.75ZM38.5 19.5C36.58 19.5 34.855 20.235 33.535 21.42C35.635 23.07 37 25.62 37 28.5V33.75C37 35.565 35.71 37.08 34 37.425V39.75C34 40.995 35.005 42 36.25 42H40.75C41.995 42 43 40.995 43 39.75V33H43.75C44.995 33 46 31.995 46 30.75V27C46 22.86 42.64 19.5 38.5 19.5Z" fill="#2979FF"></path></svg>
                </span>
              </div>
              <p className="dictinary-card-content-title">Add New Person</p>
            </div>
          </div>
          <Adnewuser close={persons.bind(this)} showModal={person} setShowModal={personShowModal} />
          <div onClick={passw.bind(this)} className="dictinary-cEcyYU fade-in">
            <div className="dictinary-card-content">
              <p className="dictinary-card-counter">
                Open
                    </p>
              <div className="dictinary_card__logo-wrapper">
                <span className=" ">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 20.5C14.5 16.36 17.86 13 22 13C26.14 13 29.5 16.36 29.5 20.5C29.5 24.64 26.14 28 22 28C17.86 28 14.5 24.64 14.5 20.5ZM22 29.5C15.37 29.5 10 34.87 10 41.5V42.25C10 42.67 10.33 43 10.75 43H33.25C33.67 43 34 42.67 34 42.25V41.5C34 34.87 28.63 29.5 22 29.5ZM33.25 14.5H45.25C45.67 14.5 46 14.17 46 13.75C46 13.33 45.67 13 45.25 13H33.25C32.83 13 32.5 13.33 32.5 13.75C32.5 14.17 32.83 14.5 33.25 14.5ZM45.25 19H34.75C34.33 19 34 19.33 34 19.75C34 20.17 34.33 20.5 34.75 20.5H45.25C45.67 20.5 46 20.17 46 19.75C46 19.33 45.67 19 45.25 19ZM45.25 25H33.25C32.83 25 32.5 25.33 32.5 25.75C32.5 26.17 32.83 26.5 33.25 26.5H45.25C45.67 26.5 46 26.17 46 25.75C46 25.33 45.67 25 45.25 25Z" fill="#FFAB00"></path></svg>                    </span>
              </div>
              <p className="dictinary-card-content-title">Change Password</p>
            </div>
          </div>
          <ChangePassword close={passw.bind(this)} showModal={pass} setShowModal={passShowModal} />
          <div className="dictinary-keJRbL fade-in">
            <div className="dictinary-card-content">
              <p className="dictinary-card-counter">
                Open
                    </p>
              <div className="dictinary_card__logo-wrapper">
                <span className=" ">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0909 21C17.0909 17.136 20.1455 14 23.9091 14C27.6727 14 30.7273 17.136 30.7273 21C30.7273 24.864 27.6727 28 23.9091 28C20.1455 28 17.0909 24.864 17.0909 21ZM23.9091 29.4C17.8818 29.4 13 34.412 13 40.6V41.3C13 41.692 13.3 42 13.6818 42H34.1364C34.5182 42 34.8182 41.692 34.8182 41.3V40.6C34.8182 34.412 29.9364 29.4 23.9091 29.4ZM36.1818 25.2C38.4318 25.2 40.2727 23.31 40.2727 21C40.2727 18.69 38.4318 16.8 36.1818 16.8C33.9318 16.8 32.0909 18.69 32.0909 21C32.0909 23.31 33.9318 25.2 36.1818 25.2ZM34.1091 33.6H43C43 29.736 39.9455 26.6 36.1818 26.6C33.7273 26.6 31.6 27.93 30.4 29.932C31.8727 30.87 33.1409 32.116 34.1091 33.6Z" fill="#00BFA5"></path></svg>                      </span>
              </div>
              <p className="dictinary-card-content-title">Avatar</p>
            </div>
          </div>
          <div className="dictinary-sfCcBNx fade-in">
            <div className="dictinary-card-content">
              <p className="dictinary-card-counter">
                Open
                    </p>
              <div className="dictinary_card__logo-wrapper">
                <span className=" ">
                  <svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 512 512" width="512"><linearGradient gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="512"><stop offset="0" /><stop offset="1" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="452" y2="91"><stop offset="0" /><stop offset=".5028" /><stop offset="1" /></linearGradient><circle cx="256" cy="256" r="256" fill="url(#SVGID_1_)" /><path d="m331 166c0-41.355-33.645-75-75-75s-75 33.645-75 75 33.645 75 75 75 75-33.645 75-75zm-75 75c-74.439 0-135 60.561-135 135v14.058c0 4.264 1.814 8.326 4.99 11.171 36.538 32.74 82.71 50.771 130.01 50.771 47.301 0 93.473-18.031 130.01-50.771 3.176-2.845 4.99-6.908 4.99-11.171v-14.058c0-74.439-60.561-135-135-135z" fill="url(#SVGID_2_)" /></svg> </span>
              </div>
              <p className="dictinary-card-content-title">Block Person</p>
            </div>
          </div>
        </div>
      </div>
      <div className="top">
        <a href="#up">
          <ExpandLessIcon onClick={scrollTop.bind(this)} className="icon-top" />
        </a>
      </div>
    </>
  )
}

export default Dictionary;
/* import { Eventcal } from "../../functions/addevent/event";
import { Roomcreate } from "../../functions/addroom/room";
import { Adnewuser } from "../../functions/adduser/user";
import { ChangePassword } from "../../functions/changepassword/newpass";
import API from '../../../../reducers/api';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


export default class Dictionary extends Component {
  async componentDidMount() {

    await API.get("/api/get/calendarselectroom").then((resp) => {
        this.setState(() => ({ rooms: resp.data }));
    })
}
scrollTop(){ window.scrollTo({top: 0, behavior: 'smooth'}); };

componentWillUnmount() { this.setState = ()=>{ return; };}
  constructor(props) {
    super(props);
    this.event = this.event.bind(this);
    this.room = this.room.bind(this);
    this.person = this.person.bind(this);
    this.password = this.password.bind(this);

    this.state = {
      dictionary:false,
      event:false,
      room:false,
      person:false,
      password:false,
      avatar:false,
      showModal: false,
      setShowModal: false,
      rooms:[]
    };
  }
    event() { this.setState((event) => ({ event: !this.state.event }));}
    room() { this.setState((event) => ({ room: !this.state.room }));}
    person() { this.setState((event) => ({ person: !this.state.person }));}
    password() { this.setState((event) => ({ password: !this.state.password }));}

    render() {
      const event=this.state.event;
      const room=this.state.room;
      const person=this.state.person;
      const rooms=this.state.rooms;
      const password=this.state.password;

        return (
          <>
            <div className="dictinary-main">
              <div className="dictinary_section_header">
                <div>
                  <p>
                    Your pipes
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1C4.14 1 1 4.14 1 8C1 11.86 4.14 15 8 15C11.859 15 15 11.859 15 8C15 4.141 11.859 1 8 1ZM8 13C5.243 13 3 10.757 3 8C3 5.243 5.243 3 8 3C10.757 3 13 5.243 13 8C13 10.757 10.757 13 8 13Z" fill="#8492A6"></path><path d="M8.073 4.5C7.406 4.5 6.778 4.76 6.305 5.232C5.914 5.623 5.914 6.255 6.305 6.646C6.696 7.037 7.328 7.037 7.719 6.646C7.774 6.592 7.893 6.5 8.073 6.5C8.349 6.5 8.573 6.724 8.573 7C8.573 7.18 8.482 7.298 8.427 7.354C8.372 7.408 8.253 7.5 8.073 7.5C7.521 7.5 7.073 7.948 7.073 8.5C7.073 9.052 7.521 9.5 8.073 9.5C8.74 9.5 9.368 9.24 9.84 8.769C10.313 8.297 10.573 7.669 10.573 7.001C10.573 5.621 9.452 4.5 8.073 4.5Z" fill="#8492A6"></path><path d="M8.71 10.289C8.66 10.249 8.61 10.199 8.56 10.17C8.5 10.13 8.44 10.1 8.38 10.079C8.32 10.05 8.26 10.029 8.2 10.019C8 9.98 7.8 9.999 7.62 10.079C7.49 10.13 7.39 10.199 7.29 10.289C7.2 10.39 7.13 10.489 7.08 10.619C7.03 10.74 7 10.87 7 10.999C7 11.27 7.1 11.52 7.29 11.709C7.48 11.899 7.73 11.999 8 11.999C8.27 11.999 8.52 11.899 8.71 11.709C8.9 11.52 9 11.27 9 10.999C9 10.869 8.98 10.739 8.92 10.619C8.87 10.49 8.8 10.39 8.71 10.289Z" fill="#8492A6"></path></svg>
                  </p>
                  <p>Here are all your processes</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4C7.448 4 7 4.448 7 5V8C7 8.265 7.105 8.52 7.293 8.707L9.293 10.707C9.488 10.903 9.744 11 10 11C10.256 11 10.512 10.902 10.707 10.707C11.098 10.316 11.098 9.684 10.707 9.293L9 7.586V5C9 4.448 8.552 4 8 4Z" fill="#8492A6"></path><path d="M13.657 2.343C12.145 0.832 10.136 0 8 0C5.863 0 3.854 0.832 2.343 2.343C0.832 3.855 0 5.864 0 8C0 10.137 0.832 12.146 2.343 13.657C2.461 13.775 2.599 13.868 2.724 13.978H1.5C0.948 13.978 0.5 14.425 0.5 14.978C0.5 15.531 0.948 15.978 1.5 15.978H5C5.552 15.978 6 15.531 6 14.978V11.5C6 10.947 5.552 10.5 5 10.5C4.448 10.5 4 10.947 4 11.5V12.447C3.921 12.376 3.833 12.318 3.757 12.242C2.624 11.109 2 9.603 2 8C2 6.398 2.624 4.891 3.757 3.757C4.891 2.624 6.397 2 8 2C9.602 2 11.109 2.624 12.243 3.757C13.376 4.891 14 6.397 14 8C14 9.603 13.376 11.11 12.242 12.243C11.108 13.376 9.602 14 8 14C7.448 14 7 14.447 7 15C7 15.553 7.448 16 8 16C10.136 16 12.145 15.168 13.656 13.656C15.168 12.147 16 10.137 16 8C16 5.863 15.168 3.854 13.657 2.343Z" fill="#8492A6"></path></svg>
              </div>
              <div className="dictinary_section_content">
                <div className="dictinary-fCcBNx fade-in">
                  <div className="dictinary-card-content">
                    <p className="dictinary-card-counter">
                     Open
                    </p>
                    <div className="dictinary_card__logo-wrapper">
                      <span className=" ">
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.9 11H12.1C10.938 11 10 11.9613 10 13.1522V36.1087C10 37.2996 10.938 38.2609 12.1 38.2609H29.824C29.978 38.2609 30.132 38.3183 30.258 38.4043L37.16 43.6987C37.398 43.8996 37.706 44 38 44C38.21 44 38.42 43.957 38.63 43.8565C39.106 43.6126 39.4 43.1104 39.4 42.5652V38.2609H42.9C44.062 38.2609 45 37.2996 45 36.1087V13.1522C45 11.9613 44.062 11 42.9 11ZM33.59 23.827L31.042 26.467L31.658 30.2404C31.756 30.8143 31.21 31.2735 30.734 31.0009L27.5 29.193L24.266 31.0009C23.79 31.2591 23.244 30.8143 23.342 30.2404L23.958 26.467L21.41 23.827C21.004 23.4109 21.214 22.6791 21.76 22.593L25.316 22.0478L26.94 18.5613C27.178 18.0448 27.85 18.0448 28.088 18.5613L29.712 22.0478L33.268 22.593C33.786 22.6791 33.996 23.4109 33.59 23.827Z" fill="#FF6F00"></path></svg>                      </span>
                    </div>
                    <p className="dictinary-card-content-title">Add New Dictionary</p>
                  </div>
                </div>
                <div onClick={this.event} className="dictinary-krrgvp fade-in">
                  <div className="dictinary-card-content">
                    <p className="dictinary-card-counter">
                     Open
                    </p>
                    <div className="dictinary_card__logo-wrapper">
                      <span className=" ">
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.5 19.5054H32V34.5054H26.36L27.2 40.3854C27.365 41.5704 26.585 42.6804 25.415 42.9054L22.7 43.4454C21.305 43.7454 20 42.6804 20 41.2554V34.5054H18.5C14.36 34.5054 11 31.1454 11 27.0054C11 22.8654 14.36 19.5054 18.5 19.5054H29V26.2554C29 26.6754 29.33 27.0054 29.75 27.0054C30.17 27.0054 30.5 26.6754 30.5 26.2554V19.5054ZM42.83 12.1254L33.5 18.9504V35.0454L42.83 41.8704C43.325 42.2154 44 41.8554 44 41.2554V12.7554C44 12.1554 43.325 11.7954 42.83 12.1254Z" fill="#2979FF"></path></svg>                      </span>
                    </div>
                    <p className="dictinary-card-content-title">Add New Event</p>
                  </div>
                </div>
                <Eventcal close={this.event} room={rooms} showModal={event} />
                <div onClick={this.room} className="dictinary-ZFeuk fade-in">
                  <div className="dictinary-card-content">
                    <p className="dictinary-card-counter">
                     Open
                    </p>
                    <div className="dictinary_card__logo-wrapper">
                      <span className=" ">
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.25 9L11 18.75V36.75C11 37.02 11.15 37.275 11.39 37.41L27.89 46.41C27.995 46.47 28.13 46.5 28.25 46.5C28.37 46.5 28.505 46.47 28.61 46.41L45.11 37.41C45.35 37.275 45.5 37.02 45.5 36.75V18.75L28.25 9ZM27.5 44.49L13.295 36.735L22.625 31.395C22.985 31.185 23.105 30.735 22.91 30.375C22.7 30.015 22.25 29.895 21.89 30.09L12.5 35.46V19.605L27.5 28.08V44.49ZM28.25 26.775L14.045 18.75L27.5 11.145V20.25C27.5 20.67 27.83 21 28.25 21C28.67 21 29 20.67 29 20.25V11.145L42.455 18.75L28.25 26.775ZM44 35.46L34.625 30.105C34.265 29.895 33.8 30.03 33.605 30.39C33.395 30.75 33.53 31.215 33.89 31.41L43.22 36.75L29 44.49V28.08L44 19.605V35.46Z" fill="#F6338A"></path></svg>                      </span>
                    </div>
                    <p className="dictinary-card-content-title">Add New Room</p>
                  </div>
                </div>
                <Roomcreate close={this.room} showModal={room} />
              </div>
              <div className="dictinary_section_content2">
              <div onClick={this.person} className="dictinary-cgplf fade-in">
                  <div className="dictinary-card-content">
                    <p className="dictinary-card-counter">
                     Open
                    </p>
                    <div className="dictinary_card__logo-wrapper">
                      <span className=" ">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 15C23.5 12.51 25.51 10.5 28 10.5C30.49 10.5 32.5 12.51 32.5 15C32.5 17.49 30.49 19.5 28 19.5C25.51 19.5 23.5 17.49 23.5 15ZM35.5 33.75V28.5C35.5 24.36 32.14 21 28 21C23.86 21 20.5 24.36 20.5 28.5V33.75C20.5 34.995 21.505 36 22.75 36H23.5V44.25C23.5 45.495 24.505 46.5 25.75 46.5H30.25C31.495 46.5 32.5 45.495 32.5 44.25V36H33.25C34.495 36 35.5 34.995 35.5 33.75Z" fill="#2979FF"></path><path opacity="0.4" d="M38.5 18C40.99 18 43 15.99 43 13.5C43 11.01 40.99 9 38.5 9C36.01 9 34 11.01 34 13.5C34 15.99 36.01 18 38.5 18ZM17.5 18C19.99 18 22 15.99 22 13.5C22 11.01 19.99 9 17.5 9C15.01 9 13 11.01 13 13.5C13 15.99 15.01 18 17.5 18ZM19 33.75V28.5C19 25.62 20.365 23.07 22.465 21.42C21.145 20.235 19.42 19.5 17.5 19.5C13.36 19.5 10 22.86 10 27V30.75C10 31.995 11.005 33 12.25 33H13V39.75C13 40.995 14.005 42 15.25 42H19.75C20.995 42 22 40.995 22 39.75V37.425C20.29 37.08 19 35.565 19 33.75ZM38.5 19.5C36.58 19.5 34.855 20.235 33.535 21.42C35.635 23.07 37 25.62 37 28.5V33.75C37 35.565 35.71 37.08 34 37.425V39.75C34 40.995 35.005 42 36.25 42H40.75C41.995 42 43 40.995 43 39.75V33H43.75C44.995 33 46 31.995 46 30.75V27C46 22.86 42.64 19.5 38.5 19.5Z" fill="#2979FF"></path></svg>
                      </span>
                    </div>
                    <p className="dictinary-card-content-title">Add New Person</p>
                  </div>
                </div>
                <Adnewuser close={this.person} showModal={person} />
                <div onClick={this.password} className="dictinary-cEcyYU fade-in">
                  <div className="dictinary-card-content">
                    <p className="dictinary-card-counter">
                     Open
                    </p>
                    <div className="dictinary_card__logo-wrapper">
                      <span className=" ">
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 20.5C14.5 16.36 17.86 13 22 13C26.14 13 29.5 16.36 29.5 20.5C29.5 24.64 26.14 28 22 28C17.86 28 14.5 24.64 14.5 20.5ZM22 29.5C15.37 29.5 10 34.87 10 41.5V42.25C10 42.67 10.33 43 10.75 43H33.25C33.67 43 34 42.67 34 42.25V41.5C34 34.87 28.63 29.5 22 29.5ZM33.25 14.5H45.25C45.67 14.5 46 14.17 46 13.75C46 13.33 45.67 13 45.25 13H33.25C32.83 13 32.5 13.33 32.5 13.75C32.5 14.17 32.83 14.5 33.25 14.5ZM45.25 19H34.75C34.33 19 34 19.33 34 19.75C34 20.17 34.33 20.5 34.75 20.5H45.25C45.67 20.5 46 20.17 46 19.75C46 19.33 45.67 19 45.25 19ZM45.25 25H33.25C32.83 25 32.5 25.33 32.5 25.75C32.5 26.17 32.83 26.5 33.25 26.5H45.25C45.67 26.5 46 26.17 46 25.75C46 25.33 45.67 25 45.25 25Z" fill="#FFAB00"></path></svg>                    </span>
                      </div>
                    <p className="dictinary-card-content-title">Change Password</p>
                  </div>
                </div>
                <ChangePassword close={this.password} showModal={password} />
                <div className="dictinary-keJRbL fade-in">
                  <div className="dictinary-card-content">
                    <p className="dictinary-card-counter">
                     Open
                    </p>
                    <div className="dictinary_card__logo-wrapper">
                      <span className=" ">
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0909 21C17.0909 17.136 20.1455 14 23.9091 14C27.6727 14 30.7273 17.136 30.7273 21C30.7273 24.864 27.6727 28 23.9091 28C20.1455 28 17.0909 24.864 17.0909 21ZM23.9091 29.4C17.8818 29.4 13 34.412 13 40.6V41.3C13 41.692 13.3 42 13.6818 42H34.1364C34.5182 42 34.8182 41.692 34.8182 41.3V40.6C34.8182 34.412 29.9364 29.4 23.9091 29.4ZM36.1818 25.2C38.4318 25.2 40.2727 23.31 40.2727 21C40.2727 18.69 38.4318 16.8 36.1818 16.8C33.9318 16.8 32.0909 18.69 32.0909 21C32.0909 23.31 33.9318 25.2 36.1818 25.2ZM34.1091 33.6H43C43 29.736 39.9455 26.6 36.1818 26.6C33.7273 26.6 31.6 27.93 30.4 29.932C31.8727 30.87 33.1409 32.116 34.1091 33.6Z" fill="#00BFA5"></path></svg>                      </span>
                    </div>
                    <p className="dictinary-card-content-title">Avatar</p>
                  </div>
                </div>
                <div className="dictinary-sfCcBNx fade-in">
                  <div className="dictinary-card-content">
                    <p className="dictinary-card-counter">
                     Open
                    </p>
                    <div className="dictinary_card__logo-wrapper">
                      <span className=" ">
                      <svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 512 512" width="512"><linearGradient gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="512"><stop offset="0" /><stop offset="1" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="452" y2="91"><stop offset="0" /><stop offset=".5028" /><stop offset="1" /></linearGradient><circle cx="256" cy="256" r="256" fill="url(#SVGID_1_)"/><path d="m331 166c0-41.355-33.645-75-75-75s-75 33.645-75 75 33.645 75 75 75 75-33.645 75-75zm-75 75c-74.439 0-135 60.561-135 135v14.058c0 4.264 1.814 8.326 4.99 11.171 36.538 32.74 82.71 50.771 130.01 50.771 47.301 0 93.473-18.031 130.01-50.771 3.176-2.845 4.99-6.908 4.99-11.171v-14.058c0-74.439-60.561-135-135-135z" fill="url(#SVGID_2_)"/></svg> </span>
                    </div>
                    <p className="dictinary-card-content-title">Block Person</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="top">
              <a href="#up">
                  <ExpandLessIcon  onClick={this.scrollTop} className="icon-top"/>
              </a>
            </div>
          </>
        );
      }
} */