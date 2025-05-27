import React, { useState, useEffect } from 'react'
import axios from 'axios';

import FilterList from './Filter/FilterList';
import RecipeList from './RecipeList';
import SearchBar from './SearchBar';
import './Styles/recipes.css'
import ReactGA from 'react-ga4'
const Recipes = () => {
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const API = process.env.REACT_APP_API;
    const baseURL = `${API}/recipes_data`;

    useEffect(() => {
        document.title = 'Explore Recipes';
        ReactGA.send({
            hitType: "pageView",
            page: window.location.pathname
        })
    }, [])

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(baseURL, {
                    params: {
                        query: searchQuery,
                        filter: filterType
                    }
                });
                setRecipes(response?.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setIsLoading(false);
            }
        }

        const timeoutId = setTimeout(() => {
            fetchRecipes();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, filterType])

    

    return (
        <div className="recipes-outer-container">
            <div className="filter-container" data-aos="fade-in" data-aos-once="true"
                data-aos-delay="800" data-aos-duration="800">
                <FilterList filterType={filterType} setFilterType={setFilterType} />
            </div>
            <div className="listing-container" data-aos="fade-in" data-aos-once="true"
                data-aos-delay="1000" data-aos-duration="800">
                <SearchBar onSearch={setSearchQuery} />
                <RecipeList recipes={recipes} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default Recipes;