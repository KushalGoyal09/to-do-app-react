import React, { useState } from 'react';

// item - id, text, completed

const ToDoItem = ({ item, onDelete, onEdit, onToggle }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(item.text);

    const handleEditToggle = () => {
        setEditing(!isEditing);
    };

    const handleEditSave = () => {
        onEdit(item.id, editedText);
        setEditing(false);
    };

    return (
        <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-300 w-4/5 m-auto">
            <div className="flex items-center text-2xl">
                <input
                    type="checkbox"
                    className="mr-4 w-6 h-6"
                    checked={item.completed}
                    onChange={() => onToggle(item.id)}
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="border-b border-dotted border-blue-500 focus:outline-none focus:border-solid focus:border-blue-500"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleEditSave();
                            }
                        }}
                    />
                ) : (
                    <span className={item.completed ? 'line-through' : ''}>{item.text}</span>
                )}
            </div>

            <div className="flex">
                {isEditing ? (
                    <button
                        onClick={handleEditSave}
                        className="mx-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                    >
                        Save
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleEditToggle}
                            className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(item.id)}
                            className="mx-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ToDoItem;