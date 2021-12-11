import React from "react";
import { DonationBlock } from "./components/DonationBlock/DonationBlock";
import "./App.scss";

const MIN_DONATION = 5;
const DONATION_GOAL = 5000;

function App() {
  return (
    <div className="app">
      <DonationBlock minDonation={MIN_DONATION} donationGoal={DONATION_GOAL} />
    </div>
  );
}

export default App;
