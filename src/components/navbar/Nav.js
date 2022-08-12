import {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./Nav.css";
import {ArrowDropDown, Notifications} from "@mui/icons-material";
import {Link} from "react-router-dom";
import SigninButton from "../Header/SigninButton";
import Logo from "./Logo";

function Nav() {
    const [show, handleShow] = useState(false);
    const [signedIn, handleSignin] = useState(false);

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
        <div className="navbar">
            <div className={`container nav ${show && "nav-black"}`}>
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
                            <SearchIcon className={"icon"}/>
                            <span>Kids</span>
                            <Notifications className={"icon"}/>
                            <img src={`${process.env.PUBLIC_URL}/default_profile.jpeg`} alt=""/>
                            <div className="profile">
                                <ArrowDropDown className={"icon"}/>
                                <div className="options">
                                    <span>Watch List</span>
                                    <span>Settings</span>
                                    <span>Logout</span>
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
