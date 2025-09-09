const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret); // Set via Firebase CLI

admin.initializeApp();

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: data.priceId, // Stripe Price ID passed from frontend
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: "https://brookeinternet.github.io/LauraJuneblog/?/success",
      cancel_url: "https://brookeinternet.github.io/LauraJuneblog/?/cancel"
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error("Stripe session error:", error);
    throw new functions.https.HttpsError("internal", "Unable to create Stripe session");
  }
});
