import React from 'react'

const InputTitle = ({isRequired, register, errors}) => {
  
  return (
    <div className='flex p-0 mb-2 md:mb-0 md:px-2 ml-3 w-full flex-col pt-2 justify-start md:w-1/2'>
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