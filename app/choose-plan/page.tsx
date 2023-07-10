"use client";

import Image from "next/image";
import pricingTop from "../../public/images/pricing-top.png";
import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import Accordian from "@/components/Choose-Plan/Accordian";

function choosePlan() {


  return (
    <div className="plan">
      <div className="plan__header--wrapper">
        <div className="plan__header">
          <div className="plan__title">
            Get Unlimited Access To Many Amazing Books To Read
          </div>
          <div className="plan__subtitle">
            Turn ordinary moments into amazing learning opprtunities
          </div>
          <figure className="plan__img--mask">
            <Image src={pricingTop} alt="Pricing Image" />
          </figure>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className="plan__features--wrapper">
            <div className="plan__features">
              <figure className="plan__features--icon">
                <AiFillFileText />
              </figure>
              <div className="plan__features--text">
                <b>Key ideas in a few minutes</b> with many books to read
              </div>
            </div>

            <div className="plan__features">
              <figure className="plan__features--icon">
                <RiPlantFill />
              </figure>
              <div className="plan__features--text">
                <b>3 million</b> people growing with Summarist everyday
              </div>
            </div>

            <div className="plan__features">
              <figure className="plan__features--icon">
                <FaHandshake />
              </figure>
              <div className="plan__features--text">
                <b>Precise recommendations</b> collections curated by experts
              </div>
            </div>
          </div>
          <div className="section__title">Choose the plan that fits you</div>
          <div className="plan__card  plan__card--active">
            <div className="plan__card--circle">
              <div className="plan__card--dot"></div>
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
          <div className="plan__card">
            <div className="plan__card--circle">
              <div className="plan__card--dot"></div>
            </div>
            <div className="plan__card--content">
              <div className="plan__card--title">Premium Monthly</div>
              <div className="plan__card--price">$9.99/month</div>
              <div className="plan__card--text">No trial included</div>
            </div>
          </div>
          <div className="plan__card--cta">
            <button className="btn" style={{ width: 300 }}>
              Start your free 7-day trial
            </button>
            <div className="plan__disclaimer">
              Cancel your trial at any time before it ends, and you won't be
              charged.
            </div>
          </div>
          <Accordian />
        </div>
      </div>
    </div>
  );
}

export default choosePlan;
