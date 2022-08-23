import React from "react";
import "./SignFormStyles.css";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";

function SignFormSuccess({ children, ...restProps }) {
    return (
        <div  className="sign-form-success">
            Registration Successful! <Link to={"/signin"}>Sign In</Link> to use the App
        </div>
    );
}

export default SignFormSuccess;
