import {useEffect, useState} from "react";
import {UserDto} from "../../models/dto/user/UserDto.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Card, Col, Row, Tab, Table, Tabs} from "react-bootstrap";
import api from "../../api/AxiosConfig.tsx";
import {AxiosResponse} from "axios";
import {AppUtil} from "../../utils/AppUtil.tsx";
import {ReviewDto} from "../../models/dto/review/ReviewDto.tsx";
import ThreeDot from "../../components/ThreeDot.tsx";
import {AxiosError} from "axios";
import {ErrorDto} from "../../models/ErrorDto.tsx";

const UserProfile = () => {
    const navigate = useNavigate()
    const {id} = useParams<string>();
    const [user, setUser] = useState<UserDto>()
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            token
            let tokenFromSession: string | null = sessionStorage.getItem("token");
            if (tokenFromSession !== null) {
                setToken(tokenFromSession);
                try {
                    await api.get(`/api/users/${id}`,
                        {headers: {Authorization: "Bearer " + tokenFromSession}})
                        .then((response: AxiosResponse<UserDto>) => {
                            const data: UserDto = response.data
                            setUser(data)
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
            <Row
                className="w-100 vh-100 border-2 border-black m-auto bg-dark bg-opacity-25 position-fixed overflow-auto">
                <Col lg={4}
                     className="d-flex vh-100 flex-column align-items-center border-2 border-end position-fixed">
                    <img
                        src="/default_profile.png"
                        alt=""
                        className="img-fluid border border-black border-2 rounded-circle my-2"
                        style={{height: "150px"}}
                    />
                    <Button
                        className="my-2 btn-purple"
                        onClick={() => AppUtil.copyToClipBoard(user?.id)}
                    >
                        {user?.id}
                    </Button>
                    <Table striped bordered hover variant="success" className="w-100 border-3">
                        <tbody>
                        <tr>
                            <td>
                                <strong>Firstname</strong>
                            </td>
                            <td>{user?.firstname}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Lastname</strong>
                            </td>
                            <td>{user?.lastname}</td>
                        </tr>
                        </tbody>
                    </Table>

                </Col>
                <Col lg={4}>
                </Col>
                <Col lg={8}>
                    <Tabs
                        defaultActiveKey="snippets"
                        className="mb-3"
                        fill
                    >

                        <Tab title="Snippets" eventKey="snippets">
                            <div className="d-flex flex-wrap align-content-stretch border-end border-1 border-black
                        justify-content-around overflow-auto">

                                {user?.snippets.length === 0 ? (
                                    <div className="mx-auto">
                                        <Alert variant="info" className="text-center">No snippets available.</Alert>
                                    </div>
                                ) : (
                                    (user?.snippets.map((snippet) => (
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

                                {user?.reviews.map((review: ReviewDto) => (
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
                                                <footer className="blockquote-footer">
                                                    posted by <cite title="Source Title">{review.user.name}</cite>
                                                </footer>
                                            </blockquote>
                                        </Card.Body>

                                    </Card>
                                ))}
                            </div>
                        </Tab>


                    </Tabs>

                </Col>

            </Row>
        </>
    )
}

export default UserProfile