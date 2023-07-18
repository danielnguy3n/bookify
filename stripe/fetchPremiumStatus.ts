import { auth } from "@/firebase";

export default async function fetchPremiumStatus() {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();
  const stripeRole: any = decodedToken?.claims.stripeRole;
  if (!stripeRole) {
    return "Basic";
  } 
  return stripeRole;
}
