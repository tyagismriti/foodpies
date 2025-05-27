import React, { useEffect } from 'react';
import Recipes from "../Recipes/Recipes"
import Banner from "./Banner/Banner"
import ReactGA from 'react-ga4'

const Home = ({ setActive }) => {

    useEffect(() => {
        document.title = `Foodipes: Find premium recipes ...`;
        ReactGA.send({
            hitType: "pageView",
            page: window.location.pathname
        })
    }, [])


    return (
        <div>
            <Banner setActive={setActive} />
            <Recipes />
        </div>
    )
}

export default Home;