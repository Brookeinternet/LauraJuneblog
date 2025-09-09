const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_..."); // Replace with your Stripe secret key

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId, // Stripe Price ID from frontend
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: "https://brookeinternet.github.io/LauraJuneblog/?/success",
      cancel_url: "https://brookeinternet.github.io/LauraJuneblog/?/cancel"
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Unable to create session" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
