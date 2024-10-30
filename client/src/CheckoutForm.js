import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { HiCreditCard } from "react-icons/hi2";
import { FaPaypal } from "react-icons/fa";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Payment successful!");
    }

    setIsProcessing(false);
  };

  return (
    <div className="max-w-5xl h-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Payment Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Confirm Booking and Pay</h2>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <p className="font-medium mb-2">Choose a Payment Type</p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 rounded-lg text-white font-medium">
              <HiCreditCard />
              Credit or Debit Card
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-white font-medium">
            <FaPaypal />
              PayPal
            </button>
          </div>
        </div>

        {/* Payment Details */}
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <PaymentElement id="payment-element" className=""/>
          </div>

          <div className="flex items-center gap-2 px-3">
            <input
              type="checkbox"
              id="save-billing"
              className="w-4 h-4 mt-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
            />
            <label htmlFor="save-billing" className="text-sm text-gray-700">
              Save billing information for future bookings
            </label>
          </div>

          {/* Terms and Conditions */}
          <p className="text-sm text-gray-600 mt-4">
            By clicking you agree to our <a href="/terms" className="text-blue-600 underline">terms of condition</a> and <a href="/cancellation-policy" className="text-blue-600 underline">cancellation policy</a>.
          </p>

          <button disabled={isProcessing || !stripe || !elements} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-4">
            {isProcessing ? "Processing..." : "Confirm and Pay"}
          </button>

          {message && <div id="payment-message" className="text-red-600 mt-2">{message}</div>}
        </form>
      </div>

      {/* Booking Details Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Your Booking</h3>
        
        <div className="flex items-center mb-6">
          <img src="https://thumbs.wbm.im/pw/small/39573f81d4d58261e5e1ed8f1ff890f6.jpg" alt="Mentor" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="font-medium">Willkie Tan</p>
            <p className="text-sm text-gray-500">VP of Growth at Pexel</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="material-icons">Event date: </span>
            <p>Thurs, 27 Jul 2020</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="material-icons">Access time: </span>
            <p>13:00 - 14:00 AEST (60 mins)</p>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4 mb-4">
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <p>Session Fee</p>
            <p>$100 AUD</p>
          </div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <p>Transaction Fee</p>
            <p>$20 AUD</p>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <p>Total Cost</p>
            <p>$120 AUD</p>
          </div>
        </div>

        <h4 className="text-lg font-semibold mb-2">Cancellation Policies</h4>
        <p className="text-sm text-gray-600">
          Full refund of the session fee for cancellation 24hrs before session. Transaction fee will not be refunded. If your mentor cancels session prior to commencing, you will be entitled to the full refund of session and transaction fees. <a href="/cancellation-policy" className="text-blue-600 underline">View cancellation policy here</a>.
        </p>
      </div>
    </div>
  );
}
