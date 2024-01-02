import Container from '@/components/Container'
import FormWrapper from '@/components/FormWrapper'
import React from 'react'
import RegisterForm from './RegisterForm';
import getCurrentUser from '@/actions/getCurrentUser';

const RegisterPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrapper>
        <RegisterForm currentUser={currentUser}/>
      </FormWrapper>
    </Container>
  )
}

export default RegisterPage