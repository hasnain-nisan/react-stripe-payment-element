import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(
      loadStripe("pk_test_51QBpgXQI0mqpaum0oMTjxkU8U2Bu4QKtJ9Iv6gOPyhj9xoPeyO63RKBI96m6txQCb8H4JFHMiFdDZUOLzPnfpILT00RQWo8lOU")
    );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/mentee/createPaymentIntent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  // Custom styling options for PaymentElement
  const appearance = {
    theme: 'stripe',
    variables: {
      fontFamily: 'Raleway',
      fontSizeBase: '16px',
      colorText: '#333',
      colorBackground: '#f9f9f9',
      colorPrimary: '#0d6efd',
    },
    rules: {
      '.Input': {
        padding: '12px 10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
      },
    },
  };

  return (
    <>
      {/* <h1 className="text-center text-2xl font-semibold mb-6">React Stripe and the Payment Element</h1> */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
