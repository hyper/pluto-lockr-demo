import { PlutoConfig } from '@plutohq/pluto-react';
import { NextSeo } from 'next-seo';
import React from 'react';
import CheckoutForm from '../components/CheckoutForm';

function Index() {
  const value = React.useMemo(() => ({ key: process.env.NEXT_PUBLIC_PLUTO_PUBLISHABLE_TEST_KEY }), []);

  return (
    <PlutoConfig options={value}>
      <NextSeo title="Pluto Crypto Checkout Quickstart" noindex />
      <CheckoutForm />
    </PlutoConfig>
  );
}

export default Index;
