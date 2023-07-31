import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {AppUtil} from "../utils/AppUtil.tsx";

const style = {
    borderRadius: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const postlink = window.location.href

    const copyContent = () => {
        AppUtil.copyToClipBoard(postlink);
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <ShareIcon/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{disply: "flex"}}>
                        <input
                            type="text"
                            style={{
                                margin: "10px",
                                width: "auto",
                                height: "35px",
                                borderRadius: "25px"
                            }}
                            value={postlink}
                        />
                        <ContentCopyIcon onClick={copyContent}/>
                    </div>
                    <div style={{display: "flex"}}>
                        <Button href="https://twitter.com/home">
                            <WhatsAppIcon sx={{padding: "15px"}}/>
                        </Button>
                        <Button href="https://twitter.com/home">
                            <TwitterIcon sx={{padding: "20px"}}/>
                        </Button>
                        <Button href="https://twitter.com/home">
                            <FacebookIcon sx={{padding: "20px"}}/>
                        </Button>
                        <Button href={`https://twitter.com/home`}>
                            <LinkedInIcon sx={{padding: "20px"}}/>
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
