import Navbar from "../components/Navbar";

import "../routes/Home.css";
import pic from "../Images/phot.jpg"

import Footer from "../components/Footer/Footer";
import { Card } from "react-bootstrap";

function Home() {

    const activeItem = "Home";

    const setActiveItem = (itemName) => {

        console.log(`Setting active item to ${itemName}`);
    };
    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />

            <div className="my-3 ">

                <img src={pic}></img>

                <div className="row">
                    <div className="col-6">
                        <Card></Card>
                    </div>

                </div>
            </div>


            <Footer></Footer>
        </div>
    );
}

export default Home;
