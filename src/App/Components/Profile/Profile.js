import React from 'react';
import './Profile.css';

import { Link } from 'react-router-dom';
import {auth} from "../../../Actions/user";
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../Reducers/userReducer';

import { Adnewuser } from "../../Functions/AddUser/User";
import { ChangePassword } from "../../Functions/ChangePassword/Password";

function Profile () {
    const isAuth = useSelector(state => state.user);

    const [person, personShowModal] = React.useState(false);
    const [pass, passShowModal] = React.useState(false);

    const persons = () => { personShowModal(!person) };
    const passw = () => { passShowModal(!pass) };
    const dispatch = useDispatch();
    React.useEffect(() => {
      dispatch(auth())
    }, [dispatch])

    return (
        <>
            <div className="profile-box">
                <h2 className="profile-box-title cursor">Account</h2>
                <div className="profile-template">
                <div className="profile-icon">
                  <Link to="/account"><img src="https://dqcgrsy5v35b9.cloudfront.net/cruiseplanner/assets/img/icons/login-w-icon.png" alt=""/></Link>
                </div>
                <div className="profile-name">
                    { !isAuth.isAuth && <h1>Guest</h1>}
                    { isAuth.isAuth && <h1>{ isAuth.currentUser.personName || 'Guest' }</h1>}
                    <hr className="hr-line"></hr>
                </div>
                
                <div className="profile-but">
                    { !isAuth.isAuth && <Link className="profile-button" to="/account">Sing In</Link>}
                    { isAuth.isAuth && <Link className="profile-button" to="/" onClick={() => { dispatch(logout()) }} >Log Out</Link>}
                </div>
                
                </div>
                { isAuth.currentUser.isActive && <ul className="profile-social-links">
                  {isAuth.currentUser.isAdmin && <span>
                    <li onClick={persons.bind(this)}>
                      <a href="/#">
                        <svg width="29" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="user 1"> <g id="Group"> <g id="Group_2"> <g id="Group_3"> <path id="Vector" d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z" fill="url(#paint0_linear)"/> </g> </g> <g id="Group_4"> <g id="Group_5"> <g id="Vector_2" filter="url(#filter0_d)"> <path d="M320.111 165.028C320.111 129.171 291.575 100 256.5 100C221.425 100 192.889 129.171 192.889 165.028C192.889 200.884 221.425 230.055 256.5 230.055C291.575 230.055 320.111 200.884 320.111 165.028ZM256.5 230.055C193.365 230.055 142 282.564 142 347.105V359.294C142 362.991 143.539 366.513 146.232 368.98C177.222 397.366 216.383 413 256.5 413C296.618 413 335.779 397.366 366.768 368.98C369.461 366.513 371 362.99 371 359.294V347.105C371 282.564 319.635 230.055 256.5 230.055Z" fill="url(#paint1_linear)"/> </g> </g> </g> </g> </g> <defs> <filter id="filter0_d" x="138" y="100" width="237" height="321" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/> <feOffset dy="4"/> <feGaussianBlur stdDeviation="2"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/> </filter> <linearGradient id="paint0_linear" x1="256" y1="512" x2="256" y2="0" gradientUnits="userSpaceOnUse"> <stop stopColor="white"/> <stop offset="1" stopColor="white"/> </linearGradient> <linearGradient id="paint1_linear" x1="256.5" y1="413" x2="256.5" y2="100" gradientUnits="userSpaceOnUse"> <stop stopColor="#0004FB" stopOpacity="0.78"/> <stop offset="0.5028" stopColor="#1719A8" stopOpacity="0.76"/> <stop offset="1" stopColor="#2400FF" stopOpacity="0.94"/> </linearGradient> </defs> </svg>                    </a>
                    </li>
                    <Adnewuser close={persons.bind(this)} showModal={person} setShowModal={personShowModal} />
                  </span>}
                  <li onClick={passw.bind(this)}>
                    <a href="/#">
                      <svg width="29" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="key 1" clipPath="url(#clip0)"> <g id="Group"> <g id="XMLID 604"> <path id="XMLID 648" d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z" fill="white"/> </g> <path id="Vector" d="M273.081 281.742L230.336 302.419L206.931 293.514L201.044 316.588L177.64 307.684L171.753 330.757L148.342 321.856L142.456 344.929L100.002 332.173L258.663 255.423L273.081 281.742Z" fill="#82B541"/> <path id="Vector_2" d="M113.622 292.293L100 332.174L142.457 344.928L148.343 321.852L171.749 330.758L177.636 307.682L201.042 316.588L206.929 293.512L230.335 302.418L273.078 281.742L244.244 229.106L113.622 292.293Z" fill="#82B541"/> <path id="Vector_3" d="M382.723 195.411C361.178 156.082 310.986 140.029 270.617 159.557C230.249 179.085 214.989 226.799 236.534 266.128C258.079 305.457 308.271 321.51 348.64 301.982C389.009 282.454 404.268 234.74 382.723 195.411ZM320.343 225.587C314.716 215.316 318.701 202.855 329.244 197.755C339.786 192.655 352.894 196.848 358.521 207.119C364.147 217.39 360.162 229.85 349.62 234.95C339.077 240.05 325.969 235.858 320.343 225.587Z" fill="#82B541"/> <path id="Vector_4" d="M382.722 195.411L358.52 207.118C364.145 217.387 360.16 229.847 349.621 234.945C339.075 240.047 325.967 235.855 320.342 225.586L236.537 266.126C241.63 275.423 248.323 283.418 256.113 289.949C281.262 311.053 317.813 316.894 348.638 301.983C389.011 282.454 404.266 234.739 382.722 195.411Z" fill="#82B541"/> </g> </g> <defs> <clipPath id="clip0"> <rect width="512" height="512" fill="white"/> </clipPath> </defs> </svg>                 
                    </a>
                 </li>
                 <ChangePassword close={passw.bind(this)} showModal={pass} setShowModal={passShowModal} />
                  <li>
                    <a href="/#">
                      <img width="2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-codepen.svg" alt=""/>
                    </a>
                  </li>
                </ul>}
          </div>
        </>
    )

}

export default Profile;