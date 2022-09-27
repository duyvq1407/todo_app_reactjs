import React from 'react'

const InputDeadline = ({label, register}) => {

  return (
    <div className='translate-y-[-10px] w-full md:w-[20%] flex flex-col px-2 justify-start'>
        <label className='text-gray-500 pt-5 md:pt-2'>{label}</label>
        <input {...register(`${label.toLowerCase()}`)}
            type='date' min='2022-01-01' max="2030-12-30" 
            className="appearance-none bg-transparent border-none text-gray-700 focus:outline-none"
        />
    </div>
  )
}

export default InputDeadline