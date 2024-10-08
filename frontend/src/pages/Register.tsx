// import React from "react";
import {Alert, Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {FiMail} from "react-icons/fi";
import {RiLockPasswordLine} from "react-icons/ri";
import * as yup from 'yup';
import {Formik} from 'formik';
import api from '../api/AxiosConfig.tsx'
import {useEffect, useState} from "react";
import {Alert as CustomAlert} from "../models/Alert.tsx";
import {AuthRequest} from "../models/dto/auth/AuthRequest.tsx";
import {AxiosError, AxiosResponse} from "axios";

interface Prop {
    setMode: React.Dispatch<React.SetStateAction<boolean>>
}

const Register = ({setMode}: Prop) => {
    useEffect(() => {
        sessionStorage.clear()
    }, [])
    const styles = {
        label: {
            fontSize: '1.7rem',
            fontWeight: 'bold',
            color: '#28a745'
        },
        input: {
            border: 'none',
            borderBottom: '2px solid #28a745',
            borderRadius: '0px',
            backgroundColor: 'transparent',
            fontSize: '1.2rem',
            padding: '0.5rem',
        }
    };
    const schema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            .required("Please enter your email"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .matches(/^(?=.*[A-Za-z])(?=.*\d.*\d.*\d.*\d)[A-Za-z\d]{8,}$/, "Password must include at least 4 numbers")
            .required("Please enter your password")
    });
    const [customAlert, setCustomAlert] = useState<CustomAlert>()
    const [show, setShow] = useState<boolean>(false)


    const handleSubmit = async (values:any, {setSubmitting}:any) => {
        try {
            show
            setSubmitting(true);
            const credentials: AuthRequest = {
                email: values.email,
                password: values.password
            }
            await api.post("/api/auth/register", credentials)
                .then((response: AxiosResponse<string>) => {
                    const data = response.data
                    if (data === 'Successfully added your register request. Now verify your email!!!') {
                        setCustomAlert({
                            message: data,
                            show: true,
                            variant: 'success',
                            link: "https://mail.google.com/mail",
                            linkText: "Go to Gmail !"
                        })
                        setShow(true)
                    }
                }).catch((error: AxiosError) => {
                    const data = error.message
                    setCustomAlert({
                        message: data,
                        show: true,
                        variant: 'danger',
                        link: undefined,
                        linkText: undefined
                    })
                    setShow(true)
                })
            setSubmitting(false);
        } catch (error:any) {
            if (error.message === "Network Error") {
                setCustomAlert({
                    message: "Can't connect to server !!! Try Again after sometimes.",
                    show: true,
                    variant: 'danger',
                    link: "http://localhost:3000/",
                    linkText: "Home"
                })
                setShow(true)
            } else {
                console.log(error)
                alert("Uncaught error");
            }
        }
    };

    // @ts-ignore
    return (
        <>
            <Row className="col-6 mx-auto px-0 mt-5 d-flex bg-white border border-2 rounded-2">
                <Col lg={4} className="text-center py-3 border-end border-3 border-dark-subtle">
                    <img
                        className="img-fluid mb-5"
                        src="/Logo.png"
                        alt="logo"
                    />
                    <h1 className="fw-bolder text-success" style={{fontSize: '3.2rem'}}>Register</h1>
                </Col>
                <Col>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        validateOnChange={true}
                    >
                        {({handleSubmit, handleChange, values, touched, errors, isSubmitting}) => (
                            <>
                                {customAlert && customAlert.show && (
                                    <Alert
                                        variant={customAlert.variant}
                                        className="text-center"
                                        onClose={() => setShow(false)}
                                        dismissible>
                                        {customAlert.message}
                                        {customAlert.link ? (<Alert.Link
                                            href={customAlert.link}>{customAlert.linkText}</Alert.Link>) : null}
                                    </Alert>
                                )}
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group as={Row} className="my-5" controlId="formHorizontalEmail">
                                        <Form.Label column sm={2} className="text-center" style={styles.label}>
                                            <FiMail/>
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="example@gmail.com"
                                                className="text-center"
                                                style={styles.input}
                                                value={values.email}
                                                onChange={handleChange}
                                                isInvalid={touched.email && !!errors.email}
                                                autoComplete="off"
                                                required
                                            />
                                            <Form.Control.Feedback>Great</Form.Control.Feedback>
                                            <Form.Control.Feedback
                                                type="invalid">{errors.email}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="my-5" controlId="formHorizontalPassword">
                                        <Form.Label column sm={2} className="text-center" style={styles.label}>
                                            <RiLockPasswordLine/>
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="***********"
                                                className="text-center"
                                                style={styles.input}
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={touched.password && !!errors.password}
                                                required
                                            />
                                            <Form.Control.Feedback>Great</Form.Control.Feedback>
                                            <Form.Control.Feedback
                                                type="invalid">{errors.password}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Row className="d-flex justify-content-around mt-5">
                                        <Button
                                            className="col-4 mx-3"
                                            variant="success"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Spinner animation="border" role="status" size="sm">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </Spinner>{' '}
                                                    Loading...
                                                </>
                                            ) : (
                                                'Submit'
                                            )}
                                        </Button>
                                        <Button
                                            className="col-4 mx-2 fw-semibold btn-purple-outline"
                                            onClick={() => setMode(true)}
                                        >
                                            Login
                                        </Button>
                                    </Row>
                                </Form>
                            </>
                        )}
                    </Formik>
                </Col>
            </Row>
        </>
    );
};

export default Register;
