import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

function Accordian() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number>(0);

  function toggleCard(cardNum: number) {
    setActiveCard(activeCard !== cardNum ? cardNum : 0);
  }

  return (
    <div className="faq__wrapper">
      <div className="accordian__card" onClick={() => toggleCard(1)}>
        <div className="accordian__header">
          <div className="accordian__title">
            How does the free 7-day trial work?
          </div>
          <BsChevronDown
            className={`accordian__icon ${
                activeCard === 1 && ` accordian__icon--rotate`
            }`}
          />
        </div>
        <div
          className={`accordian__collapse ${activeCard === 1 ? `show` : ""}`}
        >
          <div className="accordian__inner">
            <div className="accordian__body">
              Begin your complimentary 7-day trial with a Summarist annual
              membership. You are under no obligation to continue your
              subscription, and you will only be billed when the trial period
              expires. With Premium access, you can learn at your own pace and
              as frequently as you desire, and you may terminate your
              subscription prior to the conclusion of the 7-day free trial.
            </div>
          </div>
        </div>
      </div>
      <div className="accordian__card" onClick={() => toggleCard(2)}>
        <div className="accordian__header">
          <div className="accordian__title">
            Can I switch subscriptions from monthly to yearly, or yearly to
            monthly?
          </div>
          <BsChevronDown
            className={`accordian__icon ${
                activeCard === 2 && ` accordian__icon--rotate`
            }`}
          />
        </div>
        <div
          className={`accordian__collapse ${activeCard === 2 ? `show` : ""}`}
        >
          <div className="accordian__inner">
            <div className="accordian__body">
              While an annual plan is active, it is not feasible to switch to a
              monthly plan. However, once the current month ends, transitioning
              from a monthly plan to an annual plan is an option.
            </div>
          </div>
        </div>
      </div>
      <div className="accordian__card" onClick={() => toggleCard(3)}>
        <div className="accordian__header">
          <div className="accordian__title">
            What's included in the Premium Plan?
          </div>
          <BsChevronDown
            className={`accordian__icon ${
                activeCard === 3 && ` accordian__icon--rotate`
            }`}
          />
        </div>
        <div
          className={`accordian__collapse ${activeCard === 3 ? `show` : ""}`}
        >
          <div className="accordian__inner">
            <div className="accordian__body">
              Premium membership provides you with the ultimate Summarist
              experience, including unrestricted entry to many best-selling
              books high-quality audio, the ability to download titles for
              offline reading, and the option to send your reads to your Kindle.
            </div>
          </div>
        </div>
      </div>
      <div className="accordian__card" onClick={() => toggleCard(4)}>
        <div className="accordian__header">
          <div className="accordian__title">
            Can I cancel during my trial or subscription?
          </div>
          <BsChevronDown
            className={`accordian__icon ${
                activeCard === 4 && ` accordian__icon--rotate`
            }`}
          />
        </div>
        <div
          className={`accordian__collapse ${activeCard === 4 ? `show` : ""}`}
        >
          <div className="accordian__inner">
            <div className="accordian__body">
              You will not be charged if you cancel your trial before its
              conclusion. While you will not have complete access to the entire
              Summarist library, you can still expand your knowledge with one
              curated book per day.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordian;
