import React from "react";

function Completion() {
  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      {/* Confirmation Icon and Message */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-center">Confirmation</h1>
      <p className="text-center text-gray-700 mt-2">
        Thank you for booking a session! You will receive an email with a
        Meeting Link and receipt invoice for your session.
      </p>

      {/* Booking Details */}
      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <h2 className="text-lg font-semibold mb-4">Your booking</h2>
        <div className="flex items-center mb-4">
          <img
            src="https://thumbs.wbm.im/pw/small/39573f81d4d58261e5e1ed8f1ff890f6.jpg"
            alt="Mentor"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-medium">Willkie Tan</p>
            <p className="text-sm text-gray-500">VP of Growth at Pexel</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="material-icons">Event date: </span>
            <p>Thurs, 27 Jul 2020</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="material-icons">Access time: </span>
            <p>13:00 - 14:00 AEST (60 mins)</p>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <p>Session fee</p>
            <p>$100 AUD</p>
          </div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <p>Transaction fee</p>
            <p>$20 AUD</p>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <p>Total cost</p>
            <p>$120 AUD</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg">
          Return Home
        </button>
        <button className="border border-blue-600 text-white px-4 py-2 rounded-lg">
          View Booking
        </button>
      </div>
    </div>
  );
}

export default Completion;
