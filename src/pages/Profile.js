import Nav from "../components/navbar/Nav";
import React, { useEffect, useState } from "react";
import { GetApi } from "../api/MediaContentClient";
import Loader from "../components/Loader";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import SignFormWrapper from "../components/SignForm/SignFormWrapper";
import SignFormTitle from "../components/SignForm/SignFormTitle";
import SignFormButton from "../components/SignForm/SignFormButton";
import SignFormText from "../components/SignForm/SignFormText";
import SignFormCaptcha from "../components/SignForm/SignFormCaptcha";
import FooterCompound from "../compounds/FooterCompound";
import Alert from "../components/Alert/Alert";
import {useNavigate} from "react-router-dom";
import {DeleteToken} from "../auth/Authentication";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        GetApi("api/auth/user")
            .then((response) => {
                const data = response?.data;
                setProfile(data);
                setName(data.name || "");
                setEmailAddress(data.email || "");
                setPhone(data.phone || "");
                setDob(data.dob || "");
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status === 401) {
                    DeleteToken();
                    navigate("/signin");
                } else {
                    setAlert({
                        type: "error",
                        message: "Oops! Something went wrong. Please try again."
                    });
                }
            });
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        alert("Profile updated!");
        setEditMode(false);
    };

    return (
        <div>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <Nav showSearchIcon={false} dynamicClass={"single-page-nav"} />
            <Loader loading={loading} />

            {profile && (
                <div>
                    <HeaderWrapper
                        className="header-wrapper-home"
                        style={{
                            backgroundImage: `url("${process.env.PUBLIC_URL}/images/misc/home-bg.jpg")`,
                        }}
                    >
                        <NavBar className="navbar-profile" />

                        <SignFormWrapper style={{
                            maxWidth: "500px",
                            margin: "0 auto",
                            // backgroundColor: "rgba(255,255,255,0.9)",
                            padding: "2rem",
                            borderRadius: "1rem",
                            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                        }}>
                            <SignFormTitle style={{ textAlign: "center", marginBottom: "1em" }}>
                                My Profile
                            </SignFormTitle>

                            <div style={{ textAlign: "center", marginBottom: "1em" }}>
                                <img
                                    src={profile.avatar || `${process.env.PUBLIC_URL}/images/user-profile-svgrepo-com.svg`}
                                    alt="User Avatar"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "2px solid #ccc",
                                    }}
                                />
                            </div>

                            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Name:</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={({ target }) => setName(target.value)}
                                        disabled={!editMode}
                                        style={inputStyle(editMode)}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Email:</label>
                                    <input
                                        type="email"
                                        value={emailAddress}
                                        onChange={({ target }) => setEmailAddress(target.value)}
                                        disabled={!editMode}
                                        style={inputStyle(editMode)}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Phone:</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={({ target }) => setPhone(target.value)}
                                        disabled={!editMode}
                                        style={inputStyle(editMode)}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Date of Birth:</label>
                                    <input
                                        type="date"
                                        value={dob}
                                        onChange={({ target }) => setDob(target.value)}
                                        disabled={!editMode}
                                        style={inputStyle(editMode)}
                                    />
                                </div>

                                {editMode ? (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: '1rem',
                                        marginTop: '1rem'
                                    }}>
                                        <SignFormButton type="submit" style={{ flex: 1 }}>
                                            Save Changes
                                        </SignFormButton>
                                        <SignFormButton
                                            type="button"
                                            onClick={() => {
                                                setEditMode(false);
                                                // Reset to original profile values
                                                setName(profile.name || "");
                                                setEmailAddress(profile.email || "");
                                                setPhone(profile.phone || "");
                                                setDob(profile.dob || "");
                                            }}
                                            style={{
                                                backgroundColor: '#888',
                                                flex: 1
                                            }}
                                        >
                                            Cancel
                                        </SignFormButton>
                                    </div>
                                ) : (
                                    <SignFormButton type="button" onClick={() => setEditMode(true)}>
                                        Edit Profile
                                    </SignFormButton>
                                )}


                            </form>

                            <SignFormText style={{ marginTop: "1em", fontSize: "0.9em", color: "#444" }}>
                                You can update your personal info above.
                            </SignFormText>

                            <SignFormCaptcha>
                                This page is protected by Google reCAPTCHA to ensure you're not a bot.
                            </SignFormCaptcha>
                        </SignFormWrapper>

                    </HeaderWrapper>

                    <FooterCompound />
                </div>
            )}
        </div>
    );
}

export default Profile;

// ========== Style Helpers ==========

const labelStyle = {
    fontWeight: "bold",
    fontSize: "0.95rem",
    marginBottom: "0.3rem",
    display: "block",
};

const inputStyle = (editable) => ({
    width: "100%",
    padding: "10px 12px",
    border: "1px solid",
    borderColor: editable ? "#ccc" : "#ddd",
    borderRadius: "8px",
    backgroundColor: editable ? "#fff" : "#f6f6f6",
    color: "#000",
    cursor: editable ? "text" : "not-allowed",
    transition: "all 0.3s ease",
    outline: "none",
    ...(editable
        ? {
            boxShadow: "0 0 3px rgba(0,0,0,0.1)",
        }
        : {
            ':hover': {
                borderColor: '#ccc'
            }
        }),
});


