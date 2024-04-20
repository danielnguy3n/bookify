import React from "react";

import {
  AiFillFileText,
  AiFillBulb,
  AiFillAudio,
  AiOutlineHome,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BiCrown } from "react-icons/bi";
import {
  BsStarFill as StarIcon,
  BsStarHalf as HalfStarIcon,
  BsBookmark,
} from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RiBallPenLine, RiLeafLine } from "react-icons/ri";

export const FEATURES = [
  {
    icon: <AiFillFileText />,
    title: "Read or listen",
    subtitle: "Save time by getting the core ideas from the best books.",
  },
  {
    icon: <AiFillBulb />,
    title: "Find your next read",
    subtitle: "Explore book lists and personalized recommendations.",
  },
  {
    icon: <AiFillAudio />,
    title: "Briefcasts",
    subtitle: "Gain valuable insights from briefcasts.",
  },
];

export const STAT_HEADINGS = [
  "Enhance your knowledge",
  "Achieve greater success",
  "Improve your health",
  "Develop better parenting skills",
  "Increase happiness",
  "Be the best version of yourself",
];

export const STAT_HEADINGS_RIGHT = [
  "Expand your learning",
  "Accomplish your goals",
  "Strengthen your vitality",
  "Become a better caregiver",
  "Improve your mood",
  "Maximize your abilities",
];

export const REVIEWS = [
  {
    name: "Alice M.",
    body: "This app has been a game-changer for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.",
    bold: "game-changer",
  },
  {
    name: "Daniel N.",
    body: "I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It's also very user-friendly and intuitive.",
    bold: "concise and accurate summaries",
  },
  {
    name: "Emily P.",
    body: "This app is a great way to get the main takeaways from a book without having to read the entire thing.The summaries are well-written and informative. Definitely worth downloading.",
    bold: "The summaries are well-written and informative.",
  },
  {
    name: "Michael J.",
    body: "If you're a busy person who  loves reading but doesn't have the time to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.",
    bold: "loves reading but doesn't have the time",
  },
];

export const STATS = [
  {
    stat: 93,
    title: "of Bookify members significantly increase reading frequency.",
    bold: "establish better",
  },
  {
    stat: 96,
    title: "of Bookify members establish better habits.",
    bold: "establish better",
  },
  {
    stat: 90,
    title: "have made significant positive change to their lives.",
    bold: "significant positive",
  },
  {
    stat: 91,
    title:
      "of Bookify members report feeling more productive after incorporating the service into their daily routine.",
    bold: "report feeling more productive",
  },
  {
    stat: 90,
    title:
      "of Bookify members have noticed an improvement in their overall comprehension and retention of information.",
    bold: "noticed an improvement",
  },
  {
    stat: 90,
    title:
      "of Bookify members feel more informed about current events and industry trends since using the platform.",
    bold: "feel more informed",
  },
];

export const COMPANY_STATS = [
  {
    icon: <BiCrown style={{ fontSize: "48px" }} />,
    title: "3 Million",
    subtitle: "Download on all platforms",
  },
  {
    icon: (
      <>
        {new Array(4).fill(0).map((_,i) => (
          <StarIcon key={i} />
        ))}
        <HalfStarIcon />
      </>
    ),
    title: "4.5 Stars",
    subtitle: "Average ratings on iOS and Google Play",
  },
  {
    icon: <RiLeafLine style={{ fontSize: "48px" }} />,
    title: "97%",
    subtitle: "Of Bookify members create a better reading habit",
  },
];

export const NAV_LINKS = [
  {
    href: "/for-you",
    icon: <AiOutlineHome />,
    text: "For You",
  },
  {
    href: "/library",
    icon: <BsBookmark />,
    text: "My Library",
  },
  {
    href: "/",
    icon: <RiBallPenLine />,
    text: "Highlights",
    disabled: true,
  },
  {
    href: "/",
    icon: <HiMagnifyingGlass />,
    text: "Search",
    disabled: true,
  },
  {
    href: "/settings",
    icon: <CiSettings />,
    text: "Settings",
  },
  {
    href: "/",
    icon: <AiOutlineQuestionCircle />,
    text: "Help & Support",
    disabled: true,
  },
];

export const FONT_SIZES = [
  {
    name: "s",
    fontSize: 16,
  },
  {
    name: "m",
    fontSize: 18,
  },
  {
    name: "l",
    fontSize: 22,
  },
  {
    name: "xl",
    fontSize: 26,
  },
];

export const CHOOSE_PLAN_FAQ = [
  {
    id: 1,
    title: "How does the free 7-day trial work?",
    body: "Begin your complimentary 7-day trial with a Bookify annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace andas frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
  },
  {
    id: 2,
    title:
      "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    body: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
  },
  {
    id: 3,
    title: "What is included in the Premium Plan?",
    body: "Premium membership provides you with the ultimate Bookify experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
  },
  {
    id: 4,
    title: "Can I cancel during my trial or subscription?",
    body: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Bookify library, you can still expand your knowledge with one curated book per day.",
  },
];

export const FOOTER_BLOCKS = [
  {
    title: "Actions",
    links: ["Bookify Magazine", "Cancel Subscription", "Help", "Contact us"],
  },
  {
    title: "Useful Links",
    links: [
      "Pricing",
      "Bookify Business",
      "Gift Cards",
      "Authors & Publishers",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Code of Conduct"],
  },
  {
    title: "Other",
    links: ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"],
  },
];
