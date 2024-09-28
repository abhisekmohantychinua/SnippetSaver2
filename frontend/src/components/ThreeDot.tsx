import {SnippetDto} from "../models/dto/snippet/SnippetDto.tsx";
import {ReviewDto} from "../models/dto/review/ReviewDto.tsx";
import {Review} from "../models/entity/Review.tsx";
import {Button, Col, Dropdown, FloatingLabel, Form, Modal, Row, Spinner} from "react-bootstrap";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiTwotoneDelete} from "react-icons/ai";
import React, {useState} from "react";
import {Formik, FormikHelpers} from "formik";
import {Editor} from "@monaco-editor/react";
import * as yup from "yup";
import {string} from "yup";
import {Snippet} from "../models/entity/Snippet.tsx";
import {SnippetRequestDto} from "../models/dto/snippet/SnippetRequestDto.tsx";
import api from "../api/AxiosConfig.tsx";
import {AxiosError, AxiosResponse} from "axios";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {BsThreeDots} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {ErrorDto} from "../models/ErrorDto.tsx";

interface Prop {
    obj: SnippetDto | Snippet | ReviewDto | Review;
}

const ThreeDot = ((props: Prop) => {
    const [show, setShow] = useState<boolean>(false);
    const schema = yup.object({
        title: yup
            .string()
            .max(100, "Title must not exceed 100 characters.")
            .required("Title is required."),
        description: yup
            .string()
            .min(100, "Description must contain at least 100 characters.")
            .max(1000, "Description must not exceed 1000 characters.")
            .required("Description is required."),
        language: yup
            .string()
            .max(10, "Language name must not exceed 10 characters."),
        code: yup.string().required("Code is required."),
        tags: yup.string().nullable(),
    });
    const navigate = useNavigate()
    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleSnippetSubmit = async (values: {
                                           title: string;
                                           description: string;
                                           language: string;
                                           code: string;
                                           tags: string;
                                       },
                                       {setSubmitting}: FormikHelpers<{
                                           title: string;
                                           description: string;
                                           language: string;
                                           code: string;
                                           tags: string;
                                       }>) => {
        setSubmitting(true)
        try {
            const snippet: SnippetRequestDto = {
                title: values.title,
                description: values.description,
                language: values.language,
                code: values.code,
                tags: values.tags ? values.tags.split("#") : [],
            };
            if (snippet.code.length === 0) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Code section can't be empty!!!\n Can't submit the form.",
                    showConfirmButton: false,
                    timer: 2000,
                });
                return;
            }
            const tokenFromSession = sessionStorage.getItem("token");
            await api.put(`/api/snip/${props.obj.id}`, snippet, {
                headers: {Authorization: "Bearer " + tokenFromSession},
            })
                .then((response: AxiosResponse<SnippetRequestDto>) => {
                    response.data;
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Snippet updated !!!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    setShow(false);
                })
                .catch((error: AxiosError) => {
                    console.log(error);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Some error occurred !!!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                });
        } catch (error) {
            console.log(error);
            alert("Uncaught error");
        }
    };

    const handleReviewSubmit = async (values: { review: string }, {setSubmitting}: FormikHelpers<{
        review: string
    }>) => {
        setSubmitting(true)
        try {
            const tokenFromSession = sessionStorage.getItem("token");
            await api.put(`/api/reviews/${props.obj.id}`,
                values.review, {headers: {Authorization: "Bearer " + tokenFromSession, "Content-Type": "text/plain"}})
                .then((response: AxiosResponse<ReviewDto>) => {
                    response.data;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Review added !!!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setShow(false);
                }).catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })

        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        }
    };

    const handleDelete = async () => {
        const tokenFromSession = sessionStorage.getItem("token");

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            // @ts-ignore
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        try {
            if (typeof props.obj === "object" && "code" in props.obj) {
                await api.delete(`/api/snip/${props.obj.id}`,
                    {headers: {Authorization: "Bearer " + tokenFromSession}})
                    .then((response: AxiosResponse) => {
                        if (response.status == 204) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Deleted successfully'
                            });
                        }
                        navigate('/user/dashboard')
                    }).catch((error: AxiosError) => {
                        console.log(error.response?.data);
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Something went wrong!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
                setShow(false);
            } else {
                await api.delete(`/api/reviews/${props.obj.id}`,
                    {headers: {Authorization: "Bearer " + tokenFromSession}})
                    .then((response: AxiosResponse) => {
                        if (response.status == 204) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Deleted successfully'
                            });
                        }
                    })
                    .catch((error: AxiosError) => {
                        console.log(error.response?.data);
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Something went wrong!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
                setShow(false);
            }
        } catch (error) {
            console.log(error);
            alert("unhandled error");
        }
    };

    return (
        <>
            {sessionStorage.getItem("userId") === props.obj.userId ? (
                <Dropdown className="my-0 fs-4 cursor-pointer" data-bs-theme="dark" align={{lg: 'end'}}>
                    <Dropdown.Toggle as={React.forwardRef(BsThreeDots)} variant="light">

                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShow}><BiSolidEditAlt/>{'  '}Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete}><AiTwotoneDelete/>{'  '}Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : null}

            {typeof props.obj === "object" && "code" in props.obj ? (
                <Modal
                    show={show}
                    onHide={handleClose}
                    className="position-absolute mt-5"
                    size={"xl"}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add a snippet</Modal.Title>
                    </Modal.Header>

                    <Formik
                        initialValues={{
                            title: props.obj.title,
                            description: props.obj.description,
                            code: props.obj.code,
                            language: props.obj.language,
                            tags: props.obj.language
                        }}
                        onSubmit={handleSnippetSubmit}
                        validationSchema={schema}
                        validateOnChange={true}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              values,
                              touched,
                              errors,
                              isSubmitting,
                          }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Modal.Body as={Row}>
                                    <Col lg={8} className="border-end border-3">
                                        <Form.Label>Code</Form.Label>
                                        {touched.code && !!errors.code && (
                                            <div className="invalid-feedback">{errors.code}</div>
                                        )}
                                        <Editor
                                            height="250px"
                                            theme="vs-dark"
                                            language={values.language}
                                            value={values.code}
                                            onChange={(value) =>
                                                handleChange({target: {name: "code", value}})
                                            }
                                            options={{
                                                minimap: {enabled: false},
                                                autoIndent: "full",
                                                wordWrap: "on",
                                            }}
                                        />
                                    </Col>
                                    <Col lg={4}>
                                        <FloatingLabel label="Title" className="my-1">
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                placeholder="Title"
                                                onChange={handleChange}
                                                value={values.title}
                                                isInvalid={touched.title && !!errors.title}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>

                                        <FloatingLabel label="Description" className="my-1">
                                            <Form.Control
                                                as="textarea"
                                                name="description"
                                                placeholder="Description"
                                                style={{height: "90px"}}
                                                onChange={handleChange}
                                                defaultValue={values.description} // Use defaultValue instead of value
                                                isInvalid={touched.description && !!errors.description}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.description}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>

                                        <FloatingLabel label="Language" className="my-1">
                                            <Form.Control
                                                type="text"
                                                name="language"
                                                placeholder="Language"
                                                onChange={handleChange}
                                                value={values.language}
                                                isInvalid={touched.language && !!errors.language}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.language}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                        <FloatingLabel label="Tags" className="my-1">
                                            <Form.Control
                                                as="textarea"
                                                name="tags"
                                                placeholder="tags"
                                                style={{height: "40px"}}
                                                onChange={handleChange}
                                                value={values.tags}
                                                isInvalid={touched.tags && !!errors.tags}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.tags}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
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
                                            'Save'
                                        )}
                                    </Button>
                                    <Button variant="danger" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            ) : (
                <Modal
                    show={show}
                    onHide={handleClose}
                    className="position-absolute mt-5 text-end"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit your review</Modal.Title>
                    </Modal.Header>
                    <Formik
                        initialValues={{
                            review: props.obj.review,
                        }}
                        onSubmit={handleReviewSubmit}
                        validationSchema={yup.object({
                            review: string(),
                        })}
                        validateOnChange={true}
                    >
                        {({values, handleChange, handleSubmit, errors, isSubmitting}) => (
                            <form className="my-2 container" onSubmit={handleSubmit} noValidate>
                                <FloatingLabel controlId="floatingTextarea2" label="Review">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        name="review"
                                        value={values.review}
                                        style={{height: '100px'}}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.review}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <Button type="submit" variant="success" className="mt-2" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Spinner animation="border" role="status" size="sm">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>{' '}
                                            Loading...
                                        </>
                                    ) : (
                                        'save'
                                    )}
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Modal>
            )}
        </>
    );
});

export default ThreeDot;
