import { usePluto } from '@plutohq/pluto-react';
import React from 'react';
import ConnectEthWallet from './ConnectEthWallet';
import PaymentModal from './PaymentModal';

export default function DepositForm() {
  const pluto = usePluto();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [transaction, setTransaction] = React.useState(null);
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);

      const paymentIntent = await fetch('/api/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
          amount: event.target.amount.value,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            setLoading(false);
            setError(result.error);

            return null;
          }

          return result;
        });

      if (paymentIntent) {
        await pluto.confirmPayment(paymentIntent.id)
          .then(async (data) => {
            setTransaction(data.hash);

            const completedPayment = await pluto.waitForPayment(paymentIntent.id);
            if (completedPayment.status === 'succeeded') setShowPaymentModal(true);
          })
          .catch(console.error)
          .finally(() => setLoading(false));
      }
    },
    [pluto],
  );

  return (
    <div className="flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="83"
        height="24"
        fill="none"
        viewBox="0 0 83 24"
      >
        <path
          fill="#F1C4A4"
          d="M12.575.113c-.02-.106.124-.158.176-.064l3.694 6.69c.18.326.449.595.775.776l6.73 3.733c.094.053.041.197-.065.175l-7.24-1.443a3.383 3.383 0 01-2.657-2.667l-1.413-7.2zM11.248.049L7.554 6.74c-.18.326-.45.595-.775.776l-6.73 3.733c-.094.053-.042.197.065.175l7.24-1.443a3.383 3.383 0 002.657-2.667l1.412-7.2c.02-.106-.123-.158-.175-.064zm12.638 12.528l-7.24 1.443a3.383 3.383 0 00-2.657 2.667l-1.412 7.2c-.02.106.123.158.175.064l3.694-6.69c.18-.326.45-.595.775-.776l6.73-3.733c.094-.053.042-.197-.065-.175zm-13.875 4.11a3.383 3.383 0 00-2.658-2.667L.114 12.577c-.105-.022-.158.123-.065.175l6.73 3.733c.326.181.595.45.775.777l3.694 6.689c.052.094.197.042.175-.064l-1.412-7.2z"
        />
        <path
          fill="#F2F2F9"
          d="M39.938 19.302h-9.75a.188.188 0 01-.188-.187V5.104c0-.104.084-.188.188-.188h1.834c.104 0 .188.084.188.188v12.078c0 .103.084.187.187.187h7.715c.112 0 .199.098.185.209l-.175 1.558a.188.188 0 01-.186.166h.002zM45.832 9.038c2.961 0 5.309 2.31 5.309 5.23 0 2.921-2.35 5.231-5.309 5.231-2.96 0-5.23-2.289-5.23-5.23 0-2.942 2.25-5.23 5.23-5.23zm0 8.684c1.875 0 3.474-1.559 3.474-3.455 0-1.896-1.599-3.435-3.474-3.435-1.875 0-3.414 1.6-3.414 3.435 0 1.836 1.54 3.455 3.414 3.455zM57.335 17.863c1.299 0 2.74-.898 3.11-1.957a.184.184 0 01.215-.118l1.371.296a.19.19 0 01.138.244c-.601 1.866-2.662 3.172-4.816 3.172-3.02 0-5.052-2.191-5.052-5.15 0-3.237 1.855-5.309 5.27-5.309 2.45 0 4.232 1.393 4.59 3.08.019.09-.035.18-.122.211l-1.424.511a.188.188 0 01-.241-.12c-.49-1.408-1.628-2.025-3.218-2.025-1.954 0-3.08 1.52-3.08 3.513 0 1.994 1.382 3.652 3.257 3.652h.002zM64.066 19.114V4.688c0-.103.084-.187.187-.187h1.558c.104 0 .188.084.188.188v8.796c0 .14.168.213.272.117l4.528-4.237a.335.335 0 01.226-.09h2.028c.172 0 .254.212.127.328l-4.196 3.806a.188.188 0 00-.01.269l5.051 5.307a.187.187 0 01-.136.316h-1.987a.186.186 0 01-.139-.06l-4.086-4.388a.189.189 0 00-.258-.017l-1.304 1.089a.332.332 0 00-.119.253v2.934a.188.188 0 01-.188.188H64.25a.188.188 0 01-.188-.188l.004.003zM75.55 19.115V9.516c0-.093.068-.17.16-.186l.693-.11a.189.189 0 01.207.124l.49 1.398c.05.142.243.172.329.048.633-.91 1.713-1.595 3.255-1.595.624 0 1.314.048 1.717.291a.212.212 0 01.1.213l-.202 1.39a.186.186 0 01-.262.143c-.422-.19-.857-.26-1.392-.26-1.718 0-3.237 1.262-3.237 2.9v5.24a.188.188 0 01-.188.187h-1.48a.188.188 0 01-.188-.187l-.001.003z"
        />
      </svg>
      <PaymentModal
        open={showPaymentModal}
        setOpen={setShowPaymentModal}
        transaction={transaction}
      />
      <form
        id="checkout-form"
        className="flex w-full max-w-lg flex-col items-center space-y-8 p-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-white">Deposit ETH</h1>
        {error && (
          <div className="w-full bg-red-100 p-3 border border-red-200 rounded text-sm text-red-800">
            An error occurred: {error}.
          </div>
        )}
        {transaction && (
          <div
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded text-sm text-gray-500 truncate"
          >
            View your transaction:&nbsp;
            <a
              target="_blank"
              href={`https://rinkeby.etherscan.io/tx/${transaction}`}
              className="text-amber-600 hover:text-amber-700 outline-none"
              rel="noreferrer"
            >
              {transaction}
            </a>
          </div>
        )}
        <div className="flex w-full flex-col space-y-4">
          <ConnectEthWallet />
          <div className="flex flex-row gap-2">
            <div className="flex w-full flex-col space-y-1 sm:w-1/3">
              <label htmlFor="name" className="text-white text-sm">Name</label>
              <input
                className="rounded border border-gray-200 bg-gray-50 px-2 py-1 outline-none transition hover:ring focus:border-blue-600 focus:ring"
                type="text"
                name="name"
                placeholder="Erlich Bachman"
              />
            </div>
            <div className="flex w-full flex-col space-y-1 sm:w-2/3">
              <label htmlFor="email" className="text-white text-sm">Email</label>
              <input
                className="rounded border border-gray-200 bg-gray-50 px-2 py-1 outline-none transition hover:ring focus:border-blue-600 focus:ring"
                type="email"
                name="email"
                placeholder="erlich@aviato.com"
              />
            </div>
          </div>
          <div>
            <div className="flex w-full flex-col space-y-1">
              <label htmlFor="amount" className="text-white text-sm">Amount</label>
              <input
                className="rounded border border-gray-200 bg-gray-50 px-2 py-1 outline-none transition hover:ring focus:border-blue-600 focus:ring"
                type="amount"
                name="amount"
                placeholder="1.50000"
              />
            </div>
          </div>
        </div>
        <button
          className="w-full rounded bg-zinc-800 border border-zinc-700 text-white py-2 px-2 shadow transition hover:bg-zinc-700"
          type="submit"
        >
          {loading ? 'Processing...' : 'Pay now'}
        </button>
      </form>
    </div>
  );
}
