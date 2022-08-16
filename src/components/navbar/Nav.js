import {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./Nav.css";
import {ArrowDropDown, Notifications} from "@mui/icons-material";
import {Link} from "react-router-dom";
import SigninButton from "../Header/SigninButton";
import Logo from "./Logo";

function Nav({dynamicClass}) {
    const [show, handleShow] = useState(false);
    const [signedIn, handleSignin] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);

            } else handleShow(false);
        });
        return (e) => {
            window.removeEventListener("scroll", e);
        };
    }, [])
    return (
        <div className={`navbar d-flex space-between flex-center flex-middle`}>
            <div className={`container nav  ${dynamicClass} ${show && "nav-black"}`}>
                {/*<div className=>*/}
                <div className="left">
                    <Logo />
                    {/*<Routes>*/}
                    {/*<Route path={"/"} element={<CardDescription>{"Hello Word"}</CardDescription>}/>*/}
                    {/*<link to={"/signin"}><span>Movies</span></link>*/}
                    <Link to="/signin"><span>Movies</span></Link>
                    <span>TV Shows</span>
                    <span>History</span>
                    <span>My List</span>
                    {/*</Routes>*/}
                </div>

                <div className="right">
                    {signedIn ?
                        <div>
                            <div className="righticons d-flex flex-end flex-middle">
                                <a href={"#"}> <SearchIcon fontSize={"large"} className={"icon"}/> </a>
                                <div className="dropdown notification">
                                    <img src="/images/icons/notification.svg" alt="notificatio icon"/>
                                    <div className="dropdown-content">
                                        <a href="#" className="profile-item d-flex flex-middle">
                                            <img src="/images/icons/user2.png" alt="user profile icon"
                                                 className="user-icon"/>
                                            <span>You have new notification from <span>User 123</span></span>
                                        </a>
                                        <a href="#" className="profile-item d-flex flex-middle">
                                            <img src="/images/icons/user1.png" alt="user profile icon"
                                                 className="user-icon"/>
                                            <span>You have new notification from <span>User 123</span></span>
                                        </a>
                                        <a href="#" className="profile-item d-flex flex-middle">
                                            <img src="/images/icons/user4.png" alt="user profile icon"
                                                 className="user-icon"/>
                                            <span>You have new notification from <span>User 123</span></span>
                                        </a>
                                        <a href="#" className="profile-item d-flex flex-middle">
                                            <img src="/images/icons/user3.png" alt="user profile icon"
                                                 className="user-icon"/>
                                            <span>You have new notification from <span>User 123</span></span>
                                        </a>
                                    </div>
                                </div>

                                <div className="dropdown">
                                    <img src={`${process.env.PUBLIC_URL}/images/icons/user2.png`}  alt="user profile icon"
                                         className="user-icon"/> <span className="profile-arrow"></span>

                                    <div className="dropdown-content">
                                        <div className="profile-links">
                                            <a href="#" className="profile-item d-flex flex-middle">
                                                <img src={`${process.env.PUBLIC_URL}/default_profile.jpeg`}  alt="user profile icon"
                                                     className="user-icon"/>
                                                <span>Rajesh</span>
                                            </a>
                                            <a href="#" className="profile-item d-flex flex-middle">
                                                <img src="/images/icons/user2.png" alt="user profile icon"
                                                     className="user-icon"/>
                                                <span>Karan</span>
                                            </a>
                                            <a href="#" className="profile-item d-flex flex-middle">
                                                <img src="/images/icons/user3.png" alt="user profile icon"
                                                     className="user-icon"/>
                                                <span>Pappy</span>
                                            </a>
                                            <a href="#" className="profile-item d-flex flex-middle">
                                                <img src="/images/icons/user4.png" alt="user profile icon"
                                                     className="user-icon"/>
                                                <span>Denny</span>
                                            </a>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        :

                        <SigninButton>Sign In</SigninButton>
                    }

                </div>
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Nav;
