"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";

import landing from "../public/images/landing.png";

import Feature from "@/components/Home/Feature";
import StatHeadings from "@/components/Home/StatHeadings";
import Statistic from "@/components/Home/Statistic";
import Review from "@/components/Home/Review";
import Numbers from "@/components/Home/Numbers";
import Footer from "@/components/Home/Footer";
import AuthModal from "@/components/Global/AuthModal/AuthModal";
import { openModal } from "@/redux/modalSlice";

import {
  COMPANY_STATS,
  FEATURES,
  REVIEWS,
  STATS,
  STAT_HEADINGS,
  STAT_HEADINGS_RIGHT,
} from "@/components/Global/constants";

export default function Home() {
  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector((state) => state.modals.modalOpen);

  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <h1 className="logo--gradient">Bookify</h1>
          <ul className="nav__list--wrapper">
            <li
              className="nav__list nav__list--login"
              onClick={() => dispatch(openModal())}
            >
              Login
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>

      <section id="landing">
        <div className="row">
          <div className="container">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don’t like to read.
                </div>
                <button
                  className="btn home__cta--btn"
                  onClick={() => dispatch(openModal())}
                >
                  Login
                </button>
                {modalOpen && <AuthModal />}
              </div>
              <figure className="landing__image--mask">
                <Image
                  src={landing}
                  alt="Landing"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <div className="row">
          <div className="container">
            <div className="section__title">
              Understand books in few minutes
            </div>
            <div className="features__wrapper">
              {FEATURES.map(({ icon, subtitle, title }, i) => (
                <Feature key={i} {...{ icon, subtitle, title }} />
              ))}
            </div>
            <div className="statistics__wrapper">
              <StatHeadings headings={STAT_HEADINGS} alignLeft />
              <div className="statistics__content--details">
                {STATS.slice(0, 3).map(({ stat, title, bold }, i) => (
                  <Statistic key={i} {...{ stat, title, bold }} />
                ))}
              </div>
            </div>
            <div className="statistics__wrapper">
              <div className="statistics__content--details statistics__content--details-second">
                {STATS.slice(3, 6).map(({ stat, title, bold }, i) => (
                  <Statistic key={i} {...{ stat, title, bold }} />
                ))}
              </div>
              <StatHeadings headings={STAT_HEADINGS_RIGHT} />
            </div>
          </div>
        </div>
      </section>
      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              {REVIEWS.map(({ name, body, bold }, i) => (
                <Review key={i} {...{ name, body, bold }} />
              ))}
            </div>
            <div className="reviews__btn--wrapper">
              <button
                className="btn home__cta--btn"
                onClick={() => dispatch(openModal())}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="numbers">
        <div className="row">
          <div className="container">
            <div className="section__title">
              Start growing with Bookify now
            </div>
            <div className="numbers__wrapper">
              {COMPANY_STATS.map(({ icon, title, subtitle }, i) => (
                <Numbers key={i} {...{ icon, title, subtitle }} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
