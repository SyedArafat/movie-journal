import React, {useState, useEffect} from 'react';
import '../banner/Banner.css';
import './Review.css';
import {faMinusCircle, faPlayCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import MovieRating from "../Movies/MovieRating";
import {
    BACKDROP_SIZE, BACKEND_IS_WATCHED_URI,
    BACKEND_MEDIA_CONTENT_API, BACKEND_MEDIA_REMOVE_API,
    IMAGE_BASE_URL
} from "../../config/config";
import {contentTitle, getMediaType, trimmedOverview} from "../../helpers";
import MovieKeyData from "../Movies/MovieKeyData";
import api from "../../api/BackendApi";
import {Authed, GetToken} from "../../auth/Authentication";
import RatingAndDate from "../MoviePage/RatingAndDate";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Checkbox} from "@mui/material";


function ReviewModal({movie, storedRating, storedDate, setLoading, setIsUpdated, from}) {
    const [rating, setRating] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [date, setDate] = useState(null);
    const [watchedDate, setWatchedDate] = useState(new Date());
    const [isForgot, setIsForgot] = useState(false);
    // const [isForgot, setIsForgot] = useState(false);
    const handleCheckbox = (event) => {
        setIsForgot(event.target.checked);
        setWatchedDate(null);
        setDate(null);
    }

    let navigate = useNavigate();

    let watchClickEvent = async () => {
        if (!rating) {
            alert("Rating is missing");
            return false;
        }
        setLoading(true);

        let data = {
            "content": JSON.stringify(movie),
            "type": getMediaType(movie),
            "store_type": "watched",
            "rating": rating,
            "watched_date": date
        }
        await storeChoice(data);
        setLoading(false);
        // setWatched(true);
        // window.location.reload();
    }

    const storeChoice = async (data) => {
        try {
            await api.post(`${BACKEND_MEDIA_CONTENT_API}`, data, {
                "headers": {
                    "Authorization": `Bearer ${GetToken()}`
                }
            });
            setSuccess(true);
            setError("");
        } catch (err) {
            setSuccess(false);
            if (!err?.response) {
                setError("No Server Response");
            } else if (err.response?.status === 400) {
                setError("Invalid Input Data");
            } else {
                setError("Something Went Wrong! Try again Later");
            }
        }
    }

    return (
        <header className="review-modal-banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: movie.backdrop_path ? `url("${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie?.backdrop_path}")` : "#000",
                    backgroundPosition: "center center",
                    outline: "none"
                }}
        >

            <div className="model-banner-contents">
                <div style={{ textAlign: "center"}}>
                <div className="banner-title">
                    {contentTitle(movie)}
                </div>
                <MovieKeyData movie={movie}/>
                <div style={{ display: "flex", marginTop: "30px", position: "relative", left: "28%" }}>
                    {Authed() && <>
                    <div style={{ marginLeft: 0}} className={"watch-date"}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            {isForgot && <DesktopDatePicker
                                sx={{color: "white"}}
                                label="Watched Heretofore"
                                value={null}
                                // maxDate={new Date()}
                                // minDate={dayjs('2017-01-01')}
                                onChange={(newValue) => {
                                    setWatchedDate(newValue);
                                }}
                                disabled={true}
                                hintStyle={{color: 'white'}}
                                renderInput={(params) => <TextField sx={{
                                    '.MuiInputBase-input': {color: "#fff"},
                                    '.Mui-disabled': {color: "#989292"},

                                }} {...params} />}
                            />}
                            {!isForgot && <DesktopDatePicker
                                label="Watched At"
                                value={new Date(storedDate)}
                                onChange={(newValue) => {
                                    setWatchedDate(newValue);
                                    setDate(newValue);
                                }}
                                disableFuture={true}
                                // disabled={true}
                                // hintStyle={{color: 'white'}}

                                renderInput={(params) => <TextField sx={{
                                    '.MuiInputBase-input': {color: "#fff"},
                                    '.Mui-disabled': {color: "#989292"},

                                }} {...params} />}
                            />}
                        </LocalizationProvider>
                    </div>
                    <FormControlLabel style={{marginLeft: "10px"}} control={<Checkbox onChange={handleCheckbox} sx={{color: "aliceblue"}}/>} label="Forgot"/>
                </>}
                </div>

                {Authed() && <MovieRating storedRating={storedRating} isWatched={false} setRating={setRating}/>}
                </div>
                <TextField
                    fullWidth={true}
                    id="filled-multiline-static"
                    label="Write a Review"
                    multiline
                    rows={4}
                    placeholder="Write a review"
                    bgcolor={"white"}
                    variant="filled"
                    sx={{color: "white"}}
                />

                <div className="modal-banner-buttons">
                    {Authed() &&
                        <button onClick={watchClickEvent} className="banner-button positive-button"><FontAwesomeIcon
                            icon={faPlayCircle}/> {"\u00a0\u00a0"}
                            Submit
                        </button>}
                </div>

            </div>

            <div className="banner-fadeBottom"></div>
        </header>
    )
}

export default ReviewModal;
