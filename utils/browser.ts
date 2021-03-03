export const getBrowserInfo = () => {
  // @ts-ignore
  return Spreedly.ThreeDS.serialize(
    "04",
    "text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8"
  );
};
