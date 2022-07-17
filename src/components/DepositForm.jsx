import { usePluto } from '@plutohq/pluto-react';
import React from 'react';
import ConnectWallet from './ConnectWallet';

export default function DepositForm() {
  const pluto = usePluto();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [transaction, setTransaction] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      setError(false);
      setSuccess(false);

      const paymentIntent = await fetch('/api/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
            if (completedPayment.status === 'succeeded') setSuccess(true);
          })
          .catch(() => setError('Something went wrong. Check the console for more details.'))
          .finally(() => setLoading(false));
      }
    },
    [pluto],
  );

  return (
    <div className="flex flex-col items-center">
      <form
        id="checkout-form"
        className="flex w-full max-w-xl flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col space-y-5">
          {transaction && (
            success ? (
              <div className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded text-sm text-neutral-50">
                Your deposit succeeded! Click{' '}
                <a
                  target="_blank"
                  href={`https://rinkeby.etherscan.io/tx/${transaction}`}
                  className="text-amber-600 hover:text-amber-700 outline-none"
                  rel="noreferrer"
                >
                  here
                </a>
                {' '}to view your transaction or refresh this page to try again.
              </div>
            ) : (
              <div className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded text-sm text-neutral-50">
                Your deposit is processing. Click{' '}
                <a
                  target="_blank"
                  href={`https://rinkeby.etherscan.io/tx/${transaction}`}
                  className="text-amber-600 hover:text-amber-700 outline-none"
                  rel="noreferrer"
                >
                  here
                </a>
                {' '}to view your transaction.
              </div>
            )
          )}
          <ConnectWallet />
          <div>
            <div className="flex w-full flex-col space-y-1">
              <label htmlFor="amount" className="text-neutral-400 text-sm">Deposit amount</label>
              <div className="flex rounded overflow-hidden">
                <input
                  className="flex-1 bg-neutral-800 placeholder-neutral-600 text-neutral-50 px-3 py-2.5 focus:outline-none"
                  type="number"
                  step="0.001"
                  name="amount"
                  placeholder="Enter amount in ETH"
                />
                <div className="bg-neutral-700 text-neutral-400 flex items-center px-3 py-2.5">
                  ETH
                </div>
              </div>
              {error && <div className="text-sm text-red-500">{error}</div>}
            </div>
          </div>
        </div>
        <button
          className="w-full rounded bg-[#F1C4A4] hover:bg-opacity-70 disabled:bg-opacity-70 duration-500 font-medium py-3 px-2 transition mt-9"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Deposit now'}
        </button>
      </form>
    </div>
  );
}
