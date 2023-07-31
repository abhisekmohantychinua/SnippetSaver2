import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {UserDto} from "../../models/dto/user/UserDto.tsx";
import {SnippetDto} from "../../models/dto/snippet/SnippetDto.tsx";
import {Card, Container, Dropdown, Spinner, Tab, Tabs} from "react-bootstrap";
import api from "../../api/AxiosConfig.tsx";
import {AxiosResponse} from "axios/index";
import {AxiosError} from "axios";
import {ErrorDto} from "../../models/ErrorDto.tsx";
import {FaCode} from "react-icons/fa6";

const SearchPage = () => {
    const navigate = useNavigate()
    const {query} = useParams<string>()
    const [token, setToken] = useState<string>('')
    const [users, setUsers] = useState<Array<UserDto>>([])
    const [snippets, setSnippets] = useState<Array<SnippetDto>>([])
    const [loadingSnippet, setLoadingSnippet] = useState<boolean>(true)
    const [loadingUser, setLoadingUser] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            let tokenFromSession: string | null = sessionStorage.getItem("token");
            if (tokenFromSession !== null) {
                setToken(tokenFromSession);
                try {
                    await api.get(`/api/snip/title?title=${query}`, {headers: {Authorization: "Bearer " + tokenFromSession}})
                        .then((response: AxiosResponse<Array<SnippetDto>>) => {
                            const data: Array<SnippetDto> = response.data
                            setSnippets(data);
                        }).catch((error: AxiosError<ErrorDto>) => {
                            navigate('/error', {state: {error: error.response?.data}})
                        })
                } catch (error) {
                    console.log(error);
                    alert("Unhandled error");
                } finally {
                    setLoadingSnippet(false)
                    setLoadingUser(false)
                }
            } else {
                navigate('/');
            }
        };

        fetchData();
    }, [navigate]);

    const fetchUsers = async () => {
        setLoadingUser(true)
        setUsers([])
        try {
            await api.get(`/api/users/name?firstname=${query}`, {headers: {Authorization: "Bearer " + token}})
                .then((response: AxiosResponse<Array<UserDto>>) => {
                    const data: Array<UserDto> = response.data
                    setUsers(data)
                }).catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })
        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        } finally {
            setLoadingUser(false)
        }
    }

    const findSnippetById = async () => {
        setLoadingSnippet(true)
        setSnippets([])
        try {
            await api.get(`/api/snip/snippet/${query}`, {headers: {Authorization: "Bearer " + token}})
                .then((response: AxiosResponse<SnippetDto>) => {
                    const data: SnippetDto = response.data
                    const temp = []
                    temp.push(data)
                    setSnippets(temp);
                })
                .catch((error: AxiosError<ErrorDto>) => {
                    if (error.response?.data.status === 404) {
                        setSnippets([])
                    }
                })

        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        } finally {
            setLoadingSnippet(false)
        }

    }
    const findSnippetByTags = async () => {
        setLoadingSnippet(true)
        setSnippets([])
        try {
            await api.get(`/api/snip/tags?tag=${query}`, {headers: {Authorization: "Bearer " + token}})
                .then((response: AxiosResponse<Array<SnippetDto>>) => {
                    const data: Array<SnippetDto> = response.data
                    setSnippets(data)
                }).catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })
        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        } finally {
            setLoadingSnippet(false)
        }

    }
    const findSnippetsByUserId = async () => {
        setLoadingSnippet(true)
        setSnippets([])
        try {
            await api.get(`/api/snip/user/${query}`, {headers: {Authorization: "Bearer " + token}})
                .then((response: AxiosResponse<Array<SnippetDto>>) => {
                    const data: Array<SnippetDto> = response.data
                    setSnippets(data)
                }).catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })
        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        } finally {
            setLoadingSnippet(false)
        }
    }
    const findSnippetsByLanguage = async () => {
        setLoadingSnippet(true)
        setSnippets([])
        try {
            await api.get(`/api/snip/language?language=${query}`, {headers: {Authorization: "Bearer " + token}})
                .then((response: AxiosResponse<Array<SnippetDto>>) => {
                    const data: Array<SnippetDto> = response.data
                    setSnippets(data)
                }).catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })
        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        } finally {
            setLoadingSnippet(false)
        }
    }

    const findSnippetsByTitle = async () => {
        setLoadingSnippet(true)
        setSnippets([])
        try {
            await api.get(`/api/snip/title?title=${query}`, {headers: {Authorization: "Bearer " + token}})
                .then((response: AxiosResponse<Array<SnippetDto>>) => {
                    const data: Array<SnippetDto> = response.data
                    setSnippets(data);
                }).catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })
        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        } finally {
            setLoadingSnippet(false)
        }
    }
    const findUserByFirstname = async () => {
        setLoadingUser(true)
        setUsers([])
        try {
            await api.get(`/api/users/name?firstname=${query}`, {headers: {Authorization: "Bearer " + token}})
                .then((response: AxiosResponse<Array<UserDto>>) => {
                    const data: Array<UserDto> = response.data
                    setUsers(data)
                }).catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })
        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        } finally {
            setLoadingUser(false)
        }
    }
    const findUserByLastname = async () => {
        setLoadingUser(true)
        setUsers([])
        try {
            await api.get(`/api/users/lastname?lastname=${query}`, {headers: {Authorization: "Bearer " + token}})
                .then((response: AxiosResponse<Array<UserDto>>) => {
                    const data: Array<UserDto> = response.data
                    setUsers(data)
                }).catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })
        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        } finally {
            setLoadingUser(false)
        }
    }
    const findUserById = async () => {
        setLoadingUser(true)
        setUsers([])
        try {
            await api.get(`/api/users/${query}`, {headers: {Authorization: "Bearer " + token}})
                .then((response: AxiosResponse<UserDto>) => {
                    const data: UserDto = response.data
                    const temp = []
                    temp.push(data)
                    setUsers(temp)
                }).catch((error: AxiosError<ErrorDto>) => {
                    if (error.response?.data.status === 404) {
                        setUsers([])
                    }
                })
        } catch (error) {
            console.log(error);
            alert("Unhandled error");
        } finally {
            setLoadingUser(false)
        }
    }
    return (

        <div className="bg-white bg-opacity-25 vh-100">
            <h1>
                Showing the results for {`"${query}"`}
            </h1>
            <Tabs
                defaultActiveKey="snippets"
                className="my-3"

                onSelect={(e) => {
                    if (e === "users") {
                        fetchUsers()
                    }

                }}
            >
                <Tab title="snippets" eventKey="snippets">
                    <div className="d-flex justify-content-end w-100">
                        <Dropdown className="mt-2 me-4 shadow-lg position-absolute position-fixed z-3">
                            <Dropdown.Toggle variant="success">Search by</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={findSnippetById}>by id</Dropdown.Item>
                                <Dropdown.Item onClick={findSnippetsByTitle}>by title</Dropdown.Item>
                                <Dropdown.Item onClick={findSnippetByTags}>by tags</Dropdown.Item>
                                <Dropdown.Item onClick={findSnippetsByUserId}>by user id</Dropdown.Item>
                                <Dropdown.Item onClick={findSnippetsByLanguage}>by language</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {loadingSnippet ? (
                        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : null}
                    <Container>
                        {snippets.length === 0 ? (
                            <h2>no snippets available</h2>
                        ) : (
                            snippets.map((snippet: SnippetDto) => (
                                    <Card key={snippet.id} className="my-2 shadow-sm">
                                        <Card.Header className="d-flex p-2 justify-content-start">
                                            <FaCode className="mx-3 text-success" style={{fontSize: '2rem'}}/>
                                            <Card.Title className="mt-1 mx-2 cursor-pointer title-link">
                                                <a className="text-dark"
                                                   href={"/user/snippet/" + snippet.id}>{snippet.title}</a>
                                            </Card.Title>

                                        </Card.Header>
                                        <Card.Body>
                                            <p>{snippet.description}</p>
                                        </Card.Body>
                                    </Card>
                                )
                            ))}
                    </Container>

                </Tab>
                <Tab title="users" eventKey="users" onSelect={fetchUsers}>
                    <div className="d-flex justify-content-end w-100">
                        <Dropdown className="mt-3 me-3 position-absolute position-fixed z-3">
                            <Dropdown.Toggle variant="success">Search by</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={findUserById}>by id</Dropdown.Item>
                                <Dropdown.Item onClick={findUserByFirstname}>by firstname</Dropdown.Item>
                                <Dropdown.Item onClick={findUserByLastname}>by lastname</Dropdown.Item>
                                {/*<Dropdown.Item>by email</Dropdown.Item>*/}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {loadingUser ? (
                        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : null}
                    <Container>
                        {users.length === 0 ? (
                            <h2>No users available with the expression.</h2>) : (
                            users.map((user: UserDto) => (
                                <Card key={user.id} className="my-2 shadow-sm">
                                    <Card.Header className="d-flex p-2 justify-content-start">
                                        <img
                                            src="/default_profile.png"
                                            alt=""
                                            className="img-thumbnail  rounded-circle"
                                            style={{maxHeight: '50px'}}
                                        />
                                        <Card.Title className="m-3 cursor-pointer title-link">
                                            <a className="text-dark"
                                               href={"/user/" + user.id}>{user.firstname + ' ' + user.lastname}</a>
                                        </Card.Title>
                                    </Card.Header>
                                </Card>
                            ))
                        )}
                    </Container>
                </Tab>


            </Tabs>
        </div>


    )
}
export default SearchPage