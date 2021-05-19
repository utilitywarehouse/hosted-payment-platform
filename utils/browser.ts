export const getBrowserInfo = () =>
  (window as any).Spreedly.ThreeDS.serialize(
    "04",
    "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
    new MockFallbackBrowser()
  );

/**
 * Wrapper around the regular `window` object.
 *
 */
class MockFallbackBrowser {
  screen = {
    width: "0",
    height: "0",
    colorDepth: "-1"
  };

  navigator = {
    javaEnabled: function () {
      return window.navigator.javaEnabled()
    },
    userAgent: "Mozilla/5.0 (MacOS; Intel Mac OS X 10_15_6) Spreedly 3DS Debugging",
    language: window.navigator.language
  }
}