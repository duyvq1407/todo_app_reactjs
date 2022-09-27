import React from 'react'
import Status from '../Status'

const Todo = ({onDelete, onEdit, todoList, isSearch}) => {
    return (
        <>
            <div className='todo-list'>
                <ul className='flex'>
                    <li className="ml-4 uppercase font-bold text-left">Title</li>
                    <li className="uppercase font-bold text-left">Deadline</li>
                    <li className="uppercase font-bold text-left">Status</li>
                    <li className="uppercase font-bold text-left">Action</li>
                </ul>
                
                <ul>
                    {todoList.map(item => (
                        <li key={item.id}>
                            <span className='ml-4'>{item.title} </span>
                            <span>{item.deadline}</span>
                            <Status status={item.status} deadline={item.deadline}/>
                            <span>
                                <button 
                                    type='button' 
                                    onClick={() => onEdit(item)} 
                                    className='text-blue-500 hover:text-blue-700'
                                >
                                    Edit
                                </button>
                                <button  
                                    type='button' 
                                    onClick={() => onDelete(item.id)} 
                                    className='text-red-500 hover:text-red-700 ml-3'
                                >
                                    Remove
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Todo