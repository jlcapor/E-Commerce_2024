import Container from '@/components/Container'
import React from 'react'
import AddProductForm from './AddProductForm'
import FormWrapper from '@/components/FormWrapper'
import getCurrentUser from '@/actions/getCurrentUser';
import NullData from '@/components/NullData';

const AddProductsPage = async() => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'ADMIN'){
    return <NullData title='Oops! Access denield'/>
  };
  return (
    <div className='p-8'>
     <Container>
      <FormWrapper>
       <AddProductForm/>
      </FormWrapper>
     </Container>
    </div>
  )
}

export default AddProductsPage
