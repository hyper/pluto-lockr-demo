import { Pluto } from '@plutohq/pluto-node';

const pluto = new Pluto(process.env.PLUTO_SECRET_TEST_KEY, {
  serverUrl: 'https://api.prism.rest/v1',
});

export default pluto;
