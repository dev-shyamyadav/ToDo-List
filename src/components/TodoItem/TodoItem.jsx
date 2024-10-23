import React from 'react';
import "./TodoItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ todo, index, handleEdit, handleMarkComplete, handleDelete }) {
    return (
        <tr>
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
                <button className='action-btn' id="del-btn" onClick={() => handleDelete(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}

export default TodoItem;
