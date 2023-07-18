"use client";

import { useEffect, useState } from "react";
import AuthModal from "../Global/AuthModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openModal } from "@/redux/modalSlice";
import { createCheckoutSession } from "@/stripe/createCheckoutSession";
import { auth, db } from "@/firebase";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { ImSpinner8 } from "react-icons/im";

function PlanSelector() {
  const [yearlyPlan, setYearlyPlan] = useState(true);
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [prices, setPrices] = useState<DocumentData[]>([]);
  const [priceIds, setPriceIds] = useState<string[]>([]);
  const modalOpen = useAppSelector((state) => state.modals.modalOpen);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<string>("plan");

  async function fetchProducts() {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("active", "==", true));

    const querySnapshot = await getDocs(q);
    const productDocs = querySnapshot.docs;

    for (const doc in productDocs) {
      setProducts((prevProducts) => [...prevProducts, productDocs[doc].data()]);

      const priceRef = collection(productDocs[doc].ref, "prices");
      const priceSnap = await getDocs(priceRef);
      const priceDocs = priceSnap.docs;
      for (const doc in priceDocs) {
        setPrices((prevPrices) => [...prevPrices, priceDocs[doc].data()]);
        setPriceIds((prevIds) => [...prevIds, priceDocs[doc].id]);
      }
    }

    setLoading("");
  }

  useEffect(() => {
    fetchProducts();
    const authState = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      setUser(user);
    });
    return authState;
  }, []);


  function handleClick() {
    if (user?.uid) {
      if (yearlyPlan) {
        createCheckoutSession(user?.uid, priceIds[1]);
      } else {
        createCheckoutSession(user?.uid, priceIds[0]);
      }
      setLoading("btn");
    } else {
      dispatch(openModal());
    }
  }

  return (
    <>
      {loading === "plan" ? (
        <div className="spinner--wrapper">
          <ImSpinner8 className="plan--spinner" />
        </div>
      ) : (
        <>
          <div
            className={`plan__card  ${yearlyPlan && `plan__card--active`}`}
            onClick={() => setYearlyPlan(true)}
          >
            <div className="plan__card--circle">
              <div className={` ${yearlyPlan && `plan__card--dot`}`}></div>
            </div>
            <div className="plan__card--content">
              <div className="plan__card--title">
                {products[1]?.name} Yearly
              </div>
              <div className="plan__card--price">
                ${prices[1]?.unit_amount / 100}/year
              </div>
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
              <div className="plan__card--title">
                {products[0]?.name} Monthly
              </div>
              <div className="plan__card--price">
                ${prices[0]?.unit_amount / 100}/month
              </div>
              <div className="plan__card--text">No trial included</div>
            </div>
          </div>
          <div className="plan__card--cta">
            <button
              className="btn"
              style={{ width: 300 }}
              onClick={() => handleClick()}
              disabled={loading === 'btn'}
            >
              {loading === "btn" ? (
                <ImSpinner8 className="login__spinner black--spinner" />
              ) : (
                <>
                  {yearlyPlan
                    ? "Start Your Free 7-day Trial"
                    : "Start Your First Month"}
                </>
              )}
            </button>
            <div className="plan__disclaimer">
              {yearlyPlan
                ? "Cancel your trial at any time before it ends, and you won't be charged."
                : "30-day money back guarantee, no questions asked."}
            </div>
          </div>
        </>
      )}

      {modalOpen && <AuthModal />}
    </>
  );
}

export default PlanSelector;
