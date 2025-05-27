
import { FaSearch } from 'react-icons/fa'
import './Styles/recipes.css';

const SearchBar = ({ onSearch }) => {
    const handleSearch = (e) => {
        onSearch(e?.target?.value);
    }

    return (
        <div className="search-bar">
            <FaSearch className="search" />
            <input type="text" onChange={handleSearch} placeholder="Search what you want..." className="search-box" />
        </div>
    )
}

export default SearchBar;