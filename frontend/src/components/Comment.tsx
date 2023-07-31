import {FaRegCommentDots} from "react-icons/fa6";
import {Alert, Button, Card, FloatingLabel, Form, Offcanvas, Spinner} from "react-bootstrap";
import React, {useState} from "react";
import api from "../api/AxiosConfig.tsx";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {SnippetDto} from "../models/dto/snippet/SnippetDto.tsx";
import {ReviewDto} from "../models/dto/review/ReviewDto.tsx";
import {AxiosResponse} from "axios";
import ThreeDot from "./ThreeDot.tsx";
import {AxiosError} from "axios/index";
import {ErrorDto} from "../models/ErrorDto.tsx";
import {useNavigate} from "react-router-dom";

interface Prop {
    snippetDto: SnippetDto
}

const Comment = ({snippetDto}: Prop) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [review, setReview] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [reviews, setReviews] = useState<Array<ReviewDto>>([])
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const handleClose = () => setShow(false);
    const handleShow = () => {
        loadReviews();
        setShow(true)
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const tokenFromSession = sessionStorage.getItem("token")
            await api.post(`/api/reviews/${snippetDto.id}`,
                review, {headers: {Authorization: "Bearer " + tokenFromSession, "Content-Type": "text/plain"}})
                .then((response: AxiosResponse<ReviewDto>) => {
                    const data = response.data
                    let temp = [...reviews]
                    temp.push(data)
                    setReviews(temp)
                    setReview('')
                }).catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Review added !!!',
                showConfirmButton: false,
                timer: 1500
            })
            setSubmitting(false)
            setShow(false)
        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        }
    }
    const loadReviews = async () => {
        const tokenFromSession = sessionStorage.getItem("token")
        await api.get(`/api/reviews/snippet/${snippetDto.id}`,
            {headers: {Authorization: "Bearer " + tokenFromSession}})
            .then((response: AxiosResponse<Array<ReviewDto>>) => {
                const data = response.data
                setReviews(data)
            })
        setLoading(false)
    }
    return (
        <>
            <FaRegCommentDots className="cursor-pointer" onClick={handleShow}/>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="mt-1 mx-1 cursor-pointer title-link">
                        <a className="text-dark" href={"/user/snippet/" + snippetDto.id}>{snippetDto.title}</a>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column">
                    <Card>
                        <Card.Header>Add a review</Card.Header>
                        <Card.Body className="p-3 text-end">
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel controlId="floatingTextarea2" label="Review">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        value={review}
                                        style={{height: '100px'}}
                                        onChange={(e) => setReview(e.target.value)}
                                    />
                                </FloatingLabel>
                                <Button type="submit" className="mt-3" variant="success" disabled={isSubmitting}>
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
                            </Form>
                        </Card.Body>
                    </Card>
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : reviews.length === 0 ? (
                        <Alert variant="info">No reviews available.</Alert>
                    ) : (
                        reviews.map((review, index) => (
                            <Card key={index} className="my-2">
                                <Card.Header className="d-flex justify-content-between">
                                    <Card.Title className="mt-1">{review.user.name}</Card.Title>
                                    <ThreeDot obj={review}/>
                                </Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <p>
                                            {' '}
                                            {review.review}
                                            {' '}
                                        </p>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Offcanvas.Body>
            </Offcanvas>


        </>
    )
}
export default Comment