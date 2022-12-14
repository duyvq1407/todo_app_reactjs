import React from 'react'
import {useForm} from 'react-hook-form'
import ButtonSubmit from '../Form/Button';
import InputDeadline from '../Form/InputDeadline';
import InputTitle from '../Form/InputTitle';
import SelectStatus from '../Form/SelectStatus';

const AddForm = ({onAdd}) => {
    
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        if (data.status === '') {
            data.status = 'todo'
        } 
        if (data.deadline === ''){
            data.deadline = new Date().toISOString().split('T')[0];
        }
        onAdd({...data, id: new Date().getTime()});
        reset()
    }
    
    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col items-start md:items-center md:flex-row border-b border-black py-2">

                <InputTitle isRequired={true} register={register} errors={errors}/>

                <InputDeadline label={'Deadline'} register={register}/>

                <SelectStatus register={register}/>
                
                <div className='flex my-3 md:mt-5 justify-center'>
                    <ButtonSubmit reset={reset}/>
                </div>

            </div>
        </form> 
    )
}

export default AddForm