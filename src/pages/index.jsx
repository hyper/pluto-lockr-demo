import { loadPluto } from '@plutohq/pluto-js';
import { PlutoConfig } from '@plutohq/pluto-react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';
import DepositForm from '../components/DepositForm';

function Index() {
  const pluto = loadPluto(process.env.NEXT_PUBLIC_PLUTO_PUBLISHABLE_KEY);

  return (
    <PlutoConfig pluto={pluto}>
      <NextSeo title="Lockr Demo" noindex />

      <div className="h-screen overflow-auto bg-neutral-900">
        <div className="flex flex-col">
          <div
            className="z-[100] w-full h-[92px] flex justify-start justify-center fixed top-0 align-middle"
            style={{ backgroundImage: 'url("/img/illustrations/login-navbar-bg.png")', backgroundSize: 'cover' }}
          >
            <Image
              src="/img/logos/lockr.svg"
              className="false w-[110px] cursor-pointer"
              width={110}
              height={92}
              objectFit="contain"
            />
          </div>
          <div className="bg-[#453C37] fixed w-full py-2 px-5 mt-[91px]">
            <div className="text-sm text-center font-light text-neutral-50">
              Please make sure you're connected to the <span className="font-semibold">Rinkeby</span> testnet
            </div>
          </div>
          <div className="w-[100%] min-h-[100vh] bg-neutral-900 flex mx-auto">
            <div className="w-[312px] h-[248px] mt-[200px] mx-auto flex flex-col">
              <div className="text-neutral-100 text-3xl text-center font-medium mb-12">Deposit ETH</div>
              <DepositForm />
            </div>
          </div>
        </div>
      </div>
    </PlutoConfig>
  );
}

export default Index;
