import React from 'react';
import TodoContainer from './components/TodoContainer/TodoContainer';
import Footer from "./components/Footer/Footer"
import './index.css';

function App() {
    return (
        <div className="App">
            <TodoContainer />
            <Footer />
        </div>
    );
}

export default App;
