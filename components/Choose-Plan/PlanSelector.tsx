"use client";

import { useState } from "react";
import AuthModal from "../Global/AuthModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openModal } from "@/redux/modalSlice";
import { createCheckoutSession } from "@/stripe/createCheckoutSession";

function PlanSelector() {
  const [yearlyPlan, setYearlyPlan] = useState(true);
  const modalOpen = useAppSelector(state => state.modals.modalOpen)
  const dispatch = useAppDispatch()
  const uid = useAppSelector(state => state.user.uid)
  

  function handleClick() {
    console.log(uid)
    if (uid) {
      createCheckoutSession(uid)
    } else {
      dispatch(openModal())
    }

  }


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
        <button className="btn" style={{ width: 300 }} onClick={() => handleClick()}>
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
      {modalOpen && <AuthModal />}
    </>
  );
}

export default PlanSelector;
