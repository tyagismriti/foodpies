import './Styles/filter.css';

const Filter = ({ filterName, setFilterType, isSelected }) => {

    const handleClick = () => {
        setFilterType(filterName);
    }

    return (
        <>
            <div className="row">
                <p className="F-heading"> {filterName} </p>
                <label>
                    <input 
                        type="radio" 
                        name="filter" 
                        value={filterName} 
                        onChange={handleClick} 
                        className="radioFilter"
                        checked={isSelected}
                    />
                </label>
            </div>
        </>
    );
}

export default Filter;
