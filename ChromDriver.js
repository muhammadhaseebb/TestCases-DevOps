let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options().headless().windowSize(screen))
  .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
  .build();
