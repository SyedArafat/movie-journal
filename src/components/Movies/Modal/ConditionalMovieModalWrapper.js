import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MovieModal from "./MovieModal";
import CardFeatureClose from "../CardFeatureClose";
import React from "react";

function ConditionalMovieModalWrapper({modalOpen, onClose, activeItem, isTV}) {
    const handleClose = () => {
        onClose(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        bgcolor: 'black',
    };

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box id="modal-modal-description" sx={style}>
                    <MovieModal props={activeItem} isTv={isTV}/>
                    <CardFeatureClose onClick={handleClose}/>
                </Box>
            </Modal>
        </div>
    );
}

export default ConditionalMovieModalWrapper;
