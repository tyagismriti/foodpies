

import Filter from './Filter'
import './Styles/filter.css';

const FilterList = ({ filterType, setFilterType }) => {
    const clearFilter = () => {
        setFilterType('all')
        document.getElementById("fForm").reset();
    }
    return (
        <div className="f-container">
            <h2>Recipes 👩‍🍳</h2>
            <div className="row" id="f-row">
                <p className="F-heading">Filter by:</p>
                <p className="shortText" onClick={clearFilter}>Clear Filter</p>
            </div>
            <form method='POST' id="fForm" >
                <Filter filterName="Breakfast" setFilterType={setFilterType} isSelected={filterType === "Breakfast" }/>
                <Filter filterName="Lunch / Dinner" setFilterType={setFilterType} isSelected={filterType === "Lunch / Dinner" }/>
                <Filter filterName="Desserts" setFilterType={setFilterType} isSelected={filterType === "Desserts" }/>
                <Filter filterName="Vegan" setFilterType={setFilterType} isSelected={filterType === "Vegan" }/>
            </form>
        </div>
    )
}

export default FilterList;

