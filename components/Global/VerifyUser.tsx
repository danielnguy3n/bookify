"use client";

import { auth } from "@/firebase";
import { setAuth, setAuthLoading } from "@/redux/authSlice";
import { useAppDispatch } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
import {
  getIdToken,
  getIdTokenResult,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react";

function VerifyUser() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getIdToken(user, true);
        const decodedToken = await getIdTokenResult(user);

        const userObj = {
          uid: user.uid,
          email: user.email,
          subscriptionPlan: decodedToken.claims.stripeRole || "Basic",
        };

        dispatch(setUser(userObj));
        dispatch(setAuth({ isAuth: true }));
      } else {
        dispatch(setAuth({ isAuth: false }));
      }
      dispatch(setAuthLoading({ authLoading: false }));
    });

    return unsubscribe;
  }, [dispatch]);

  return <></>;
}

export default VerifyUser;
