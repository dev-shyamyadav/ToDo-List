import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

function TodoList({ todos, handleEdit, handleMarkComplete, handleDelete }) {
    return (
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
                {todos.length > 0 ? (
                    todos.map((todo, index) => (
                        <TodoItem
                            key={index}
                            todo={todo}
                            index={index}
                            handleEdit={handleEdit}
                            handleMarkComplete={handleMarkComplete}
                            handleDelete={handleDelete}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan={4}><div className="empty-inbox"><FontAwesomeIcon icon={faInbox}/> No Task Found</div></td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default TodoList;
