import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ServiceBillingForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [serviceType, setServiceType] = useState("volunteer");
  const [hourlyRate, setHourlyRate] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bsb, setBsb] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleHourlyRateChange = (e) => {
    const rate = e.target.value;
    setHourlyRate(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object
    const data = {
      token: token,
      paidOrVoluntary: serviceType,
      amountPerHour: serviceType === "paid" ? hourlyRate : 0,
      accountHolderName: serviceType === "paid" ? accountHolderName : null,
      bsb: serviceType === "paid" ? bsb : null,
      accountNumber: serviceType === "paid" ? accountNumber : null,
    };

    try {
      const response = await fetch("http://localhost:5000/api/v1/mentor/onboarding/setServiceAndBillingInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        if (result.onboardingUrl) {
          // Redirect to the onboarding URL
          window.location.href = result.onboardingUrl; // Use window.location.href for external URLs
        } else {
          // Handle success without redirect
          console.log("Form submitted successfully:", result);
          // alert("Form submitted successfully!");
          navigate('/login')
        }
      } else {
        // Handle errors from the backend
        console.error("Error:", result);
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("An error occurred. Please check your network connection and try again.");
    }
  };

  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-6 my-3 bg-blue-50 rounded-lg shadow-md">
        <div className="mb-4 text-center">
          <p className="text-gray-600 font-medium">Step 3 of 3</p>
          <h2 className="text-2xl font-semibold">Service and billing information</h2>
          <p className="text-gray-500 mt-2">
            Set your hourly rate and provide your billing information you wish to be paid to. Some more information here -
          </p>
        </div>

        {/* Service Rates Section */}
        <div className="mb-6">
          <div className="flex gap-4">
            <button
              className={`flex-1 py-4 px-4 border rounded-lg ${
                serviceType === "volunteer" ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 text-black"
              }`}
              onClick={() => setServiceType("volunteer")}
            >
              <div className="flex items-center gap-2">
                <span role="img" aria-label="volunteer" className={serviceType === "volunteer" ? "text-white" : "text-blue-500"}>👐</span>
                <div>
                  <p className="font-semibold">Volunteer</p>
                  <p className="text-sm">You won&apos;t be paid for your mentoring services</p>
                </div>
              </div>
            </button>

            <button
              className={`flex-1 py-4 px-4 border rounded-lg ${
                serviceType === "paid" ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 text-black"
              }`}
              onClick={() => setServiceType("paid")}
            >
              <div className="flex items-center gap-2">
                <span role="img" aria-label="paid" className={serviceType === "paid" ? "text-white" : "text-blue-500"}>💰</span>
                <div>
                  <p className="font-semibold">Paid work</p>
                  <p className="text-sm">You will be paid based on what you price</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Hourly Rate Section - only show if "Paid work" is selected */}
        {serviceType === "paid" && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Hourly rate*</h3>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter your hourly rate"
                value={hourlyRate}
                onChange={handleHourlyRateChange}
                className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none ${
                  error ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        )}

        {/* Billing Information Section - only show if "Paid work" is selected */}
        {serviceType === "paid" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Billing information</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name of account holder</label>
                <input
                  type="text"
                  placeholder="Enter name of your account"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">BSB</label>
                <input
                  type="text"
                  placeholder="e.g. 112-879"
                  value={bsb}
                  onChange={(e) => setBsb(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Account number</label>
                <input
                  type="text"
                  placeholder="e.g. 123456789"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button className="text-blue-500 font-semibold hover:underline">Back</button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceBillingForm;
