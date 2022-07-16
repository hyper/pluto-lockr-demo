const { buffer } = require('micro');
const { Webhook } = require('svix');

const webhook = new Webhook(process.env.PLUTO_WEBHOOK_SECRET);

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const body = (await buffer(req))?.toString();
      const event = webhook.verify(body, req.headers);

      if (event.type === 'payment_intent.succeeded') {
        const payment = event.data;
        console.log(`Payment ${payment.id} for ${payment.amount} ${payment.currency.toUpperCase()} succeeded`);
      }

      if (event.type === 'payment_intent.failed') {
        const payment = event.data;
        console.log(`Payment ${payment.id} for ${payment.amount} ${payment.currency.toUpperCase()} failed`);
      }
    }

    return res.send(202);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
