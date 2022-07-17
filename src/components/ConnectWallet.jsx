import { ArrowRightIcon } from '@heroicons/react/solid';
import { ConnectEthWallet } from '@plutohq/pluto-react';
import Image from 'next/image';
import React from 'react';

export default function ConnectWallet() {
  return (
    <ConnectEthWallet>
      {({ address, connectors, connect, disconnect }) => (
        <div className="flex flex-col space-y-1">
          <div className="flex items-end justify-between">
            <label htmlFor="address" className="text-neutral-400 text-sm">
              {address ? 'Wallet address' : 'Connect a wallet'}
            </label>
            {address && (
              <button
                className="rounded text-sm transition text-amber-600 hover:text-amber-700"
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
              className="rounded bg-neutral-800 placeholder-neutral-600 text-neutral-50 px-3 py-2.5 focus:outline-none"
              type="text"
              name="address"
              value={address}
            />
          ) : (
            <div className="border border-neutral-700 bg-neutral-800 rounded divide-y divide-neutral-700">
              {connectors.map((connector) => (
                <button
                  className="group relative block w-full appearance-none px-3 py-2.5 text-white"
                  type="button"
                  onClick={() => connect({ connector })}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        alt=""
                        src={`/img/logos/${connector.name.split(' ')[0].toLowerCase()}.svg`}
                        width={20}
                        className="rounded-full"
                        height={20}
                      />
                      <div className="text-sm text-neutral-50 ml-2 group-hover:underline">{connector.name}</div>
                    </div>
                    <ArrowRightIcon className="justify-self-end h-4 w-4 text-neutral-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </ConnectEthWallet>
  );
}
