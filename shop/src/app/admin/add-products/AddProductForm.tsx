'use client'
import React, { useState } from 'react';
import Heading from '@/components/Heading';
import Input from '@/components/inputs/Input';
import { FieldValues, useForm } from 'react-hook-form';
import TextArea from '@/components/inputs/TextArea';
import CustomCheckBox from '@/components/inputs/CustomCheckBox';
import { categories } from '@/utils/Categories';
import CategoryInput from '@/components/inputs/CategoryInput';

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm<FieldValues>({
    defaultValues: {
        name: '',
        description: '',
        price: '',
        brand: '',
        category: '',
        inStock: false,
        images: []

    }
  });

  const category = watch('category');
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }
  return (
    <>
      <Heading title='Add a Product' center/>
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='price'
        label='Price'
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id='brand'
        label='Brand'
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <TextArea
        id='description'
        label='Description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox id='inStock' register={register} label='This roduct is in stock'/>

      <div className='w-full font-medium'>
        <div className='mb-2 font-semibold'>Select a Category</div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto'>
          {categories.map((item) => {
            if(item.label === 'All'){
              return null;
            }
            return (
              <div  key={item.label} className='col-span-1'>
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className='w-full flex flex-col flex-wrap gap-4'>
        <div>
          <div className='font-bold'>
            Select the aviable product colors and upload their images.
          </div>
          <div className='text-sm'>
            You must upload an image for each of the color selected otherwise your color selection will be ignored
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default AddProductForm
