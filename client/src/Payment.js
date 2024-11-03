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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTBhYjc2MjI5NjQ4Y2NjZGMzY2I4NCIsImlhdCI6MTczMDYwMzIxNSwiZXhwIjoxNzMxMjA4MDE1fQ.1x9l6jWapAQW-F9da1JgFd7WX27qjrT7ibBGX4Kt-fk";
    
    fetch("http://localhost:5000/api/v1/mentee/createPaymentIntent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        mentorId: "6718d0320d5b01f2ec035d23",
        totalAmount: 1200,
        platformFee: 200,
        timeZone: "Asia/Dhaka",
        start: "2024-11-04T04:30:00+06:00",
        end: "2024-11-04T05:00:00+06:00"
      }),
    })
    .then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    })
    .catch(error => console.error("Error creating PaymentIntent:", error));
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
