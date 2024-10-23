import React from 'react';
import "./TodoForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

function TodoForm({ taskName, taskDate, taskStatus, handleAddTask, setTaskName, setTaskDate, editIndex }) {
    const today = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleAddTask}>
            <input
                className='input-field'
                type="text"
                placeholder='Add a todo...'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <input
                className='input-field'
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
            />
            <button className='add-btn' type="submit">
                <FontAwesomeIcon icon={editIndex !== null ? faCheck : faPlus} />
            </button>
        </form>
    );
}

export default TodoForm;
