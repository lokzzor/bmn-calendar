import React from 'react';
import './Login.css';
import CreateIcon from '@material-ui/icons/Create';
import {useDispatch, useSelector} from 'react-redux';
import {Spring} from 'react-spring/renderprops'
import Alert from '@material-ui/lab/Alert';
import { login } from '../../../Actions/user'

const Login = () => {
    const errors = useSelector(state => state.user.errors);
    //console.log(errors);
    const dispatch = useDispatch()
    const [form, setForm]=React.useState({
        login: '', password: '',error: ''
    });
    const handleInputChange = event => { setForm({ ...form, [event.target.name]: event.target.value });}
    React.useEffect(() => { setForm({ ...form, error: errors });}, [errors])
    return (
        <>
        <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 60 }}>
        {propss =>
        <div style={propss} className="bodylogin" >
                { form.error.length > 0 && <Alert className="alertlogin" variant="filled" severity="error">{errors}</Alert>}
                <div className="cardlogin "><div className="togglelogin"> <CreateIcon  className="addiconlogin" /></div> </div>
                <div className="containerlogin">             
                    <div className="headerlogin">
                        <div className="icontoplogin">
                            <div className="avatarlogin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 591.146 591.146"> <path d="M472.917 206.901H78.819c-21.764 0-39.41 17.646-39.41 39.41v334.983h472.917V246.311C512.326 224.547 494.681 206.901 472.917 206.901z" className="a"/> <path d="M472.917 561.589V266.016c0-10.887-8.818-19.705-19.705-19.705H98.524c-10.887 0-19.705 8.818-19.705 19.705v295.573H472.917z" fill="#4398D1"/> <path d="M472.917 561.589V266.016c0-10.887-8.818-19.705-19.705-19.705h-19.705L118.229 561.589H472.917z" fill="#3E8CC7"/> <rect x="137.934" y="364.54" width="275.868" height="78.819" className="b"/> <rect x="167.491" y="394.097" width="19.705" height="19.705" className="c"/> <rect x="206.901" y="394.097" width="19.705" height="19.705" className="c"/> <rect x="246.311" y="394.097" width="19.705" height="19.705" className="c"/> <rect x="285.72" y="394.097" width="19.705" height="19.705" className="c"/> <path d="M328.707 157.639h229.306c12.857 0 23.281 10.424 23.281 23.281v120.929c0 12.857-10.424 23.281-23.281 23.281H328.707c-12.857 0-23.281-10.424-23.281-23.281V180.92C305.425 168.063 315.849 157.639 328.707 157.639z" fill="#FDB62F"/> <path d="M443.359 9.852c-59.854 0-108.377 48.523-108.377 108.377v39.41h39.41v-39.41c0-38.09 30.878-68.967 68.967-68.967s68.967 30.878 68.967 68.967v39.41h39.41v-39.41C551.736 58.376 503.213 9.852 443.359 9.852z" className="d"/> <rect x="177.344" y="157.639" width="19.705" height="19.705" className="b"/> <rect x="177.344" y="118.229" width="19.705" height="19.705" className="b"/> <rect x="177.344" y="78.819" width="19.705" height="19.705" className="b"/> <rect x="177.344" y="39.41" width="19.705" height="19.705" className="b"/> <rect x="216.753" y="39.41" width="19.705" height="19.705" className="b"/> <rect x="256.163" y="39.41" width="19.705" height="19.705" className="b"/> <rect x="295.573" y="39.41" width="19.705" height="19.705" className="b"/> <path d="M512.326 581.293H39.41c-16.325 0-29.557-13.232-29.557-29.557l0 0v-29.557h206.901c6.749 0 12.926 3.813 15.941 9.852l0 0c3.015 6.04 9.192 9.852 15.941 9.852h56.789c6.749 0 12.926-3.813 15.941-9.852l0 0c3.015-6.039 9.192-9.852 15.941-9.852h204.576v29.557C541.884 568.062 528.652 581.293 512.326 581.293L512.326 581.293z" className="d"/> <path d="M565.638 159.018c-66.809 99.51-175.925 143.156-250.104 162.013 3.872 2.67 8.463 4.099 13.173 4.099h229.306c12.857 0 23.281-10.424 23.281-23.281V180.92C581.274 171.028 574.988 162.24 565.638 159.018z" fill="#FFA230"/> <path d="M463.064 236.458c0.049-10.887-8.729-19.744-19.616-19.794 -10.887-0.049-19.744 8.729-19.794 19.616 -0.03 7.074 3.724 13.616 9.852 17.153v32.286h19.705v-32.286C459.291 249.936 463.045 243.473 463.064 236.458z" fill="#556575"/> <rect x="334.983" y="137.934" width="39.41" height="19.705" className="a"/> <rect x="512.326" y="137.934" width="39.41" height="19.705" className="a"/> <rect x="137.934" y="364.54" width="275.868" height="19.705" fill="#71C4D1"/> <path d="M39.41 591.146h472.917c21.764 0 39.41-17.646 39.41-39.41v-29.557c0-5.439-4.414-9.852-9.852-9.852h-19.705V354.688h-19.705v157.639h-19.705V354.688h-19.705v157.639H337.308c-10.493-0.039-20.089 5.902-24.749 15.301 -1.34 2.719-4.108 4.424-7.133 4.404h-56.789c-3.025 0.02-5.793-1.695-7.123-4.404 -4.66-9.399-14.266-15.34-24.759-15.301H88.672V266.016c0-5.439 4.414-9.852 9.852-9.852h177.344v-19.705H98.524c-16.325 0-29.557 13.232-29.557 29.557v246.311H49.262V246.311c0-16.325 13.232-29.557 29.557-29.557h197.049v-19.705H78.819c-27.193 0.03-49.233 22.069-49.262 49.262v266.016H9.852c-5.439 0-9.852 4.414-9.852 9.852v29.557C0 573.5 17.646 591.146 39.41 591.146zM19.705 532.031h197.049c3.025-0.01 5.783 1.695 7.133 4.394 4.65 9.409 14.256 15.35 24.749 15.311h56.789c10.503 0.039 20.099-5.902 24.759-15.311 1.34-2.709 4.099-4.414 7.123-4.394h194.723v19.705c0 10.887-8.818 19.705-19.705 19.705H39.41c-10.887 0-19.705-8.818-19.705-19.705V532.031z"/> <path d="M128.082 364.54v78.819c0 5.439 4.414 9.852 9.852 9.852h275.868c5.439 0 9.852-4.414 9.852-9.852V364.54c0-5.439-4.414-9.852-9.852-9.852H137.934C132.495 354.688 128.082 359.101 128.082 364.54zM147.786 374.392H403.95v59.115H147.786V374.392z"/> <rect x="167.491" y="394.097" width="19.705" height="19.705"/> <rect x="206.901" y="394.097" width="19.705" height="19.705"/> <rect x="246.311" y="394.097" width="19.705" height="19.705"/> <rect x="285.72" y="394.097" width="19.705" height="19.705"/> <path d="M561.589 148.151v-29.922C561.589 52.937 508.651 0 443.359 0S325.13 52.937 325.13 118.229v29.922c-16.769 1.783-29.498 15.902-29.557 32.759v120.948c0.02 18.286 14.848 33.104 33.134 33.124h229.306c18.286-0.02 33.114-14.838 33.134-33.124V180.91C591.087 164.053 578.357 149.934 561.589 148.151zM344.835 118.229c0-54.415 44.109-98.524 98.524-98.524s98.524 44.109 98.524 98.524v29.557h-19.705v-29.557c0-43.528-35.291-78.819-78.819-78.819s-78.819 35.291-78.819 78.819v29.557h-19.705V118.229zM384.245 147.786v-29.557c0-32.651 26.464-59.115 59.115-59.115s59.115 26.464 59.115 59.115v29.557H384.245zM571.441 301.859c-0.01 7.409-6.02 13.409-13.429 13.419H328.707c-7.409-0.01-13.419-6.01-13.429-13.419V180.91c0.01-7.409 6.02-13.409 13.429-13.419h229.306c7.409 0.01 13.419 6.01 13.429 13.419V301.859z"/> <path d="M443.359 206.901c-16.286-0.03-29.518 13.143-29.547 29.429 -0.02 12.532 7.872 23.705 19.695 27.873v21.518h19.705v-21.518c15.36-5.409 23.429-22.247 18.02-37.607C467.064 214.773 455.892 206.881 443.359 206.901zM443.359 246.311c-5.439 0-9.852-4.414-9.852-9.852s4.414-9.852 9.852-9.852c5.439 0 9.852 4.414 9.852 9.852S448.798 246.311 443.359 246.311z"/> <rect x="177.344" y="157.639" width="19.705" height="19.705"/> <rect x="177.344" y="118.229" width="19.705" height="19.705"/> <rect x="177.344" y="78.819" width="19.705" height="19.705"/> <rect x="177.344" y="39.41" width="19.705" height="19.705"/> <rect x="216.753" y="39.41" width="19.705" height="19.705"/> <rect x="256.163" y="39.41" width="19.705" height="19.705"/> <rect x="295.573" y="39.41" width="19.705" height="19.705"/> </svg></div>
                            <div className="titlelogin">Account Form</div>
                        </div>
                    </div>
                    <div className="">
                        <form>
                            <div className="contentlogin">
                                <div className="inputtext">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" className="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                                    <input name="login"  onChange={handleInputChange} autoFocus={true} placeholder="Enter login" value={form.login}  required/>
                                </div>
                                <div className="inputtext">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" className="svg-inline--fa fa-key fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"></path></svg>
                                    <input name="password" onChange={handleInputChange} placeholder="Enter password" value={form.password}  required type="password"/>
                                </div>
                            </div>
                        </form>
                        <div className="loginbut"><button onClick={()=> dispatch(login(form.login, form.password))} ><span>Login</span></button></div>
                        <div className="registration">Don't have account? <a href="https://bmn.jinr.ru/registration" target="_blank" rel="noreferrer">Register now</a></div>
                    </div>
                </div>
            </div>}
        </Spring>
        </>
    );
};

export default Login;
