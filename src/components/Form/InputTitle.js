import React from 'react'

const InputTitle = ({isRequired, register, errors}) => {
  
  return (
    <div className='flex px-2 ml-3 flex-col justify-start w-3/4'>
      <input 
          {...register('title', {required: isRequired})}
          type="text" 
          placeholder="Your task" 
          className="appearance-none bg-transparent border-none text-gray-700 focus:outline-none"
      />
      {errors.title && <span className='text-red-500 text-xs'>Vui lòng nhập tiêu đề!</span>}
    </div>
  )
}

export default InputTitle