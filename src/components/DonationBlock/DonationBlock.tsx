import React, { useEffect, useState } from "react";
import { isNumber } from "util";
import NumberFormat from "react-number-format";
import "./DonationBlock.scss";

export const DonationBlock = () => {
  const donationGoal = 5000;
  const minDonation = 5;
  const [donors, setDonors] = useState(0);
  const [totalDonated, setTotalDonated] = useState(0);
  // Can be empty string if the user has not donated yet to not force the input to show a value of $0 and be empty instead
  const [donation, setDonation] = useState<number | string>("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFunded, setIsFunded] = useState(false);

  useEffect(() => {
    if (donation && donation >= minDonation) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [donation]);

  useEffect(() => {
    setProgress((totalDonated / donationGoal) * 100);
  }, [totalDonated]);

  useEffect(() => {
    if (progress >= 100) setIsFunded(true);
  }, [progress]);

  const submitDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isNumber(donation) || donation < minDonation) {
      return;
    }

    setDonors(donors + 1);
    setTotalDonated(totalDonated + donation);
    setDonation("");
  };

  return (
    <div className="donation-block">
      {!isFunded && (
        <div className="popout">
          <p>
            <strong>
              <sup>$</sup>
              <NumberFormat
                value={donationGoal - totalDonated}
                displayType="text"
                thousandSeparator={true}
                decimalScale={0}
              />
            </strong>{" "}
            still needed to fund this project
          </p>
        </div>
      )}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="donation-body">
        <h2>Only four days left to fund this project</h2>
        {isFunded ? (
          <p>
            This project is funded, but you can still join{" "}
            <strong>{donors}</strong> other donors who have already supported
            this project.
          </p>
        ) : (
          <p>
            Join the <strong>{donors}</strong> other donors who have already
            supported this project.
          </p>
        )}
        <form onSubmit={submitDonation}>
          <span className="input-dollar">$</span>
          <NumberFormat
            id="donation-field"
            value={donation}
            placeholder="Enter donation"
            thousandSeparator={true}
            allowNegative={false}
            decimalScale={0}
            onValueChange={({ floatValue }) => {
              setDonation(floatValue || "");
            }}
          />
          <button disabled={isDisabled} type="submit">
            Give Now
          </button>
        </form>
        <div
          className="error"
          style={{
            maxHeight: donation && donation < minDonation ? "20px" : "0px",
          }}
        >
          Your donation must be at least $5.
        </div>
      </div>
    </div>
  );
};
