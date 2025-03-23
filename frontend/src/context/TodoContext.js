import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (token) {
            axios.get(`http://localhost:5000/api/todos`, {
                headers: { Authorization: token }
            }).then(({ data }) => setTodos(data));
        }
    }, [token]);

    const addTodo = async (title) => {
        const { data } = await axios.post(`http://localhost:5000/api/todos`, { title }, {
            headers: { Authorization: token }
        });
        setTodos([...todos, { id: data.id, title }]);
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`, {
            headers: { Authorization: token }
        });
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;
