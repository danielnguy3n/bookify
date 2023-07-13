import {
    DocumentData,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import getStripe from "./initialiseStripe";
import { db } from "@/firebase";

export async function createCheckoutSession(uid: string) {
  // Create a new checkout session in the subollection inside this users document

  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: "price_1NTI0VAWGUZnUEjjoROKUfTy",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: DocumentData) => {
    const { sessionId }= snap.data();
    if (sessionId) {
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    }
  });

}
