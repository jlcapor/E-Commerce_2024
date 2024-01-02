'use client'
import React, { useState, useEffect } from 'react'
import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {  FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineGoogle } from 'react-icons/ai'
import axios from 'axios'
import { SafeUser } from '@/types'

interface RegisterFormProps {
  currentUser?: SafeUser | null
}
const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {
    const router= useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    })
    useEffect(() => {
      if(currentUser){
       router.push('/cart');
       router.refresh()
      }
     }, []);

    const onSubmit : SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)
        axios.post('/api/register', data).then(()=>{
          toast.success('Account created')
          signIn('credentials', { 
            email: data.email,
            password: data.password,
            redirect: false,
          }).then((callback) => {
            if (callback?.ok) {
              router.push('/cart');
              router.refresh();
              toast.success('Logged In');
            }

            if(callback?.error){
              toast.error(callback.error)
            }
          });
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false))
    }
    if(currentUser){
        return <p className='text-center'>Logged in. Redirecting... </p>
      }
  return (
    <>
      <Heading title='Sugn up for E-Shop'/>
      <Button 
        outline
        label='Continue with Google' 
        icon={AiOutlineGoogle} 
        onClick={()=>{signIn('google')}}
      />
      <hr className="bg-slate-300 w-full h-px"/>
      <Input 
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />
      <Button label={isLoading ? 'Loading' : 'Sign Up'} onClick={handleSubmit(onSubmit)}/>
      <p className='text-sm'>
        Already have account? {"  "}
        <Link href={'/login'} className='underline'>
            Sign In
        </Link>
      </p>
    </>
  )
}

export default RegisterForm
