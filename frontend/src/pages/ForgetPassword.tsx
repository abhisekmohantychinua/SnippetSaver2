import {Button, Card, Carousel, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import api from "../api/AxiosConfig.tsx";
import {AxiosError, AxiosResponse} from "axios/index";
import {ErrorDto} from "../models/ErrorDto.tsx";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ChangePassword} from "../models/dto/auth/ChangePassword.tsx";

const ForgetPassword = () => {
    const styles = {
        label: {
            color: '#28a745'
        },
        input: {
            border: 'none',
            borderBottom: '2px solid #28a745',
            borderRadius: '0px',
            fontSize: '1.2rem',
            padding: '0.5rem',
        }
    }
    const {token} = useParams()
    const [validated, setValidated] = useState<boolean>(false);
    const [password, setPassword] = useState('')
    const [re_password, setRe_Password] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget;
        // @ts-ignore
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        if (typeof token === 'string') {
            const credentials: ChangePassword = {
                newPassword: password,
                re_Password: re_password
            }
            await api.post(`http://localhost:8080/api/auth/new-password?verificationToken=${token}`, credentials)
                .then((response: AxiosResponse) => {
                    if (response.status === 204) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Password reset successfully !",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    } else {
                        Swal.fire({
                            position: "top-center",
                            icon: "error",
                            title: "Some error occurred !",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    }


                }).catch((error: AxiosError<ErrorDto>) => {
                    if (error.response?.data.message === "The token provided is malformed or doesn't exist.") {
                        Swal.fire({
                            position: "top-center",
                            icon: "error",
                            title: "The token provided in URL is malformed or doesn't exist.",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    } else {
                        console.log(error)
                        Swal.fire({
                            position: "top-center",
                            icon: "error",
                            title: "${error.response?.data.message}",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    }

                })
            navigate('/')
        }
    }
    return (
        <>
            <Container className="position-absolute mt-5 col-md-6 offset-md-3">
                <Card className="border border-2">
                    <Card.Header
                        className='h1 text-center text-white border border-bottom border-2 bg-gradient-custom bg-opacity-25'>Enter
                        your details !</Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className='form-floating mb-3'>

                                <Form.Control type='text'
                                              placeholder='Enter new password'
                                              style={styles.input}
                                              className='text-center'
                                              value={password}
                                              onChange={(e) => setPassword(e.target.value)}
                                              required/>
                                <Form.Label style={styles.label}>Enter new password</Form.Label>
                                <Form.Control.Feedback>Great</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please enter your new
                                    password</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='form-floating mb-3 '>

                                <Form.Control type='password'
                                              placeholder='Re enter your password'
                                              style={styles.input}
                                              className='text-center'
                                              value={re_password}
                                              onChange={(e) => setRe_Password(e.target.value)}
                                              required/>
                                <Form.Label style={styles.label}>Re enter your password</Form.Label>
                                <Form.Control.Feedback>Great</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please Re-enter your
                                    password</Form.Control.Feedback>
                            </Form.Group>
                            <Row className="d-flex justify-content-center mt-5">
                                <Button className="col-4 mx-3"
                                        variant="success"
                                        as="input"
                                        type="submit"
                                        value="Submit"/>{' '}
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Carousel className="z-n1">
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block vw-100 vh-100 overflow-hidden"
                        src="/carousal1.png"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block vw-100 vh-100 overflow-hidden"
                        src="/carousal2.png"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block vw-100 vh-100 overflow-hidden"
                        src="/carousal3.png"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )

}
export default ForgetPassword