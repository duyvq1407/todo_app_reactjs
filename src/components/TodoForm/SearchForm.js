import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import ButtonSubmit from '../Form/Button';
import InputDeadline from '../Form/InputDeadline';
import InputTitle from '../Form/InputTitle';
import SelectStatus from '../Form/SelectStatus';

const SearchForm = ({onSearch}) => {
    
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        
        onSearch({
            title: data.title, 
            deadlineSearchFrom: data.from, 
            deadlineSearchTo: data.to, 
            status: data.status
        });
        reset()
    }


    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col items-start md:items-center md:flex-row border-b-2 border-blue-500 py-2">

                <InputTitle isRequired={false} register={register} errors={errors}/>

                <InputDeadline label={'From'} register={register}/>
                <InputDeadline label={'To'} register={register}/>

                <SelectStatus register={register}/>

                <div className='flex my-3 md:mt-5 justify-start'>
                    <ButtonSubmit reset={reset} isSearch={true} onCancel={onSearch}/>
                </div>

            </div>
        </form> 
    )
}

export default SearchForm