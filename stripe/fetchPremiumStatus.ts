import { auth } from "@/firebase";
import { IdTokenResult } from "firebase/auth";

export default async function fetchPremiumStatus(): Promise<IdTokenResult | undefined>{

  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();

  return decodedToken;
}
