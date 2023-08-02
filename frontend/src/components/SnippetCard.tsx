import React, {useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {FaCode} from "react-icons/fa6";
import SyntaxHighlighter from "react-syntax-highlighter";
import {atomOneDarkReasonable} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {MdContentCopy} from "react-icons/md";
import {TiTick} from "react-icons/ti";
import {AppUtil} from "../utils/AppUtil.tsx";
import Like from "./Like.tsx";
import Comment from "./Comment.tsx";
import Share from "./shares/Share.tsx";
import {SnippetDto} from "../models/dto/snippet/SnippetDto.tsx";

interface SnippetCardProps {
    snippetDto: SnippetDto;
}

const SnippetCard: React.FC<SnippetCardProps> = ({snippetDto}) => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopyClick = () => {
        AppUtil.copyToClipBoard(snippetDto.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    };

    return (
        <>
            <Card className="mb-3 border-1  bg-white bg-opacity-25 shadow">
                <Card.Header className="d-flex p-2 justify-content-between">
                    <FaCode className="mx-1 text-success" style={{fontSize: '2rem'}}/>
                    <Card.Title className="mt-1 mx-1 cursor-pointer title-link">
                        <a className="text-dark" href={"/user/snippet/" + snippetDto.id}>{snippetDto.title}</a>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Container className="bg-dark rounded-3 py-3">
                        <Row className="d-flex justify-content-between text-white my-2">
                            <div className="border border-2 rounded-pill col-2 mt-1 ms-4 text-center text-capitalize">
                                {snippetDto.language}
                            </div>
                            {copied ? (
                                <TiTick className="col-1 mt-1 me-2" style={{fontSize: '2rem'}}/>
                            ) : (
                                <MdContentCopy
                                    className="col-1 mt-1 me-2"
                                    style={{fontSize: '2rem'}}
                                    onClick={handleCopyClick}
                                />
                            )}
                        </Row>
                        <SyntaxHighlighter
                            language={snippetDto.language}
                            style={atomOneDarkReasonable}
                            showLineNumbers={true}
                            customStyle={{textAlign: 'start'}}
                        >
                            {snippetDto.code}
                        </SyntaxHighlighter>
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <Row className="d-flex justify-content-between my-2">
                        <Col className="col-2">
                            <Like snippetDto={snippetDto}/>
                        </Col>
                        <Col className="col-2">
                            <Comment snippetDto={snippetDto}/>
                        </Col>
                        <Col className="col-2">
                            <Share link={"http://localhost:3000/user/snippet/" + snippetDto.id}
                                   desc={snippetDto.description}/>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </>
    );
};

export default SnippetCard;
