import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateIp } from "../pages/paymentSlice";
import { getIpAddress } from "../utils/ip";

export const useIp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [ip, setIp] = useState<string>();

  const setIpAddress = async () => {
    const ipAddress = await getIpAddress();
    setIp(ipAddress);
    dispatch(updateIp(ipAddress));
  };

  useEffect(() => {
    if (!window.location.search) {
      router.replace("https://uw.co.uk");
    }
    setIpAddress();
  }, []);

  return ip;
};
