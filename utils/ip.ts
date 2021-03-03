import axios from "axios";

export const getIpAddress = async () => {
  const { data } = await axios.get("https://www.cloudflare.com/cdn-cgi/trace");
  const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
  const ip = data.match(ipRegex)[0];
  return ip;
};
