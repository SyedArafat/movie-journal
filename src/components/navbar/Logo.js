import {Link} from "react-router-dom";

function Logo() {
    return (
        <Link to={"/"}>
            <img className={"header-logo"} src={`${process.env.PUBLIC_URL}/net.png`} alt="Netflix logo"/>
        </Link>
    );
}

export default Logo;
