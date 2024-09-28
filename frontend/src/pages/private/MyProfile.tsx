import {useEffect, useState} from "react";
import {Me} from "../../models/dto/user/Me.tsx";
import {Alert, Button, Card, Col, Row, Spinner, Tab, Table, Tabs} from "react-bootstrap";
import api from "../../api/AxiosConfig.tsx";
import {useNavigate} from "react-router-dom";
import {AppUtil} from "../../utils/AppUtil.tsx";
import {FaUserEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {AxiosError, AxiosResponse} from "axios";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Password from "../../components/Password.tsx";
import {ReviewDto} from "../../models/dto/review/ReviewDto.tsx";
import ThreeDot from "../../components/ThreeDot.tsx";
import {ErrorDto} from "../../models/ErrorDto.tsx";

const MyProfile = () => {
    const navigate = useNavigate();
    const [me, setMe] = useState<Me>();
    const [token, setToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true)

    const handleDelete = async (): Promise<void> => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete my account!'

        }).then(async (result: any) => {
            if (result.isConfirmed) {

                const userIdFromSession = sessionStorage.getItem("userId")
                await api.delete(`/api/users/${userIdFromSession}`, {headers: {Authorization: "Bearer " + token}})
                    .then((response: AxiosResponse) => {
                        if (response.status === 204) {
                            Swal.fire(
                                'Deleted!',
                                'Your account has been deleted successfully.',
                                'success'
                            )
                            navigate('/')
                        }

                    }).catch((error: AxiosError) => {
                        error
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Some error occurred!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    })


            }
        })
    }


    useEffect(() => {
        const fetchData = async () => {
            let tokenFromSession: string | null = sessionStorage.getItem("token");
            if (tokenFromSession !== null) {
                setToken(tokenFromSession);
                try {
                    await api.get(`/api/users/me`,
                        {headers: {Authorization: "Bearer " + tokenFromSession}})
                        .then((response: AxiosResponse<Me>) => {
                            const data: Me = response.data
                            setMe(data);
                            setLoading(false)
                        }).catch((error: AxiosError<ErrorDto>) => {
                            navigate('/error', {state: {error: error.response?.data}})
                        })

                } catch (error) {
                    console.log(error);
                    alert("Unhandled error");
                }
            } else {
                navigate("/");
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <>
            {loading ? (
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : null}
            <Row
                className="w-100 vh-100 border-2 border-black m-auto bg-dark bg-opacity-25 position-fixed overflow-auto">
                <Col lg={4}
                     className="d-flex vh-100 flex-column align-items-center bg-white border-end border-2 border-black position-fixed">
                    <img
                        src="/default_profile.png"
                        alt=""
                        className="img-fluid border border-black border-2 rounded-circle my-2"
                        style={{height: "150px"}}
                    />
                    <Button
                        className="my-2 btn-purple"
                        onClick={() => AppUtil.copyToClipBoard(me?.me.id)}
                    >
                        {me?.me.id}
                    </Button>
                    <Table striped bordered hover variant="success" className="w-100 border-3">
                        <tbody>
                        <tr>
                            <td>
                                <strong>Firstname</strong>
                            </td>
                            <td>{me?.me.firstname}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Lastname</strong>
                            </td>
                            <td>{me?.me.lastname}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Email</strong>
                            </td>
                            <td>{me?.me.email}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Password</strong>
                            </td>
                            <td>
                                <Password/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Role</strong>
                            </td>
                            <td>{me?.me.roles}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Row className="justify-content-around">
                        <Col>
                            <Button className="btn-purple-outline" disabled>
                                <FaUserEdit/>
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-danger" onClick={handleDelete}>
                                <MdDelete/>
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}>
                </Col>
                <Col lg={8}>
                    <Tabs
                        defaultActiveKey="snippets"
                        className="my-2"
                        fill
                    >
                        <Tab title="Snippets" eventKey="snippets">
                            <div
                                className="d-flex flex-wrap align-content-stretch justify-content-around overflow-auto">
                                {me?.mySnippets.length === 0 ? (
                                    <div className="mx-auto">
                                        <Alert variant="info" className="text-center">No snippets available.</Alert>
                                    </div>
                                ) : (
                                    (me?.mySnippets.map((snippet) => (
                                        <Card key={snippet.id} className="d-block mb-5"
                                              style={{width: '25rem', height: '200px'}}>
                                            <Card.Header className="d-flex justify-content-between">
                                                <Card.Title className="title-link">
                                                    <a className="text-dark"
                                                       href={"/user/snippet/" + snippet.id}>{snippet.title}</a>
                                                </Card.Title>
                                                {/*<a*/}
                                                {/*    className="text-decoration-none"*/}
                                                {/*    href={"https://en.wikipedia.org/wiki/Special:Search?search=" + snippet.language + " programming language"}*/}
                                                {/*    target="_blank">*/}
                                                {/*    <Card.Subtitle*/}
                                                {/*        className="mt-1 text-purple">{snippet.language.toUpperCase()}</Card.Subtitle>*/}
                                                {/*</a>*/}
                                                <ThreeDot obj={snippet}/>

                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {snippet.description.substring(0, 200)}
                                                    {' '}
                                                    <a className="text-info"
                                                       href={"/user/snippet/" + snippet.id}>Read
                                                        more...</a>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>)
                                    ))
                                )}
                            </div>
                        </Tab>
                        <Tab title="Reviews" eventKey="reviews">
                            <div className="d-flex flex-wrap align-content-stretch border-end border-1 border-black
                        justify-content-around overflow-auto">
                                {me?.myReviews.length === 0 ? (
                                    <Alert variant="danger">
                                        No reviews yet.
                                    </Alert>
                                ) : (me?.myReviews.map((review: ReviewDto) => (
                                        <Card key={review.id} className="d-block mb-5"
                                              style={{width: '25rem', minHeight: '100px'}}>
                                            <Card.Header className="title-link d-flex justify-content-between">
                                                <a href={"/user/snippet/" + review.snippetId} className="text-dark">
                                                    {review.snippet.title}
                                                </a>
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

                            </div>


                        </Tab>
                    </Tabs>

                </Col>

            </Row>
        </>
    )
        ;
};

export default MyProfile;
