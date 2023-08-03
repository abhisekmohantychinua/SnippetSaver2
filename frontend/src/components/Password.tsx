import React, {useState} from "react";
import {MdEdit} from "react-icons/md";
import * as yup from "yup";
import * as formik from "formik";
import {Button, FloatingLabel, Form, Modal, ModalHeader, Spinner} from "react-bootstrap";
import api from '../api/AxiosConfig.tsx'
import {ChangePassword} from "../models/dto/auth/ChangePassword.tsx";
import {AxiosError, AxiosResponse} from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ErrorDto} from "../models/ErrorDto.tsx";
import {useNavigate} from "react-router-dom";

const Password = () => {
    const {Formik} = formik;
    const [show, setShow] = useState<boolean>(false)
    const navigate = useNavigate()
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const schema = yup.object({
        oldPassword: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .matches(/^(?=.*[A-Za-z])(?=.*\d.*\d.*\d.*\d)[A-Za-z\d]{8,}$/, "Password must include at least 4 numbers")
            .required("Please enter your password"),
        newPassword: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .matches(/^(?=.*[A-Za-z])(?=.*\d.*\d.*\d.*\d)[A-Za-z\d]{8,}$/, "Password must include at least 4 numbers")
            .required("Please enter your password"),
        rePassword: yup
            .string()
            .oneOf([yup.ref("newPassword")], "Passwords must match")
            .required("Please re-enter your password"),
    })
    const handleSubmit = async (values, {setSubmitting}) => {
        setSubmitting(true)
        try {
            const tokenFromSession = sessionStorage.getItem("token")
            const credentials: ChangePassword = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                re_Password: values.rePassword
            }
            await api.patch("/api/users/password",
                credentials, {headers: {Authorization: "Bearer " + tokenFromSession}})
                .then((response: AxiosResponse) => {
                    if (response.status === 204) {
                        console.log("change successful")
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Password changed successfully!!!",
                            showConfirmButton: false,
                            timer: 2000
                        })
                        setShow(false)
                        sessionStorage.removeItem("token")
                        sessionStorage.removeItem("userId")
                        navigate('/')
                    }
                }).catch((error: AxiosError<ErrorDto>) => {
                    if (error.response?.data.message === "Password doesn't match!!!") {
                        console.log("error occurred")
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Password doesn't match with server data. Try Again!!!",
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                    setShow(false)
                })

        } catch (error) {
            console.log(error)
            alert("Unhandled error")
        }
    }
    return (
        <>

            <Modal show={show} onHide={handleClose} centered>
                <ModalHeader closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </ModalHeader>
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        rePassword: ''
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={schema}
                    validateOnChange={true}>
                    {({handleSubmit, handleChange, values, touched, errors, isSubmitting}) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body>
                                <FloatingLabel label="Old Password" className="mb-2">
                                    <Form.Control
                                        type="text"
                                        name="oldPassword"
                                        value={values.oldPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.oldPassword && !!errors.oldPassword}
                                    />
                                    <Form.Control.Feedback>Great</Form.Control.Feedback>
                                    <Form.Control.Feedback
                                        type="invalid">{errors.oldPassword}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel label="New Password" className="mb-2">
                                    <Form.Control
                                        type="text"
                                        name="newPassword"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.newPassword && !!errors.newPassword}
                                    />
                                    <Form.Control.Feedback>Great</Form.Control.Feedback>
                                    <Form.Control.Feedback
                                        type="invalid">{errors.newPassword}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel label="Re enter password" className="mb-2">
                                    <Form.Control
                                        type="text"
                                        name="rePassword"
                                        value={values.rePassword}
                                        onChange={handleChange}
                                        isInvalid={touched.rePassword && !!errors.rePassword}
                                    />
                                    <Form.Control.Feedback>Great</Form.Control.Feedback>
                                    <Form.Control.Feedback
                                        type="invalid">{errors.rePassword}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" variant="success" disabled={isSubmitting}>
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
                                <Button variant="danger" onClick={handleClose}>Cancel</Button>
                            </Modal.Footer>


                        </Form>
                    )}
                < /Formik>
            </Modal>


            <div className="d-flex justify-content-between">
                <span>**********</span>
                <Button className="btn-purple-outline"
                        onClick={handleShow}>
                    <MdEdit/>
                </Button>
            </div>


        </>
    )
}

export default Password