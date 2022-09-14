import React, {useState} from 'react';
import '../banner/Banner.css';
import './Review.css';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    BACKDROP_SIZE,
    BACKEND_MEDIA_CONTENT_API,
    IMAGE_BASE_URL
} from "../../config/config";
import {contentTitle, getMediaType} from "../../helpers";
import MovieKeyData from "../Movies/MovieKeyData";
import api from "../../api/BackendApi";
import {Authed, GetToken} from "../../auth/Authentication";
import TextField from "@mui/material/TextField";


function ReviewModal({movie, handleAlertOpen, storedRating, storedDate, setLoading, setIsUpdated, storedReview, setReview, setUserComment, handleClose}) {
    const [comment, setComment] = useState(storedReview);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    // const [isForgot, setIsForgot] = useState(false);

    let reviewClickEvent = async () => {
        if (comment.length <= 30) {
            alert("Comment is too short. Add some more information");
            return false;
        }
        setLoading(true);

        let data = {
            "content": JSON.stringify(movie),
            "type": getMediaType(movie),
            "store_type": "watched",
            "rating": storedRating,
            "watched_date": storedDate,
            "comment": comment
        }
        await storeChoice(data);
        setLoading(false);
        setComment(comment);
        setReview(comment);
        handleClose();
        setUserComment(comment);
        handleAlertOpen("Comment Successful");
    }

    const _handleText = (event) => {
        setComment(event.target.value);
        // console.log(event.target.value);
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
                {/*<div style={{ display: "flex", marginTop: "30px", position: "relative", left: "28%" }}>*/}
                {/*    {Authed() && <>*/}
                {/*    <div style={{ marginLeft: 0}} className={"watch-date"}>*/}
                {/*        <LocalizationProvider dateAdapter={AdapterMoment}>*/}
                {/*            {isForgot && <DesktopDatePicker*/}
                {/*                sx={{color: "white"}}*/}
                {/*                label="Watched Heretofore"*/}
                {/*                value={null}*/}
                {/*                // maxDate={new Date()}*/}
                {/*                // minDate={dayjs('2017-01-01')}*/}
                {/*                onChange={(newValue) => {*/}
                {/*                    setWatchedDate(newValue);*/}
                {/*                }}*/}
                {/*                disabled={true}*/}
                {/*                hintStyle={{color: 'white'}}*/}
                {/*                renderInput={(params) => <TextField sx={{*/}
                {/*                    '.MuiInputBase-input': {color: "#fff"},*/}
                {/*                    '.Mui-disabled': {color: "#989292"},*/}

                {/*                }} {...params} />}*/}
                {/*            />}*/}
                {/*            {!isForgot && <DesktopDatePicker*/}
                {/*                label="Watched At"*/}
                {/*                value={new Date(storedDate)}*/}
                {/*                onChange={(newValue) => {*/}
                {/*                    setWatchedDate(newValue);*/}
                {/*                    setDate(newValue);*/}
                {/*                }}*/}
                {/*                disableFuture={true}*/}
                {/*                // disabled={true}*/}
                {/*                // hintStyle={{color: 'white'}}*/}
                {/*                renderInput={(params) => <TextField sx={{*/}
                {/*                    '.MuiInputBase-input': {color: "#fff"},*/}
                {/*                    '.Mui-disabled': {color: "#989292"},*/}

                {/*                }} {...params} />}*/}
                {/*            />}*/}
                {/*        </LocalizationProvider>*/}
                {/*    </div>*/}
                {/*    <FormControlLabel style={{marginLeft: "10px"}} control={<Checkbox onChange={handleCheckbox} sx={{color: "aliceblue"}}/>} label="Forgot"/>*/}
                {/*</>}*/}
                {/*</div>*/}

                {/*{Authed() && <MovieRating storedRating={storedRating} isWatched={false} setRating={setRating}/>}*/}
                </div>
                <TextField
                    fullWidth={true}
                    id="filled-multiline-static"
                    label="Write a Review"
                    defaultValue={comment}
                    multiline
                    rows={4}
                    placeholder="Write a review"
                    bgcolor={"white"}
                    variant="filled"
                    onChange={_handleText}
                    sx={{color: "white"}}
                />

                <div className="modal-banner-buttons">
                    {Authed() &&
                        <button onClick={reviewClickEvent} className="banner-button positive-button"><FontAwesomeIcon
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
