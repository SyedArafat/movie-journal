import React, {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./Nav.css";
import {Link, useNavigate} from "react-router-dom";
import SigninButton from "../Header/SigninButton";
import Logo from "./Logo";
import {Authed, DeleteToken, GetName, GetToken} from "../../auth/Authentication";
import api from "../../api/BackendApi";
import {BACKEND_LOGOUT_URI} from "../../config/config";
import {AccountBox, Logout} from "@mui/icons-material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";


function Nav({dynamicClass, callback, setLoading, showSearchIcon = true}) {
    const navigate = useNavigate();
    const [show, handleShow] = useState(false);
    const [login] = useState(Authed);

    const emptySearch = () => {
        document.getElementById("searchright").value = "";
        callback("");
    }

    const doSearch = (event) => {

        callback(event.target.value);

    }

    const clickSearch = () => {
        handleShow(true);
    }

    const handleLogout = async () => {
        setLoading(true);
        await api.get(`${BACKEND_LOGOUT_URI}`, {
            "headers": {
                "Authorization": `Bearer ${GetToken()}`
            }
        }).then(response => {
            DeleteToken();
            navigate("/signin");
        }).catch(err => {
            DeleteToken();
            navigate("/signin");
        });
        setLoading(false);


    }

    let profileClickEvent = (url) => {
        navigate(url, {replace: true});
    }

    const menuButtonClick = () => {
        let x = document.getElementById("myLinks");
        if (x.style.display === "block") {
            x.style.display = "none";
            x.style.transitionDuration = "0.8s";
        } else {
            x.style.display = "block";
            x.style.transitionDuration = "0.8s";

        }
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
    return (<>
        <div className={`navbar d-flex space-between flex-center flex-middle nav-for-desktop-view`}>
            <div className={`custom-container nav  ${dynamicClass} ${show && "nav-black"}`}>
                {/*<div className=>*/}
                <div className="left">
                    <Link onClick={emptySearch} to={"/"}><Logo/></Link>
                    <Link to="/watched/contents"><span>Watched List</span></Link>
                    <Link to={"/wishlist/contents"}><span>Wish List</span></Link>
                    <Link to="/advance-search"><span>Advance Search</span></Link>
                </div>

                <div className="right">
                    {login ? <div>
                        <div className="righticons d-flex flex-end flex-middle">
                            {showSearchIcon && <>
                                <input onChange={doSearch} className="search expandright" id="searchright"
                                       type="search"
                                       name="q" placeholder="Search"/>
                                <label className="" htmlFor="searchright">
                                    <SearchIcon onClick={clickSearch} fontSize={"large"}
                                                className={"icon button searchbutton"}/>
                                </label>
                            </>}
                            <div className="dropdown notification">
                                <img src="/images/icons/notification.svg" alt="notificatio icon"/>
                                <div className="dropdown-content">
                                    <a className="profile-item d-flex flex-middle">
                                        <span>No new notifications.</span>
                                    </a>
                                </div>
                            </div>

                            <div className="dropdown">
                                <img src={`${process.env.PUBLIC_URL}/images/icons/user2.png`}
                                     alt="user profile icon"
                                     className="user-icon"/>
                                <span className="profile-arrow"></span>

                                <div className="dropdown-content">
                                    <div className="profile-links">
                                        <a onClick={()=>{
                                            profileClickEvent("profile");
                                        }} className="profile-item d-flex flex-middle">
                                            <AccountBox/>
                                            <span>{GetName()}</span>
                                        </a>
                                        <div className={"line"}></div>
                                        <a onClick={handleLogout}
                                           className="profile-item d-flex flex-middle">
                                            <Logout/>
                                            <span>Logout</span>
                                        </a>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div> : <>
                        {showSearchIcon && <div className="righticons d-flex flex-end flex-middle">
                            <input onChange={doSearch} className="search expandright" id="searchright"
                                   type="search"
                                   name="q" placeholder="Search"/>
                            <label className="" htmlFor="searchright">
                                <SearchIcon onClick={clickSearch} fontSize={"large"}
                                            className={"icon button searchbutton"}/>
                            </label>
                        </div>}
                        <SigninButton>Sign In</SigninButton>

                    </>}

                </div>
            </div>
        </div>
        <div className={'nav-for-mobile-view'}>
            <div className="topnav">
                <Link onClick={emptySearch} className={'active'} to={"/"}><Logo/></Link>
                <div id="myLinks">
                    <Link to="/watched/contents"><span>Watched List</span></Link>
                    <Link to="/wishlist/contents"><span>Wished List</span></Link>
                    {login ? <>
                        <Link to="/advance-search"><span>Search</span></Link>
                        <Link to={"/#"} style={{backgroundColor: "#e50914"}} onClick={handleLogout}
                           className="profile-item d-flex flex-middle">
                            <span>Logout</span>
                        </Link>
                    </> : <SigninButton>Sign In</SigninButton>}


                </div>
                <a className="icon" onClick={menuButtonClick}>
                    <FontAwesomeIcon icon={faList}/>
                </a>
            </div>
        </div>
    </>);
}

export default Nav;
