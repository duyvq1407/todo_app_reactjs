import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';

const TodoForm = ({onAdd, onUpdate, todoEdit, onSearch}) => {
    
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [isSearch, setIsSearch] = useState(false);

    const onSubmit = (data) => {
        if (todoEdit.id) {
            onUpdate({...todoEdit, ...data});
            resetForm()
        } else if(isSearch) {
            onSearch(data)
        }else {
            onAdd({...data, id: new Date().getTime()});
            resetForm()
        }
    }

    const switchBtn = () => {
        if (todoEdit.id) {
            return (
                <>
                    <button 
                    type="submit" 
                    className="flex-shrink-0 bg-black hover:bg-teal-700 border-black hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Update
                    </button> 
                    <button 
                        type="button"
                        onClick={() => {onUpdate(todoEdit); resetForm()}}
                        className="flex-shrink-0 border-transparent border-4 text-black hover:text-teal-800 text-sm py-1 px-2 rounded"
                    >
                        Cancel
                    </button>
                </>
            )
        } else if (isSearch) {
            return (
                <>
                    <button 
                        type="submit" 
                        className="min-w-[61px] flex-shrink-0 bg-black hover:bg-teal-700 border-black hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        >
                            Search
                        </button> 
                        <button 
                            type="button"
                            onClick={() => {setIsSearch(false); onSearch({}, true); resetForm()}}
                            className="min-w-[61px] flex-shrink-0 border-transparent border-4 text-black hover:text-teal-800 text-sm py-1 px-2 rounded"
                        >
                            Cancel
                    </button>
                </>
            )
        } else {
            return(
                <>
                    <button 
                        type="submit" 
                        className="min-w-[61px] flex-shrink-0 bg-black hover:bg-teal-700 border-black hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        >
                            Add
                        </button> 
                        <button 
                            type="button"
                            onClick={() => {resetForm()}}
                            className="min-w-[61px] flex-shrink-0 border-transparent border-4 text-black hover:text-teal-800 text-sm py-1 px-2 rounded"
                        >
                            Clear
                    </button>
                </>
            )
        }
    }

    const switchDeadline = () => {
        if(isSearch) {
            return (
                <>
                    <div className='translate-y-[-10px] w-20% flex flex-col px-2 justify-start'>
                        <label className='text-gray-500'>From</label>
                        <input 
                            {...register('deadlineSearchFrom')}
                            type='date' min='2022-01-01' max="2030-12-30" 
                            className="appearance-none bg-transparent border-none text-gray-700 focus:outline-none"
                        />
                    </div>
                    <div className='translate-y-[-10px] w-20% flex flex-col px-2 justify-start'>
                        <label className='text-gray-500'>To</label>
                        <input 
                            {...register('deadlineSearchTo')}
                            type='date' min='2022-01-01' max="2030-12-30" 
                            className="appearance-none bg-transparent border-none text-gray-700 focus:outline-none"
                        />
                    </div>
                </>
            )
        }
        return (
            <div className='mr-4 translate-y-[-10px] w-20% flex flex-col px-2 justify-start'>
                <label className='text-gray-500'>DeadLine</label>
                <input 
                    {...register('deadline', {required: true})}
                    type='date' min='2022-01-01' max="2030-12-30" 
                    className="appearance-none bg-transparent border-none text-gray-700 focus:outline-none"
                />
                {errors.deadline && <span className='text-red-500 text-xs'>Vui lòng nhập!</span>}
            </div>
        )
    }
    
    const resetForm = () => {
        todoEdit = {}
        reset({title: '', status: '', deadline: ''});
    }

    useEffect(() => {

        (() => {
            if (todoEdit.id) {
                reset(todoEdit)
            }
        })()

    },[todoEdit.id])

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} >
            <div className="flex items-center border-b border-black py-2">
                <button 
                    type='button'
                    className='ease-in-out duration-300 px-2 hover:text-blue-300 border-r-solid border-r-2 border-gray-500'
                    onClick={() => {resetForm(); setIsSearch(true)}}
                >
                    <FaSearch />
                </button>
                <div className='flex px-2 ml-3 flex-col justify-start w-3/4'>
                    <input 
                        {...register('title', {required: !isSearch})}
                        type="text" 
                        placeholder="Your task" 
                        className="appearance-none bg-transparent border-none text-gray-700 focus:outline-none"
                    />
                    {errors.title && <span className='text-red-500 text-xs'>Vui lòng nhập tiêu đề!</span>}
                </div>
                {switchDeadline()}
                
                <div className='mr-4 translate-y-[-10px] w-20% flex flex-col px-2 justify-start'>
                    <label className='text-gray-500 ml-1'>Status</label>
                    <select  
                        {...register('status', {required: !isSearch})} defaultValue=''
                        className="max-w-[120px] h-[23px] mr-6 bg-transparent border-none text-gray-700 focus:outline-none"
                    >
                        <option value='' disabled>Choose status</option>
                        <option value='todo'>To do</option>
                        <option value='in_progress'>In progress</option>
                        <option value='done'>Done</option>
                    </select>
                    {errors.status && <span className='text-red-500 text-xs'>Vui lòng chọn trạng thái!</span>}
                </div>

                <div className="flex min-w-[120px]">
                    {switchBtn()}
                </div>
            </div>
        </form> 
    )
}

export default TodoForm