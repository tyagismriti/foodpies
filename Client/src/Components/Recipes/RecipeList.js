import RecipeCard from './RecipeCard';
import Skeleton from '@mui/material/Skeleton';

import './Styles/recipes.css';

const RecipeList = ({ recipes, isLoading }) => {

    if (isLoading) {
        return (
            <div className="list-container">
                {[...Array(9)].map((e, i) => <RecipeLoading key={i} />)}
            </div>
        )
    }

    return (
        <div className="list-container">
            {recipes?.map((item, index) => {
                return (
                    <RecipeCard
                        url={item.url}
                        alt={item.title}
                        title={item.title}
                        rating={item.rating}
                        author={item.author}
                        key={index}
                    />
                )
            })}
        </div>
    );

}
export default RecipeList;

const RecipeLoading = () => {
    return (
        <div className="recipe-card" >
            <Skeleton variant='rectangle' className="recipe-thumbnail" />
            <Skeleton width={80} />
            <Skeleton className="p-rate" width={30} />
            <Skeleton className="p-auth" width={60} />
        </div>
    )
}