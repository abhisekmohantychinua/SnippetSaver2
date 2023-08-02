import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";

const WhatsApp = (props: any) => {
    const handleShareToWhatsApp = () => {
        const message = props.name;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        window.location.href = whatsappUrl;
    };

    return (
        <Button onClick={handleShareToWhatsApp} sx={{color: "green"}}>
            <WhatsAppIcon style={{fontSize: '2.5rem'}}/>
        </Button>
    );
};

export default WhatsApp;
