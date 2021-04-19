import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTracking } from "./useTracking";

const KNOWN_PATHS = [
  "404",
  "?id=",
  "no-debt",
  "oops",
  "payment-failed",
  "success",
  "summary",
];

export const use404Tracking = () => {
  const router = useRouter();
  const { trackEvent } = useTracking();

  useEffect(() => {
    if (
      !KNOWN_PATHS.some((path) => router.asPath.substring(1).startsWith(path))
    ) {
      trackEvent("payments-not-found-page-viewed", { location: router.asPath });
    }
  }, [router.asPath]);
};
