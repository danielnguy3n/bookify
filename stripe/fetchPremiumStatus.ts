import { auth } from "@/firebase";
import { useAppDispatch } from "@/redux/store";
import { setPremiumStatus } from "../redux/userSlice";
import { IdTokenResult } from "firebase/auth";

export default async function fetchPremiumStatus(): Promise<IdTokenResult | undefined>{

  await auth.currentUser?.getIdToken();
  const decodedToken = await auth.currentUser?.getIdTokenResult();

  return decodedToken;
}
