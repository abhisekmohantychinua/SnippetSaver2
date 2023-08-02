import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import api from "../../api/AxiosConfig.tsx";
import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import {atomOneDarkReasonable} from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import {TiTick} from "react-icons/ti";
import {MdContentCopy} from "react-icons/md";
import {AppUtil} from "../../utils/AppUtil.tsx";
import {FaCode} from "react-icons/fa6";
import {AxiosResponse} from "axios";
import {SnippetDto} from "../../models/dto/snippet/SnippetDto.tsx";
import Like from "../../components/Like.tsx";
import Comment from "../../components/Comment.tsx";
import Share from "../../components/shares/Share.tsx";
import ThreeDot from "../../components/ThreeDot.tsx";
import {AxiosError} from "axios/index";
import {ErrorDto} from "../../models/ErrorDto.tsx";

const SnippetPage = () => {
    const {id} = useParams<string>();
    const navigate = useNavigate();
    const [snippet, setSnippet] = useState<SnippetDto | null>(null)
    const [token, setToken] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            let tokenFromSession: string | null = sessionStorage.getItem("token");
            if (tokenFromSession !== null) {
                setToken(tokenFromSession);
                try {
                    if (id) {
                        await api.get(`/api/snip/snippet/${id}`,
                            {headers: {Authorization: "Bearer " + tokenFromSession}})
                            .then((response: AxiosResponse<SnippetDto>) => {
                                const data: SnippetDto = response.data
                                setSnippet(data)
                                setLoading(false)
                            }).catch((error: AxiosError<ErrorDto>) => {
                                navigate('/error', {state: {error: error.response?.data}})
                            })
                    } else {
                        navigate("/user/dashboard")
                    }
                } catch (error) {
                    //Navigate to Error page
                    console.log(error);
                    alert("Unhandled error");
                }
            } else {
                navigate("/");
            }
        };
        fetchData();
    }, [navigate]);
    const handleCopyClick = () => {
        AppUtil.copyToClipBoard(snippet?.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 5000)
    }
    return (
        <>
            {loading ? (
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : null}
            {snippet ? (
                <>
                    <Container className="mt-4 bg-white">
                        <div className="d-flex justify-content-between p-2 border-bottom">
                            <FaCode className="mx-1 text-success" style={{fontSize: '3rem'}}/>
                            <h2>{snippet?.title}</h2>
                            <ThreeDot obj={snippet}/>
                        </div>
                        <Container>
                            <Container className="h-100 d-flex flex-column justify-content-center">
                                <Row className="d-flex justify-content-between my-2">
                                    <div
                                        className="border border-black border-2 rounded-pill col-2 mt-1 ms-4 text-center text-capitalize ">
                                        {snippet?.language}
                                    </div>
                                    {copied ? (<TiTick className="col-1 mt-1 me-2" style={{fontSize: '2rem'}}/>) : (
                                        <MdContentCopy className="col-1 mt-1 me-2" style={{fontSize: '2rem'}}
                                                       onClick={handleCopyClick}>
                                        </MdContentCopy>)}
                                </Row>

                                <SyntaxHighlighter
                                    language={snippet?.language}
                                    style={atomOneDarkReasonable}
                                    showLineNumbers={true}
                                    customStyle={{textAlign: 'start', borderRadius: '20px', minHeight: '200px'}}>
                                    {snippet?.code}
                                </SyntaxHighlighter>
                            </Container>

                            <Container className="text-success fs-5" style={{minHeight: '150px'}}>
                                {snippet?.description}
                            </Container>
                        </Container>
                        <Container className="d-flex justify-content-around my-2 border-top border-bottom border-2">
                            <Col className="col-2">
                                <Like snippetDto={snippet}/>
                            </Col>
                            <Col className="col-2">
                                <Comment snippetDto={snippet}/>
                            </Col>
                            <Col className="col-2">
                                <Share/>
                            </Col>
                        </Container>
                    </Container>
                </>
            ) : (
                <Alert variant="danger text-center">
                    no snippets available
                </Alert>
            )
            }
        </>

    )
}

export default SnippetPage