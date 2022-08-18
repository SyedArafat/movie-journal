import React, {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./Nav.css";
import {Link} from "react-router-dom";
import SigninButton from "../Header/SigninButton";
import Logo from "./Logo";

function Nav({dynamicClass, callback}) {
    const [show, handleShow] = useState(false);
    const [signedIn, handleSignin] = useState(true);

    const emptySearch = () => {
        document.getElementById("searchright").value = "";
        callback("");
    }

    const doSearch = (event) => {
       setTimeout( () => {
            callback(event.target.value);
        }, 500);
    }

    const clickSearch = () => {
        handleShow(true);
    }

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
                    <Link onClick={emptySearch} to={"/"}><Logo /></Link>
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
                                {/*<form action="/search" method="get">*/}
                                    <input onChange={doSearch} className="search expandright" id="searchright" type="search" name="q" placeholder="Search" />
                                    <label className="" htmlFor="searchright">
                                        <SearchIcon onClick={clickSearch} fontSize={"large"} className={"icon button searchbutton"}/>
                                    </label>
                                {/*</form>*/}
                                {/*<a href={"#"}> <SearchIcon fontSize={"large"} className={"icon"}/> </a>*/}
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
