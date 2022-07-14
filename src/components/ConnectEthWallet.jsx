import { ConnectEthWallet as ConnectWallet } from '@plutohq/pluto-react';
import React from 'react';

export default function ConnectEthWallet() {
  return (
    <ConnectWallet>
      {({ address, connectors, connect, disconnect }) => (
        <div className="flex flex-col space-y-1">
          <div className="flex items-end justify-between space-x-8">
            <label htmlFor="address">
              {address ? 'Wallet address' : 'Connect a wallet'}
            </label>
            {address && (
              <button
                className="rounded text-sm text-red-500 transition hover:underline"
                type="button"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            )}
          </div>
          {address ? (
            <input
              readOnly
              className="rounded border border-gray-200 bg-gray-50 px-2 py-1 outline-none transition hover:ring focus:border-blue-600 focus:ring"
              type="text"
              name="address"
              value={address}
            />
          ) : (
            <div className="flex flex-col flex-wrap gap-2 sm:flex-row">
              {connectors.map((connector) => (
                <button
                  className="flex-1 rounded border border-gray-200 bg-gray-50 py-1 px-2 transition hover:bg-gray-200"
                  key={connector.id}
                  type="button"
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </ConnectWallet>
  );
}
