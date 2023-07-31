import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Carousel, Container, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import api from "../api/AxiosConfig.tsx";
import {UserRequestDto} from "../models/dto/user/UserRequestDto.tsx";
import {AxiosError, AxiosResponse} from "axios";
import {UserResponseDto} from "../models/dto/user/UserResponseDto.tsx";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ErrorDto} from "../models/ErrorDto.tsx";

const CreateAccount = () => {
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
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget;
        // @ts-ignore
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        if (typeof token === 'string') {
            const credentials: UserRequestDto = {
                firstname: firstname,
                lastname: lastname
            }
            await api.post(`/api/auth/verify/${token}`, credentials)
                .then((response: AxiosResponse<UserResponseDto>) => {
                    response.data
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Account Created successfully.",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                })
                .catch((error: AxiosError<ErrorDto>) => {
                    if (error.response?.data.message === "The token provided is malformed or doesn't exist.") {
                        Swal.fire({
                            position: "top-center",
                            icon: "error",
                            title: "The token provided in URL is malformed or doesn't exist.",
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
                                              placeholder='Firstname'
                                              style={styles.input}
                                              className='text-center'
                                              value={firstname}
                                              onChange={(e) => setFirstname(e.target.value)}
                                              required/>
                                <Form.Label style={styles.label}>First Name</Form.Label>
                                <Form.Control.Feedback>Great</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please enter your Lastname</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='form-floating mb-3 '>

                                <Form.Control type='text'
                                              placeholder='Lastname'
                                              style={styles.input}
                                              className='text-center'
                                              value={lastname}
                                              onChange={(e) => setLastname(e.target.value)}
                                              required/>
                                <Form.Label style={styles.label}>Last Name</Form.Label>
                                <Form.Control.Feedback>Great</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please enter your Lastname</Form.Control.Feedback>
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

export default CreateAccount