import "./App.css";
import Payment from "./Payment";
import Completion from "./Completion";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServiceBillingForm from "./ServiceBillingForm";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/serviceAndBilling" element={<ServiceBillingForm/>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
