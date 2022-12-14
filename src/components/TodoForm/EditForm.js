import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import ButtonSubmit from '../Form/Button';
import InputDeadline from '../Form/InputDeadline';
import InputTitle from '../Form/InputTitle';
import SelectStatus from '../Form/SelectStatus';

const EditForm = ({onUpdate, todoEdit}) => {
    
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        onUpdate({...todoEdit, ...data});
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
            <div className="flex flex-col md:flex-row items-start md:items-center border-b border-black py-2">

                <InputTitle isRequired={true} register={register} errors={errors}/>

                <InputDeadline label={'Deadline'} register={register}/>

                <SelectStatus register={register}/>

                <div className='flex md:mt-0 my-3'>
                    <ButtonSubmit reset={reset} onCancel={onUpdate} isEdit={true}/>
                </div>

            </div>
        </form> 
    )
}

export default EditForm