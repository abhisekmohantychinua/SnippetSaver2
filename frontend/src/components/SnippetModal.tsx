import {IoMdAddCircle} from "react-icons/io";
import React, {useState} from "react";
import {Alert, Button, Col, FloatingLabel, Form, Modal, Row, Spinner} from "react-bootstrap";
import * as yup from "yup";
import {Formik, FormikHelpers} from "formik";
import {Alert as CustomAlert} from "../models/Alert";
import {Editor} from "@monaco-editor/react";
import api from '../api/AxiosConfig';
import {SnippetRequestDto} from "../models/dto/snippet/SnippetRequestDto";
import {AxiosError, AxiosResponse} from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';

interface SnippetModalProps {
}

const SnippetModal: React.FC<SnippetModalProps> = () => {
    const [show, setShow] = useState(false);
    const [customAlert, setCustomAlert] = useState<CustomAlert | undefined>();
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (
        values: {
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
        }>
    ) => {
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
                return
            }
            const tokenFromSession = sessionStorage.getItem("token");
            api
                .post("/api/snip", snippet, {
                    headers: {Authorization: "Bearer " + tokenFromSession},
                })
                .then((response: AxiosResponse<SnippetRequestDto>) => {
                    response.data;
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Snippet added !!!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    setShow(false)
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

    // @ts-ignore
    return (
        <>
            <Button
                className="position-absolute position-fixed m-3 btn-lg btn-purple z-3 shadow-lg"
                onClick={handleShow}
                style={{borderRadius: '50px'}}
            >
                <IoMdAddCircle className="fs-2"/>
            </Button>

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
                        title: "",
                        description: "",
                        language: "",
                        code: "",
                        tags: '',
                    }}
                    onSubmit={handleSubmit}
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
                        <>
                            {customAlert && customAlert.show && (
                                <Alert
                                    variant={customAlert.variant}
                                    className="text-center"
                                    onClose={() => setShow(false)}
                                    dismissible
                                >
                                    {customAlert.message}
                                    {customAlert.link ? (
                                        <Alert.Link href={customAlert.link}>
                                            {customAlert.linkText}
                                        </Alert.Link>
                                    ) : null}
                                </Alert>
                            )}
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
                        </>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default SnippetModal;
