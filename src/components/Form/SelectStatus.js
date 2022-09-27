import React from 'react'

const SelectStatus = ({register}) => {
  return (
    <div className='mr-4 translate-y-[-10px] w-full md:w-[20%] flex flex-col px-2 justify-start'>
        <label className='text-gray-500 pt-5 md:pt-2 ml-1'>Status</label>
        <select  
            {...register('status')} defaultValue=''
            className="max-w-[120px] sm:w-full h-[23px] mr-6 bg-transparent border-none text-gray-700 focus:outline-none"
        >
            <option value='' disabled>Choose status</option>
            <option value='todo'>To do</option>
            <option value='in_progress'>In progress</option>
            <option value='done'>Done</option>
        </select>
    </div>
  )
}

export default SelectStatus
