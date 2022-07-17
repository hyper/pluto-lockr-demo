import pluto from '../../lib/pluto';

async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      if (!req.body.amount || req.body.amount < 0) return res.status(400).json({ error: 'Invalid amount' });

      const customer = await pluto.customers.create({
        name: req.body.name,
        email: req.body.email,
      });

      const paymentIntent = await pluto.paymentIntents.create({
        chain: 'eth',
        currency: 'eth',
        amount: req.body.amount,
        customer: customer.id,
      });

      return res.send(paymentIntent);
    }

    return res.status(400).json({ message: 'Invalid request' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

export default handler;
