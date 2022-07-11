import { ConnectEthWallet as ConnectWallet } from '@plutohq/pluto-react';
import React from 'react';

export default function ConnectEthWallet() {
  return (
    <ConnectWallet>
      {({
        account, connectors, connect, disconnect,
      }) => (
        <div>
          <div>
            <label>
              {account?.address ? 'Wallet address' : 'Connect a wallet'}
            </label>
            {account?.address && (
              <button type="button" onClick={() => disconnect()}>
                Disconnect
              </button>
            )}
          </div>
          {account?.address ? (
            <div>{account.address}</div>
          ) : (
            <div>
              {connectors.map((connector) => (
                <button
                    key={connector.id}
                    type="button"
                    onClick={() => connect(connector)}
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
