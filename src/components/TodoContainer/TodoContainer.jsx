import React, { useState, useEffect } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import TodoFilter from '../TodoFilter/TodoFilter';
import TodoList from '../TodoList/TodoList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TodoContainer.css';

function TodoContainer() {
    const today = new Date().toISOString().split('T')[0];

    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState(today);
    const [taskStatus, setTaskStatus] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTask = (event) => {
        event.preventDefault();
        if (taskName.trim() === "" || taskDate.trim() === "") {
            return toast.error('Enter Task Name.');
        }

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
        toast.success('Task Added Successfully.');
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
        toast.success('Task Deleted Successfully.');
    };

    const handleDeleteAll = () => {
        setTodos([]);
        toast.success('All Tasks Deleted Successfully.');
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === "Completed") return todo.completed;
        if (filter === "Pending") return !todo.completed;
        return true;
    });

    return (
        <div className='container'>
            <div className="title">
                <h1>Todo List</h1>
                <FontAwesomeIcon icon={faListCheck} />
            </div>
            <TodoForm
                taskName={taskName}
                taskDate={taskDate}
                taskStatus={taskStatus}
                handleAddTask={handleAddTask}
                setTaskName={setTaskName}
                setTaskDate={setTaskDate}
                editIndex={editIndex}
            />
            <TodoFilter
                filter={filter}
                setFilter={setFilter}
                handleDeleteAll={handleDeleteAll}
            />
            <TodoList
                todos={filteredTodos}
                handleEdit={handleEdit}
                handleMarkComplete={handleMarkComplete}
                handleDelete={handleDelete}
            />
            <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        </div>
    );
}

export default TodoContainer;
