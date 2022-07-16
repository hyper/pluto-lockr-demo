import { loadPluto } from '@plutohq/pluto-js';
import { PlutoConfig } from '@plutohq/pluto-react';
import { NextSeo } from 'next-seo';
import React from 'react';
import DepositForm from '../components/DepositForm';

function Index() {
  const pluto = loadPluto(process.env.NEXT_PUBLIC_PLUTO_PUBLISHABLE_TEST_KEY);

  return (
    <PlutoConfig pluto={pluto}>
      <NextSeo title="Lockr Demo" noindex />
      <DepositForm />
    </PlutoConfig>
  );
}

export default Index;
