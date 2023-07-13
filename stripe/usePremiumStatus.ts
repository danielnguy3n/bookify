import { useState, useEffect } from "react";
import fetchPremiumStatus from "./fetchPremiumStatus";
import { User } from "firebase/auth";

export default function usePremiumStatus(user: User | null) {
  const [premiumStatus, setPremiumStatus] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        const status: any = await fetchPremiumStatus();
        const stripeRole = status?.claims.stripeRole;
        if (!stripeRole) {
          setPremiumStatus("Basic");
        } else {
          setPremiumStatus(stripeRole);
        }
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}
