'use client'

import Image from "next/image";
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import Feature from "@/components/Home/Feature";
import StatHeadings from "@/components/Home/StatHeadings";
import Statistic from "@/components/Home/Statistic";
import Review from "@/components/Home/Review";
import Numbers from "@/components/Home/Numbers";
import Footer from "@/components/Home/Footer";
import AuthModal from "@/components/Global/AuthModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openModal } from "@/redux/modalSlice";

export default function Home() {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(state => state.modals.modalOpen)

  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image src="/images/logo.png" alt="logo" width={200} height={45} />
          </figure>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={() => dispatch(openModal())}>Login</li>
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
                <button className="btn home__cta--btn" onClick={() => dispatch(openModal())}>Login</button>
                 {modalOpen && <AuthModal/>}
              </div>
              <figure className="landing__image--mask">
                <Image
                  src="/images/landing.png"
                  alt="Landing"
                  width={400}
                  height={400}
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
              <Feature
                icon={<AiFillFileText />}
                title="Read or listen"
                subtitle="Save time by getting the core ideas from the best books."
              />
              <Feature
                icon={<AiFillBulb />}
                title="Find your next read"
                subtitle="Explore book lists and personalized recommendations."
              />
              <Feature
                icon={<AiFillAudio />}
                title="Briefcasts"
                subtitle="Gain valuable insights from briefcasts."
              />
            </div>
            <div className="statistics__wrapper">
              <StatHeadings
                alignLeft={true}
                heading1="Enhance your knowledge"
                heading2="Achieve greater success"
                heading3="Improve your health"
                heading4="Develop better parenting skills"
                heading5="Increase happiness"
                heading6="Be the best version of yourself"
              />
              <div className="statistics__content--details">
                <Statistic
                  stat={93}
                  title="of Summarist members significantly increase reading
                    frequency."
                  boldText="significantly increase"
                />
                <Statistic
                  stat={96}
                  title="of Summarist members establish better habits."
                  boldText="establish better"
                />
                <Statistic
                  stat={90}
                  title="have made significant positive change to their lives."
                  boldText="significant positive"
                />
              </div>
            </div>
            <div className="statistics__wrapper">
              <div className="statistics__content--details statistics__content--details-second">
                <Statistic
                  stat={91}
                  title="of Summarist members report feeling more productive
                  after incorporating the service into their daily routine."
                  boldText="report feeling more productive"
                />
                <Statistic
                  stat={94}
                  title="of Summarist members have noticed an improvement in
                  their overall comprehension and retention of information."
                  boldText="noticed an improvement"
                />
                <Statistic
                  stat={88}
                  title="of Summarist members feel more informed about current
                  events and industry trends since using the platform."
                  boldText="feel more informed"
                />
              </div>
              <StatHeadings
                alignLeft={false}
                heading1="Expand your learning"
                heading2="Accomplish your goals"
                heading3="Strengthen your vitality"
                heading4="Become a better caregiver"
                heading5="Improve your mood"
                heading6="Maximize your abilities"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              <Review
                name="Hanna M."
                body="This app has been a game-changer for me! It's saved me
                  so much time and effort in reading and comprehending books.
                  Highly recommend it to all book lovers."
                boldText="game-changer"
              />
              <Review
                name="David B."
                body="I love this app! It provides
                concise and accurate summaries of books in a way that
                is easy to understand. It's also very user-friendly and
                intuitive."
                boldText="concise and accurate summaries"
              />
              <Review
                name="Nathan S."
                body="This app is a great way to get the main takeaways from a book
                without having to read the entire thing.
                The summaries are well-written and informative.
                Definitely worth downloading."
                boldText="The summaries are well-written and informative."
              />
              <Review
                name="Ryan R."
                body="If you're a busy person who
                loves reading but doesn't have the time to read every
                book in full, this app is for you! The summaries are thorough
                and provide a great overview of the book's content."
                boldText="loves reading but doesn't have the time"
              />
            </div>
            <div className="reviews__btn--wrapper">
              <button className="btn home__cta--btn" onClick={() => dispatch(openModal())}>Login</button>
            </div>
          </div>
        </div>
      </section>
      <section id="numbers">
        <div className="row">
          <div className="container">
            <div className="section__title">
              Start growing with Summarist now
            </div>

            <div className="numbers__wrapper">
              <Numbers
                icon={<BiCrown style={{ fontSize: "48px" }} />}
                title="3 Million"
                subtitle="Download on all platforms"
              />
              <Numbers
                icon={
                  <>
                    <BsStarFill style={{ fontSize: "20px" }} />
                    <BsStarFill style={{ fontSize: "20px" }} />
                    <BsStarFill style={{ fontSize: "20px" }} />
                    <BsStarFill style={{ fontSize: "20px" }} />
                    <BsStarHalf style={{ fontSize: "20px" }} />
                  </>
                }
                title="4.5 Stars"
                subtitle="Average ratings on iOS and Google Play"
              />
              <Numbers
                icon={<RiLeafLine style={{ fontSize: "48px" }} />}
                title="97%"
                subtitle="Of Summarist members create a better reading habit"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
