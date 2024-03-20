import Nav from "../components/navbar/Nav";
import {useEffect, useState} from "react";
import {GetApi} from "../api/MediaContentClient";
import Loader from "../components/Loader";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import SignFormWrapper from "../components/SignForm/SignFormWrapper";
import SignFormTitle from "../components/SignForm/SignFormTitle";
import SignFormInput from "../components/SignForm/SignFormInput";
import SignFormButton from "../components/SignForm/SignFormButton";
import SignFormText from "../components/SignForm/SignFormText";
import SignFormCaptcha from "../components/SignForm/SignFormCaptcha";
import FooterCompound from "../compounds/FooterCompound";

function Profile() {
    const [profile, setProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [, setName] = useState("");
    const [, setEmailAddress] = useState("");
    useEffect(() => {
        GetApi("api/auth/user").then((response) => {
            setProfile(response?.data);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.log(error);
        })
    }, [profile]);
    return (
        <div>
            <Nav showSearchIcon={false} dynamicClass={"single-page-nav"}/>
            <Loader loading={loading}/>
            {
                profile && <div>
                    <HeaderWrapper className="header-wrapper-home"
                                   style={{
                                       backgroundImage: `url("${process.env.PUBLIC_URL}/images/misc/home-bg.jpg")`,
                                   }}
                    >
                        <NavBar className="navbar-signin">
                        </NavBar>
                        <Loader loading={loading}/>
                        <SignFormWrapper>
                            {/*<SignFormBase onSubmit={handleSubmit} method="POST">*/}
                            <SignFormTitle style={{textAlign: 'center'}}>User Details</SignFormTitle>
                            {/*{error ? <SignFormError>{error}</SignFormError> : null}*/}
                            {/*{success ? <SignFormSuccess /> : null}*/}
                            <SignFormInput
                                type="text"
                                placeholder="Name"
                                value={profile.name}
                                onChange={({target}) => setName(target.value)}
                            />
                            <SignFormInput
                                type="text"
                                placeholder="Email Address"
                                value={profile.email}
                                onChange={({target}) => setEmailAddress(target.value)}
                            />
                            <SignFormButton disabled={false}>Update Password</SignFormButton>
                            <SignFormText>
                            </SignFormText>
                            <SignFormCaptcha>
                                This page is protected by Google reCAPTCHA to ensure you are not a
                                bot.
                            </SignFormCaptcha>
                            {/*</SignFormBase>*/}
                        </SignFormWrapper>
                    </HeaderWrapper>
                    <FooterCompound/>
                </div>

            }
        </div>
    );
}

export default Profile;