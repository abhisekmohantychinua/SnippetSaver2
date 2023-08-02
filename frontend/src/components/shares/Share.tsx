import * as React from "react";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import {Container, Form, Modal} from "react-bootstrap";
import WhatsApp from "./WhatsApp.tsx";
import Facebook from "./Facebook.tsx";
import LinkedIn from "./LinkedIn.tsx";
import Instagram from "./Instagram.tsx";
import CopyToClipBoard from "./CopyToClipBoard.tsx";

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

interface Prop {
    link: string,
    desc: string
}

export default function BasicModal({link, desc}: Prop) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const postLink: string = link

    return (
        <div>
            <Button onClick={handleOpen} sx={{color: "black"}}>
                <ShareIcon/>
            </Button>
            <Modal show={open} onHide={handleClose} centered className="text-center">
                <Modal.Header closeButton>
                    <Modal.Title>Share</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex">
                    <Form.Control type="text" value={link} readOnly className="rounded-pill me-3"/>
                    <CopyToClipBoard name={postLink}/>
                </Modal.Body>
                <Container className="my-2">
                    <WhatsApp name={postLink} desc={desc}/>
                    <Facebook name={postLink} desc={desc}/>
                    <LinkedIn name={postLink} desc={desc}/>
                    <Instagram name={postLink} desc={desc}/>
                </Container>
            </Modal>
        </div>
    );
}
