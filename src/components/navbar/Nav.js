import { useEffect, useState } from "react";
import "./Nav.css";

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
            <div className="container">
                <div className="left">
                    <img src={`${process.env.PUBLIC_URL}/net.png`}  alt=""></img>
                    <span>Homepage</span>
                    <span>Movies</span>
                    <span>TV Shows</span>
                    <span>History</span>
                    <span>My List</span>
                </div>

                <div className="right">

                </div>
                
                {/* --- Previous Code --- may be it is using login status
                    <div className={`nav ${show && "nav-black"}`}>
                    <img
                    className="nav-logo"
                    src="https://www.gizmochina.com/wp-content/uploads/2020/03/Netflix-Logo.png"
                    alt="Netflix Logo"
                    />

                    <img
                    className="nav-avatar"
                    src="https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60"
                    alt="Netflix Logo"
                    />
                </div> */}
            </div>
        </div>
    );
}

export default Nav;