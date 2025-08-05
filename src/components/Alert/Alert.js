import React, { useEffect, useState } from "react";
import "./AlertMessage.css";

function AlertMessage({ type = "error", message, onClose, duration = 4000 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 250); // allow fade out
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`alert-message ${type} ${visible ? "show" : "hide"}`}>
            <span className="alert-text">{message}</span>
            <button
                className="close-btn"
                aria-label="Close alert"
                onClick={() => {
                    setVisible(false);
                    setTimeout(onClose, 250);
                }}
            >
                &#x2715;
            </button>
        </div>
    );
}

export default AlertMessage;
