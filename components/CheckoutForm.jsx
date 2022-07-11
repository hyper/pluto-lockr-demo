import { usePayPaymentIntent } from '@plutohq/pluto-react';
import React from 'react';
import ConnectEthWallet from './ConnectEthWallet';

export default function CheckoutForm() {
  const { payPaymentIntent, loading, transaction } = usePayPaymentIntent();

  const handleSubmit = React.useCallback(async (event) => {
    event.preventDefault();

    const paymentIntent = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
      }),
    });

    await payPaymentIntent(paymentIntent.id)
      .then((data) => {
        console.log('🎉 ETH payment intents succeeded:', data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [payPaymentIntent]);

  return (
    <form id="checkout-form" onSubmit={handleSubmit}>
      <ConnectEthWallet />
      <input type="text" name="name" />
      <input type="text" name="email" />
      <button type="submit">{loading ? 'Processing...' : 'Pay now'}</button>
      {transaction && (
        <div>
          Your transaction hash:
          {transaction}
        </div>
      )}
    </form>
  );
}
