import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Alert, Button, Container, Spinner} from "react-bootstrap";
import api from "../../api/AxiosConfig.tsx";
import SnippetCard from "../../components/SnippetCard.tsx";
import {SnippetDto} from "../../models/dto/snippet/SnippetDto.tsx";
import {AxiosError, AxiosResponse} from "axios";
import SnippetModal from "../../components/SnippetModal.tsx";
import {ErrorDto} from "../../models/ErrorDto.tsx";
import {TbReload} from "react-icons/tb";

const Dashboard = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>('');
    const [snippets, setSnippets] = useState<Array<SnippetDto>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            let tokenFromSession: string | null = sessionStorage.getItem("token");
            if (tokenFromSession !== null) {
                setToken(tokenFromSession);
                try {
                    await api.get("/api/snip", {headers: {Authorization: "Bearer " + tokenFromSession}})
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
                    setIsLoading(false);
                }
            } else {
                navigate('/');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : snippets.length === 0 ? (
                <>
                    <SnippetModal/>
                    <Alert variant="info">No snippets available.</Alert>
                </>
            ) : (
                <>

                    <SnippetModal/>
                    <Container className="col-8 ms-5 my-1">
                        {snippets.map((snippet) => (
                            <SnippetCard key={snippet.id} snippetDto={snippet}/>
                        ))}
                        <div className="d-flex justify-content-center">
                            <Button href="/user/dashboard" variant="outline-primary"><TbReload/></Button>
                        </div>
                    </Container>

                </>
            )}
        </>
    );
};

export default Dashboard;
