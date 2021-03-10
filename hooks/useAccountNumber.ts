import { Base64 } from "js-base64";
import { useRouter } from "next/router";

export const useAccountNumber = () => {
  const router = useRouter();
  const encodedAccountNumber = router.query["id"] as string;

  const getAccountNumber = () => {
    try {
      return encodedAccountNumber
        ? decodeURIComponent(Base64.atob(encodedAccountNumber))
        : "";
    } catch (error) {
      router.push("/404");
    }
  };

  return { getAccountNumber, encodedAccountNumber };
};
