export default async function handler(req, res) {
  try {
    const event = req.body;

    if (req.method === 'POST') {
      console.log('Pluto webhook event', event.data.id);

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.id;
        console.log('Payment succeeded', paymentIntent.id);
      }

      if (event.type === 'payment_intent.failed') {
        const paymentIntent = event.data.id;
        console.log('Payment failed', paymentIntent.id);
      }
    }

    return res.status(400).json({ message: 'Invalid request' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
