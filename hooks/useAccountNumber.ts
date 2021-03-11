import { Base64 } from "js-base64";
import { useRouter } from "next/router";
import { useTracking } from "./useTracking";

export const useAccountNumber = () => {
  const router = useRouter();
  const trackEvent = useTracking();
  const encodedAccountNumber = router.query["id"] as string;

  const getAccountNumber = () => {
    try {
      return encodedAccountNumber
        ? decodeURIComponent(Base64.atob(encodedAccountNumber))
        : "";
    } catch (error) {
      trackEvent("payments-not-found-page-viewed");
      router.push("/404");
    }
  };

  return { getAccountNumber, encodedAccountNumber };
};
