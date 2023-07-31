import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import {FaUserCircle} from "react-icons/fa";
import {BiLogOut} from "react-icons/bi";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {useState} from "react";

const NavigationBar = () => {
    const navigate = useNavigate()
    const {query} = useParams<string>()
    const [data, setData] = useState<string>(query ? query : '')
    const handleClick = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("userId")
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            // @ts-ignore
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Logged out successfully'
        })
        navigate('/')
    }

    return (
        <>
            <Navbar expand="lg" sticky="top" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/user/dashboard">
                        <img
                            src="/Logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Form className="d-flex" onSubmit={() => navigate(`/user/search/${data}`)}>
                        <Form.Control
                            type="search"
                            name="query"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0 fs-5 "
                            style={{maxHeight: '100px'}}
                            navbarScroll

                        >
                            <Nav.Link className="xl mx-2" href="/user/me"><FaUserCircle/></Nav.Link>
                            <Nav.Item>
                                <Button variant="outline-success" className="xl mx-2 mt-1"
                                        onClick={handleClick}><BiLogOut/></Button>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavigationBar;