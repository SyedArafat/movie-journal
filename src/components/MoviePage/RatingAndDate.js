import React, {useState} from "react";
import {Authed} from "../../auth/Authentication";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Checkbox} from "@mui/material";

function RatingAndDate({movie, setDate, watched_date}) {
    const [watchedDate, setWatchedDate] = useState(new Date());
    const [isForgot, setIsForgot] = useState(false);
    const handleCheckbox = (event) => {
        setIsForgot(event.target.checked);
        setWatchedDate(null);
        setDate(null);
    }
    return (
        <>
            <div className={"rating-date-wrapper"}>
                <div className="rmdb-rating">
                    <meter min="0" max="100" optimum="100" low="40" high="70"
                           value={movie?.vote_average * 10}></meter>
                    <p className="rmdb-score">{parseFloat(movie?.vote_average).toFixed(2)}</p>
                </div>
                {Authed() && <>
                    <div className={"watch-date"}>
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
                                value={watched_date}
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
        </>
    );
}

export default RatingAndDate;
