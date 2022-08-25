import React, {useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
// import { FirebaseContext } from "../context/FirbaseContext";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import Logo from "../components/navbar/Logo";
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
import Warning from "../components/Header/Warning";
import api from "../api/BackendApi";
import data from "bootstrap/js/src/dom/data";
import {BACKEND_REGISTER_URI} from "../config/config";
import SignFormSuccess from "../components/SignForm/SignFormSuccess";
import {Backdrop, CircularProgress} from "@mui/material";
import Loader from "../components/Loader";

function SignupPage() {
    const history = useNavigate();

    // const { firebase } = useContext(FirebaseContext);

    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);


    const IsInvalid = password === "" || emailAddress === "" || name === "" || passwordConfirmation === "" || password !== passwordConfirmation;

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        let data = {
            "name": name,
            "email": emailAddress,
            "password": password,
            "password_confirmation": passwordConfirmation
        };
        try {
            await api.post(`${BACKEND_REGISTER_URI}`, data);
            setSuccess(true);
            setName("");
            setPassword("");
            setPasswordConfirmation("");
            setEmailAddress("");
            setError("");
        } catch (err) {
            setSuccess(false);
            if(!err?.response) {
                setError("No Server Response");
            } else if(err.response?.status === 400) {
                setError("Invalid Input Data");
            } else {
                setError("Something Went Wrong! Try again Latter");
            }

        }

        setLoading(false);
    }

    return (
        <>
            <HeaderWrapper className="header-wrapper-home"
                           style={{
                               backgroundImage: `url("${process.env.PUBLIC_URL}/images/misc/home-bg.jpg")`,
                           }}
            >
                <NavBar className="navbar-signin">
                    <Logo/>
                </NavBar>
                <Loader loading={loading} />
                <SignFormWrapper>
                    <SignFormBase onSubmit={handleSubmit} method="POST">
                        <SignFormTitle>Sign Up</SignFormTitle>
                        {error ? <SignFormError>{error}</SignFormError> : null}
                        {success ? <SignFormSuccess /> : null}
                        <SignFormInput
                            type="text"
                            placeholder="First Name"
                            value={name}
                            onChange={({target}) => setName(target.value)}
                        />
                        <SignFormInput
                            type="text"
                            placeholder="Email Address"
                            value={emailAddress}
                            onChange={({target}) => setEmailAddress(target.value)}
                        />
                        <SignFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            value={password}
                            onChange={({target}) => setPassword(target.value)}
                        />
                        <SignFormInput
                            type="password"
                            placeholder="Password Confirmation"
                            autoComplete="off"
                            value={passwordConfirmation}
                            onChange={({target}) => setPasswordConfirmation(target.value)}
                        />
                        <SignFormButton disabled={IsInvalid}>Sign Up</SignFormButton>
                        <SignFormText>
                            Already a user?
                            <SignFormLink href="/signin">Sign in now.</SignFormLink>
                        </SignFormText>
                        <SignFormCaptcha>
                            This page is protected by Google reCAPTCHA to ensure you are not a
                            bot.
                        </SignFormCaptcha>
                    </SignFormBase>
                </SignFormWrapper>
            </HeaderWrapper>
            <FooterCompound/>
        </>
    );
}

export default SignupPage;
