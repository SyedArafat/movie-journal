import React, { useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import FooterCompound from "../compounds/FooterCompound";
import SignFormWrapper from "../components/SignForm/SignFormWrapper";
import SignFormBase from "../components/SignForm/SignFormBase";
import SignFormTitle from "../components/SignForm/SignFormTitle";
import SignFormInput from "../components/SignForm/SignFormInput";
import SignFormButton from "../components/SignForm/SignFormButton";
import SignFormText from "../components/SignForm/SignFormText";
import SignFormLink from "../components/SignForm/SignFormLink";
import SignFormCaptcha from "../components/SignForm/SignFormCaptcha";
import SignFormError from "../components/SignForm/SignFormError";
import Logo from "../components/navbar/Logo";
import api from "../api/BackendApi";
import {BACKEND_LOGIN_URI} from "../config/config";
import Loader from "../components/Loader";
import {SetToken} from "../auth/Authentication";

function SigninPage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const IsInvalid = password === "" || emailAddress === "";

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        let data = {
            "email": emailAddress,
            "password": password
        };
        try {
            let response = await api.post(`${BACKEND_LOGIN_URI}`, data);
            const accessToken = response?.data?.access_token;
            const name =  response?.data?.name;
            const expiresAt =  response?.data?.expires_at;
            setPassword("");
            setEmailAddress("");
            setError("");
            SetToken(accessToken, name, expiresAt);
            navigate(state?.path || "/");
        } catch (err) {
            console.log(err);
            if(!err?.response) {
                setError("No Server Response");
            } else if(err.response?.status === 400) {
                setError("Invalid Input Data");
            } else if(err.response?.status === 401) {
                setError("Invalid Email or Password");
            } else {
                setError("Something Went Wrong! Try again Latter");
            }

        }
        setLoading(false);

    }

    return (
        <>
            <HeaderWrapper className="header-wrapper-home"
                style = {{
                    backgroundImage: `url("${process.env.PUBLIC_URL}/images/misc/home-bg.jpg")`,
                }}
            >
                <Loader loading={loading} />
                <NavBar className="navbar-signin">
                    <Logo />
                </NavBar>
                <SignFormWrapper>
                    <SignFormBase onSubmit={handleSubmit} method="POST">
                        <SignFormTitle>Sign In</SignFormTitle>
                        {error ? <SignFormError>{error}</SignFormError> : null}
                        <SignFormInput
                            type="text"
                            placeholder="Email Address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                        />
                        <SignFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <SignFormButton disabled={IsInvalid}>Sign In</SignFormButton>
                        <SignFormText>
                            New to Netflix?
                            <SignFormLink href="/signup">Sign up now.</SignFormLink>
                        </SignFormText>
                        <SignFormCaptcha>
                            This page is protected by Google reCAPTCHA to ensure you are not a
                            bot.
                        </SignFormCaptcha>
                    </SignFormBase>
                </SignFormWrapper>
            </HeaderWrapper>
            <FooterCompound />
        </>
    );
}

export default SigninPage;
