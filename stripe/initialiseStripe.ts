import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51NT0dnAWGUZnUEjjGSHFnlh88ogPIJP5cv7ZvCXTG3Ewn3y60XhkQp166ZFh7tiVgELliFGKIvVrw7ICqf4pdZ2K00qInZjfh9"
    );
  }
  return stripePromise;
};
export default initializeStripe;
