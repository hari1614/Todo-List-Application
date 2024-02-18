import { useState } from "react";

const Create = () => {
    const [todoList, setTodoList] = useState('');
    const [showData, setShowData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState('');


    const handleInputChange = (e) => {
        setTodoList(e.target.value);
    }

    const handleClick = (e) => {
        if (todoList.trim() === '') {
            return;
        }

        setShowData([...showData, todoList]);
        setTodoList('');
        console.log('Task added successfully', todoList)
    };

    const deletePost = (e) => {
        setShowData(showData.filter((task, i) => i !== e));
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedTask(showData[index]);
    };

    const handleEditChange = (e) => {
        setEditedTask(e.target.value);
    };

    const handleSaveEdit = (index) => {
        const updatedData = [...showData];
        updatedData[index] = editedTask;
        setShowData(updatedData);
        setEditIndex(null);
    };

    return (
        <div className="create">
            <h1 className="title">Create a new task</h1>
            <div className="input">
                <input type="text" value={todoList} onChange={handleInputChange} placeholder="Add New Task" />
                <button onClick={handleClick} className="add-button" >Add Task</button>
            </div>
            <div className="filter-options">
                {/* Filter is not completed */}
                <button>All</button>
                <button>Completed</button>
                <button>Incomplete</button>
            </div>
            <ul className="task-list">
                {showData.map((value, index) => (
                    <div>
                        <li key={index} className="task-item">
                            {editIndex === index ? (<input
                                type="text"
                                value={editedTask}
                                onChange={handleEditChange}
                            />) : (
                                <span>{value}</span>

                            )}
                            <span className="button-group">
                                {editIndex === index ? (
                                    <button onClick={() => handleSaveEdit(index)}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                                        <button onClick={() => deletePost(index)}>Delete</button>
                                    </>
                                )}
                            </span>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Create;