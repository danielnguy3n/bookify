"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";

function PlanSelector() {
  const [yearlyPlan, setYearlyPlan] = useState(true);
  const [login, setLogin] = useState(false);

  return (
    <>
      <div
        className={`plan__card  ${yearlyPlan && `plan__card--active`}`}
        onClick={() => setYearlyPlan(true)}
      >
        <div className="plan__card--circle">
          <div className={` ${yearlyPlan && `plan__card--dot`}`}></div>
        </div>
        <div className="plan__card--content">
          <div className="plan__card--title">Premium Plus Yearly</div>
          <div className="plan__card--price">$99.99/year</div>
          <div className="plan__card--text">7-day free trial included</div>
        </div>
      </div>
      <div className="plan__card--separator">
        <div className="plan__separator">or</div>
      </div>
      <div
        className={`plan__card  ${!yearlyPlan && `plan__card--active`}`}
        onClick={() => setYearlyPlan(false)}
      >
        <div className="plan__card--circle">
          <div className={` ${!yearlyPlan && `plan__card--dot`}`}></div>
        </div>
        <div className="plan__card--content">
          <div className="plan__card--title">Premium Monthly</div>
          <div className="plan__card--price">$9.99/month</div>
          <div className="plan__card--text">No trial included</div>
        </div>
      </div>
      <div className="plan__card--cta">
        <button className="btn" style={{ width: 300 }} onClick={() => setLogin(true)}>
          {yearlyPlan
            ? "Start Your Free 7-day Trial"
            : "Start Your First Month"}
        </button>
        <div className="plan__disclaimer">
          {yearlyPlan
            ? "Cancel your trial at any time before it ends, and you won't be charged."
            : "30-day money back guarantee, no questions asked."}
        </div>
      </div>
      {login && <AuthModal setLogin={setLogin} />}
    </>
  );
}

export default PlanSelector;
