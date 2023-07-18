'use client'

import Image from "next/image";
import pricingTop from "../../public/images/pricing-top.png";
import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";
import Accordian from "@/components/Choose-Plan/Accordian";
import PlanSelector from "@/components/Choose-Plan/PlanSelector";

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
            <Image src={pricingTop} alt="Pricing Image"  className="plan__img"/>
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
          <PlanSelector />
          <Accordian />
        </div>
      </div>
    </div>
  );
}

export default choosePlan;
