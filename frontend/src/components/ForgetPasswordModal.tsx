import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import api from '../api/AxiosConfig.tsx'
import {AxiosError, AxiosResponse} from "axios";
import {ErrorDto} from "../models/ErrorDto.tsx";
import Swal from 'sweetalert2/dist/sweetalert2.js';

const ForgetPasswordModal = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result: any) => {
            if (result.isConfirmed) {
                api.post(`http://localhost:8080/api/auth/forget-password?email=${email}`)
                    .then((response: AxiosResponse) => {
                        if (response.status === 204) {

                            Swal.fire(
                                'Success',
                                'Verification mail has been sent to your mail!',
                                'success'
                            )

                        } else if (response.status === 404) {
                            Swal.fire(
                                'Not Found',
                                'Cannot find email!',
                                'error'
                            )

                        } else {
                            Swal.fire(
                                'Failed',
                                'Some error occurred at server!',
                                'error'
                            )
                        }
                    })
                    .catch((error: AxiosError<ErrorDto>) => {
                        console.log(error)
                        alert("Uncaught error");
                    })
            }
        })

    }
    return (
        <>
            <a href="/forget-password" onClick={handleShow} style={{color: '#863486'}}>Forget password ?</a>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Forget Password</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Control
                            type="email"
                            placeholder="enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>

            </Modal>
        </>
    )
}
export default ForgetPasswordModal