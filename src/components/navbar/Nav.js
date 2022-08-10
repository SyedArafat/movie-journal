import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./Nav.css";
import {ArrowDropDown, Notifications} from "@mui/icons-material";

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
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
                        <img src={`${process.env.PUBLIC_URL}/net.png`}  alt="" />
                        <span>Homepage</span>
                        <span>Movies</span>
                        <span>TV Shows</span>
                        <span>History</span>
                        <span>My List</span>
                    </div>

                    <div className="right">
                        <SearchIcon className={"icon"} />
                        <span>Kids</span>
                        <Notifications className={"icon"} />
                        <img src={`${process.env.PUBLIC_URL}/default_profile.jpeg`}  alt="" />
                        <div className="profile">
                            <ArrowDropDown className={"icon"} />
                            <div className="options">
                                <span>Watch List</span>
                                <span>Settings</span>
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Nav;
