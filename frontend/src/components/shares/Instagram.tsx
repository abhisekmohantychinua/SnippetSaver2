import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import Button from "@mui/material/Button";

const Instagram = (props: any) => {
    const handleRedirectToInstagram = () => {
        const urlToShare = props.name; // Replace with the URL you want to share
        window.open(
            `https://www.instagram.com/?url=${encodeURIComponent(
                urlToShare
            )};src=sdkpreparse`,
            "_blank"
        );
    };

    return (
        <Button
            onClick={handleRedirectToInstagram}
            sx={{color: "rgb(255, 0, 0)"}}
        >
            <InstagramIcon style={{fontSize: '2.5rem'}}/>
        </Button>
    );
};

export default Instagram;
