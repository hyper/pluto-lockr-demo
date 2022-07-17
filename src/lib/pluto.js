import { Pluto } from '@plutohq/pluto-node';

const pluto = new Pluto(process.env.PLUTO_SECRET_KEY);

export default pluto;
