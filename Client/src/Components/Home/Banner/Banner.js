
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';
import cooking from '../../../assets/cooking.svg'
import './Banner.css'

const Banner = ({ setActive }) => {


    return (
        <div className="banner-bg">
            <div className="text">
                <p className="text-title" data-aos="fade-in" data-aos-once="true" data-aos-duration="800">Search Recipes</p>
                <p className="text-p" data-aos="fade-in" data-aos-once="true"
                    data-aos-delay="200" data-aos-duration="800">There are thousands of different recipes. Find any recipes you want only one click away. </p>
                <p className="text-go a1" data-aos="fade-in" data-aos-once="true"
                    data-aos-delay="400" data-aos-duration="800">
                    Search here
                    <Link to="/recipes" className="link">
                        <FaArrowRight className="rArrow" onClick={() => (setActive('recipes'))} />
                    </Link>
                </p>
                <p className="text-go a2" data-aos="fade-in" data-aos-once="true"
                    data-aos-delay="400" data-aos-duration="800">
                    Search here
                    <Link to="/recipes" >
                        <FaArrowDown className="rArrow" onClick={() => (setActive('recipes'))} />
                    </Link>
                </p>
            </div>
            <div className="img" data-aos="fade-in" data-aos-once="true" data-aos-delay="600" data-aos-duration="800">
                <img src={cooking} className="cooking-svg" alt="cooking" />
            </div>
        </div>
    )
}

export default Banner;