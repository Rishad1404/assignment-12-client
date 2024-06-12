import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckOutForm.css';
import { ImSpinner9 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const CheckOutForm = () => {
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const { user } = useAuth()
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false)
    let price = 10;


    useEffect(() => {
        if (price > 1) {
            getClientSecret({ price: price })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [price])

    const getClientSecret = async price => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, price)
        console.log('client secret from server', data);
        setClientSecret(data.clientSecret)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true)
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setProcessing(false)
            setCardError(error.message)
            return
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
        }

        // Confirm Payment
        const{error:confirmError,paymentIntent}= await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email,
                    name: user.displayName, 
                },
            },
        })
        if(confirmError){
            console.log(confirmError)
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }
        if(paymentIntent.status==='succeeded'){
            console.log(paymentIntent)
            
        }
        setProcessing(false)
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full mx-auto bg-violet-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Payment Information</h2>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret || processing} className="w-full flex items-center gap-3 justify-center text-center bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed">
                 {
                    processing ? <ImSpinner9 className='animate-spin' size={24}/>   : `Pay $${price}`
                 }

                </button>
            </form>
            {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
        </>

    );
};


export default CheckOutForm;
