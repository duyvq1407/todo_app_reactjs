import React from 'react'
import { compareDate } from '../../utils/compareDate'

const Status = ({status, deadline}) => {
    compareDate(deadline)
    if (status === 'done') {
        return <span className='text-[#01988f]'>DONE</span>
    } else if (status === 'todo') {
        return <span>TO DO</span>        
    } else {
        if (compareDate(deadline)) {
            return <span className='text-red-500'>MISSING</span> 
        } else {
            return <span className='text-orange-500'>IN PROGRESS</span> 
        }
    }
}

export default Status