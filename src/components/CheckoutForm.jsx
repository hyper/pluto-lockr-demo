import { usePluto } from '@plutohq/pluto-react';
import React from 'react';
import ConnectEthWallet from './ConnectEthWallet';

export default function CheckoutForm() {
  const pluto = usePluto();
  const [loading, setLoading] = React.useState(false);
  const [transaction, setTransaction] = React.useState(null);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);

      const paymentIntent = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
        }),
      }).then(async (res) => res.json())
        .catch(console.err);

      await pluto.confirmPayment(paymentIntent.id)
        .then(async (data) => {
          setTransaction(data.hash);
          const completedPayment = await pluto.pollPayment(paymentIntent.id);

          if (completedPayment.status === 'succeeded') setLoading(false);
        })
        .catch(console.error);
    },
    [pluto],
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
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex w-full flex-col space-y-1 sm:w-1/3">
            <label htmlFor="name">Name</label>
            <input
              className="rounded border border-gray-200 bg-gray-50 px-2 py-1 outline-none transition hover:ring focus:border-blue-600 focus:ring"
              type="text"
              name="name"
              placeholder="Erlich Bachman"
            />
          </div>
          <div className="flex w-full flex-col space-y-1 sm:w-2/3">
            <label htmlFor="email">Email</label>
            <input
              className="rounded border border-gray-200 bg-gray-50 px-2 py-1 outline-none transition hover:ring focus:border-blue-600 focus:ring"
              type="email"
              name="email"
              placeholder="erlich@aviato.com"
            />
          </div>
        </div>
      </div>
      <button
        className="w-full rounded bg-purple-500 py-1 px-2 text-white shadow transition hover:bg-purple-600"
        type="submit"
      >
        {loading ? 'Processing...' : 'Pay 0.01 ETH'}
      </button>
      {transaction && (
        <div className="text-xs">
          Your transaction hash:&nbsp;
          <a
            target="_blank"
            href={`https://rinkeby.etherscan.io/tx/${transaction}`}
            className="text-purple-500 hover:text-purple-700"
            rel="noreferrer"
          >
            {transaction}
          </a>
        </div>
      )}
    </form>
  );
}
