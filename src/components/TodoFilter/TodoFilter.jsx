import React from 'react';
import "./TodoFilter.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faCheck } from '@fortawesome/free-solid-svg-icons';

function TodoFilter({ filter, setFilter, handleDeleteAll }) {
    const [showFilter, setShowFilter] = React.useState(false);
    const filterRef = React.useRef(null);

    const toggleFilter = () => setShowFilter(!showFilter);

    const applyFilter = (filterOption) => {
        setFilter(filterOption);
        setShowFilter(false);
    };

    // Hide filter on click outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='todos-filter'>
            <div className='dropdown' ref={filterRef}>
                <div className='filter-label' onClick={toggleFilter}>
                    FILTER <FontAwesomeIcon icon={faFilter} />
                </div>
                {showFilter && (
                    <ul className='dropdown-content'>
                        {["All", "Completed", "Pending"].map(option => (
                            <li key={option} onClick={() => applyFilter(option)}>
                                {option}
                                {filter === option && (
                                    <FontAwesomeIcon icon={faCheck} className='filter-check' />
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button className='del-all-btn' onClick={handleDeleteAll}>
                DELETE ALL
            </button>
        </div>
    );
}

export default TodoFilter;
