import Container from '@/components/Container'
import FormWrapper from '@/components/FormWrapper'
import React from 'react'
import LoginForm from './LoginForm'
import getCurrentUser from '@/actions/getCurrentUser';

const LoginPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrapper>
        <LoginForm currentUser={currentUser}/>
      </FormWrapper>
    </Container>
  )
}

export default LoginPage
