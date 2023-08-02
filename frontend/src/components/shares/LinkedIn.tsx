import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Button from "@mui/material/Button";

const LinkedIn = (props: any) => {
    const handleShareToLinkedIn = () => {
        const message = props.name;
        const encodedMessage = encodeURIComponent(message);
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedMessage}`;
        window.open(linkedinUrl, "_blank");
    };

    return (
        <Button onClick={handleShareToLinkedIn} sx={{color: "blue"}}>
            <LinkedInIcon style={{fontSize: '2.5rem'}}/>
        </Button>
    );
};

export default LinkedIn;
