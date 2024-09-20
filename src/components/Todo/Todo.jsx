import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faPlus, faEdit, faCheck, faTrash, faInbox, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Todo.css';

function Todo() {

    const today = new Date().toISOString().split('T')[0];

    const [todos, setTodos] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState(today);
    const [taskStatus, setTaskStatus] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState("All");
    const filterRef = useRef(null);

    const handleAddTask = (event) => {
        event.preventDefault();
        if (taskName.trim() === "" || taskDate.trim() === ""){
            return toast.error('Enter Task Name.', {});
        };

        if (editIndex !== null) {
            const updatedTodos = todos.map((todo, index) =>
                index === editIndex ? { ...todo, name: taskName, date: taskDate, completed: taskStatus } : todo
            );
            setTodos(updatedTodos);
            setEditIndex(null);
        } else {
            const newTask = { name: taskName, date: taskDate, completed: taskStatus };
            setTodos(t => [...t, newTask]);
        }
        setTaskName("");
        setTaskDate(today);
        setTaskStatus(false);

        toast.success('Task Added Successfully.', {});
    };

    const handleNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleDateChange = (event) => {
        setTaskDate(event.target.value);
    };

    const handleDeleteAll = () => {
        setTodos([]);

        toast.success('All Task Deleted Successfully.', {});
    };

    const handleEdit = (index) => {
        const todo = todos[index];
        setTaskName(todo.name);
        setTaskDate(todo.date);
        setTaskStatus(todo.completed);
        setEditIndex(index);
    };

    const handleMarkComplete = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const handleDelete = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);

        toast.success('Task Deleted Successfully.', {});
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const applyFilter = (filter) => {
        setFilter(filter);
        setShowFilter(false);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === "Completed") return todo.completed;
        if (filter === "Pending") return !todo.completed;
        return true; // All
    });

    // Use effect to handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className='container'>
                <div className="title">
                    <h1>Todo List</h1>
                    <FontAwesomeIcon icon={faListCheck} />
                </div>
                <form onSubmit={handleAddTask}>
                    <input
                        className='input-field'
                        type="text"
                        placeholder='Add a todo...'
                        value={taskName}
                        onChange={handleNameChange}
                    />
                    <input
                        className='input-field'
                        type="date"
                        value={taskDate}
                        onChange={handleDateChange}
                    />
                    <button className='add-btn' type="submit">
                        <FontAwesomeIcon icon={editIndex !== null ? faCheck : faPlus} />
                    </button>
                </form>
                <div className='todos-filter'>
                    <div className='dropdown' ref={filterRef}>
                        <div className='filter-label' onClick={toggleFilter}>FILTER <FontAwesomeIcon icon={faFilter} /></div>
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
                    <button className='del-all-btn' onClick={handleDeleteAll}>DELETE ALL</button>
                </div>
                <table id='todos'>
                    <thead>
                        <tr>
                            <th>TASK</th>
                            <th>DUE DATE</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTodos.length > 0 ? (
                            filteredTodos.map((todo, index) => (
                                <tr key={index}>
                                    <td>{todo.name}</td>
                                    <td>{todo.date}</td>
                                    <td>{todo.completed ? "Completed" : "Pending"}</td>
                                    <td>
                                        <button className='action-btn' id="edit-btn" onClick={() => handleEdit(index)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className='action-btn' id="complete-btn" onClick={() => handleMarkComplete(index)}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                        <button className='action-btn' id='del-btn' onClick={() => handleDelete(index)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}><div className='empty-inbox'><FontAwesomeIcon icon={faInbox}/>No Task Found</div></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default Todo;
