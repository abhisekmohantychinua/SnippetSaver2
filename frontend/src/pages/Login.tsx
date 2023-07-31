import {Alert, Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {FiMail} from "react-icons/fi";
import {RiLockPasswordLine} from "react-icons/ri";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';
import {Alert as CustomAlert} from '../models/Alert.tsx'
import {AxiosError, AxiosResponse} from "axios";
import {AuthResponse} from "../models/dto/auth/AuthResponse.tsx";
import api from '../api/AxiosConfig.tsx'
import {AuthRequest} from "../models/dto/auth/AuthRequest.tsx";

interface Prop {
    setMode: React.Dispatch<React.SetStateAction<boolean>>
}


const Login = ({setMode}: Prop) => {
    const styles = {
        label: {
            fontSize: '1.7rem',
            fontWeight: 'bold',
            color: '#A437DB'
        },
        input: {
            border: 'none',
            borderBottom: '2px solid #A437DB',
            borderRadius: '0px',
            backgroundColor: 'transparent',
            fontSize: '1.2rem',
            padding: '0.5rem',
        }
    }
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
    const navigate = useNavigate();
    const [customAlert, setCustomAlert] = useState<CustomAlert>()
    const [show, setShow] = useState<boolean>()

    const handleSubmit = async (values, {setSubmitting}) => {
        setCustomAlert(undefined)
        try {
            setSubmitting(true);
            const credentials: AuthRequest = {
                email: values.email,
                password: values.password
            }
            await api.post("/api/auth/login", credentials)
                .then((response: AxiosResponse<AuthResponse>) => {
                    const data: AuthResponse = response.data
                    sessionStorage.setItem("token", data.token)
                    sessionStorage.setItem("userId", data.userId)
                    navigate('/user/dashboard',)
                })
                .catch((error) => {
                    setCustomAlert({
                        message: "Invalid email and password.",
                        show: true,
                        variant: 'danger',
                        link: "http://localhost:3000/login",
                        linkText: "Login"
                    })
                })

        } catch (error) {
            if (error.message === "Network Error") {
                console.log(error)
                setCustomAlert({
                    message: "Can't connect to server !!! Try Again after sometimes.",
                    show: true,
                    variant: 'danger',
                    link: "http://localhost:3000/",
                    linkText: "Home"
                })
                setShow(true)
            } else if (error instanceof AxiosError) {
                setCustomAlert({
                    message: error.message,
                    show: true,
                    variant: 'danger',
                    link: undefined,
                    linkText: undefined
                })
                setShow(true)
            } else if (error.message.startsWith("Request failed with status code 401")) {
                setCustomAlert({
                    message: "Invalid email and password.",
                    show: true,
                    variant: 'danger',
                    link: "http://localhost:3000/login",
                    linkText: "Login"
                })
            } else {
                console.log(error)
                alert("Uncaught error");
            }
        }
    };

    return (
        <>
            <Row className="col-6 mx-auto px-0 mt-5 d-flex bg-white border border-2 rounded-2">
                <Col lg={8} className="border-end border-3 border-dark-subtle">
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
                                            <Form.Control type="email"
                                                          name="email"
                                                          placeholder="example@gmail.com"
                                                          className="text-center"
                                                          style={styles.input}
                                                          value={values.email}
                                                          onChange={handleChange}
                                                          isInvalid={touched.email && !!errors.email}
                                                          required/>
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
                                            <Form.Control type="password"
                                                          name="password"
                                                          placeholder="***********"
                                                          className="text-center"
                                                          style={styles.input}
                                                          value={values.password}
                                                          onChange={handleChange}
                                                          isInvalid={touched.password && !!errors.password}
                                                          required/>
                                            <Form.Control.Feedback>Great</Form.Control.Feedback>
                                            <Form.Control.Feedback
                                                type="invalid">{errors.password}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Text className="mb-5 mx-4 fw-semibold">
                                        <a href="/forget-password" style={{color: '#863486'}}>Forget password ?</a>
                                    </Form.Text>
                                    <Row className="d-flex justify-content-around my-5">
                                        <Button
                                            className="col-4 mx-3 btn-purple"
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
                                        <Button className="col-4 mx-2 fw-semibold"
                                                variant="outline-success"
                                                value="Register"
                                                onClick={() => setMode(false)}
                                        >
                                            Register
                                        </Button>
                                    </Row>
                                </Form>
                            </>
                        )}
                    </Formik>
                </Col>
                <Col className="text-center py-3">
                    <img
                        className="img-fluid mb-5"
                        src="/Logo.png"
                        alt="logo"
                    />
                    <h1 className="fw-bolder" style={{color: '#863486', fontSize: '4rem'}}>Login</h1>
                </Col>
            </Row>

        </>
    )
}

export default Login;
