import Container from '@/components/Container'
import FormWrapper from '@/components/FormWrapper'
import React from 'react'
import CheckoutClient from './CheckoutClient'

const CheckoutPage = () => {
  return (
    <div className='p-8'>
      <Container>
        <FormWrapper>
            <CheckoutClient/>
        </FormWrapper>
      </Container>
    </div>
  )
}

export default CheckoutPage
