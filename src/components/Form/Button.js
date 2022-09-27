import React from 'react'

const ButtonSubmit = (props) => {
        
    const resetForm = () => {
        props.reset({title: '', status: '', deadline: ''});
    }

    const switchBtn = () => {
        if (props.isSearch) {
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
                        onClick={() => {resetForm(); props.onCancel()}}
                        className="min-w-[61px] flex-shrink-0 border-transparent border-4 text-black hover:text-teal-800 text-sm py-1 px-2 rounded"
                    >
                        Cancel
                    </button>
                </>
            )
        }
        if (props.isEdit) {
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
                        onClick={() => {resetForm(); props.onCancel({})}}
                        className="flex-shrink-0 border-transparent border-4 text-black hover:text-teal-800 text-sm py-1 px-2 rounded"
                    >
                        Cancel
                    </button>
                </>
            )
        }
        return (
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
    return (
        <div className="flex min-w-[120px]">
            {switchBtn()}
        </div>
    )
}

export default ButtonSubmit