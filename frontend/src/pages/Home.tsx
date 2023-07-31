import {Carousel} from "react-bootstrap";
import Login from "./Login.tsx";
import {useState} from "react";
import Register from "./Register.tsx";

const Home = () => {
    // TODO: complete home page
    const [mode, setMode] = useState<boolean>(true)
    return (
        <>
            <div className="position-absolute z-1">
                {mode ? (<Login setMode={setMode}/>) : (<Register setMode={setMode}/>)}

            </div>
            <Carousel className="z-n1">
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block vw-100 vh-100 overflow-hidden"
                        src="/carousal1.png"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block vw-100 vh-100 overflow-hidden"
                        src="/carousal2.png"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block vw-100 vh-100 overflow-hidden"
                        src="/carousal3.png"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </>
    )
}
export default Home