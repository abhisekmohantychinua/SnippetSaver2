import {Button, Container} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {ErrorDto} from "../models/ErrorDto.tsx";

const ErrorPage = () => {
    const location = useLocation()
    const error: ErrorDto = location.state?.error
    return (
        <>
            <Container fluid className="d-flex flex-column vh-100 justify-content-center align-items-center">
                <h1 className="my-3" style={{fontSize: '8rem'}}>{error.status ? error.status : 404}</h1>
                <p style={{fontSize: '2rem'}}>{error.message ? error.message : 'Oops! something went wrong.'}</p>
                <Button className="btn-purple-outline" href="/user/dashboard">Go to Dashboard</Button>
            </Container>
        </>
    )
}
export default ErrorPage