import React, {useState} from 'react';
import img2 from "../CarouselPage/image/img-2.jpeg"
import "./index.css";

const Footer = () => {
    const [date, setDate] = useState(Date);

    return (
        <div className="footer">
            <h6>Copyright @ {new Date().getFullYear()}</h6>
            <img src={img2}/>
        </div>
    );
}

export default Footer;

