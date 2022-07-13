import { usePayPaymentIntent } from '@plutohq/pluto-react';
import React from 'react';
import ConnectEthWallet from './ConnectEthWallet';

export default function CheckoutForm() {
  const { payPaymentIntent, loading, transaction } = usePayPaymentIntent();

  const handleSubmit = React.useCallback(
    async (event) => {
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
        .then((data) => console.log('🎉 ETH payment intents succeeded:', data))
        .catch(console.error);
    },
    [payPaymentIntent],
  );

  return (
    <form
      id="checkout-form"
      className="flex w-full max-w-lg flex-col items-center space-y-8 p-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-semibold">Sample Checkout</h1>
      <div className="flex w-full flex-col space-y-4">
        <ConnectEthWallet />
        <div className="flex flex-col space-y-1">
          <label htmlFor="name">Name</label>
          <input
            className="rounded border border-gray-200 bg-gray-50 px-2 py-1 outline-none transition hover:ring focus:border-blue-600 focus:ring"
            type="text"
            name="name"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email">Email</label>
          <input
            className="rounded border border-gray-200 bg-gray-50 px-2 py-1 outline-none transition hover:ring focus:border-blue-600 focus:ring"
            type="email"
            name="email"
          />
        </div>
      </div>
      <button
        className="w-full rounded bg-purple-500 py-1 px-2 text-white shadow transition hover:bg-purple-600"
        type="submit"
      >
        {loading ? 'Processing...' : 'Pay now'}
      </button>
      {transaction && (
        <div className="text-xs">{`Your transaction hash: ${transaction}`}</div>
      )}
    </form>
  );
}
