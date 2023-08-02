import FacebookIcon from "@mui/icons-material/Facebook";
import Button from "@mui/material/Button";

const Facebook = (props: any) => {
    const handleShareToFacebook = () => {
        const message = props.name;
        const encodedMessage = encodeURIComponent(message);
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedMessage};src=sdkpreparse`;
        window.open(facebookUrl, "_blank");
    };

    return (
        <Button onClick={handleShareToFacebook} sx={{color: "light-blue"}}>
            <FacebookIcon style={{fontSize: '2.5rem'}}/>
        </Button>
    );
};

export default Facebook;
