"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useCart } from '@/hooks/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CheckoutForm from './CheckoutForm';
import Button from '@/components/Button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccesst] = useState(false);

  const router = useRouter();

  
  useEffect(() =>{
    if(cartProducts){
        setLoading(true);
        setError(false);
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: cartProducts,
                payment_intent_id: paymentIntent
            })
        }).then((response)=>{
            setLoading(false);
            if(response.status === 401){
                return router.push('/login')
            }

            return response.json()
        }).then((data)=>{
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id)
        }).catch((error) => {
            setError(true);
            toast.error('Something went wrong')
        })
    }
  }, [cartProducts, paymentIntent])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
        theme: 'stripe',
        labels: "floating"
    }
  }

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccesst(value);
  }, [])
  return (
    <div className='w-full'>
      {clientSecret && cartProducts &&(
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm 
                clientSecret={clientSecret} 
                handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
        </Elements>
      )}

      {loading && <div className='text-center'>Loading Checkout</div>}
      {error && <div className='text-center text-red-500'>Something went wrong...</div>}
      {paymentSuccess && 
        <div className='flex items-center flex-col gap-4'>
            <div className='text-teal-500 text-center'>Payment Success</div>
            <div className='max-w-[120px] w-full'>
                <Button label='View Your Orders' onClick={() => router.push('/order')}/>
            </div>
        </div>
      }
    </div>
  )
}

export default CheckoutClient
