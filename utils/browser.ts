export const getBrowserInfo = () =>
  (window as any).Spreedly.ThreeDS.serialize(
    "04",
    "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8"
  );
