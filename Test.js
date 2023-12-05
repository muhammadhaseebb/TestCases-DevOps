const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");

function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(7);
  return `user_${randomString}@example.com`;
}

const randomEmail = generateRandomEmail();

describe("User Profiling Test Cases", function () {
  it("Sign Up Page Redirection", function () {
    let driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options().headless().windowSize(screen))
      .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
      .build();
    driver.get("http://localhost:3000/");
    let signupButton = driver.findElement(
      By.xpath('//*[@id="root"]/section/div/div/div/a[1]')
    );
    signupButton.click();

    driver.getCurrentUrl().then((value) => {
      assert.equal(value, "http://localhost:3000/register");
    });

    driver.quit();
  });

  it("Sign In Page Redirection", function () {
    let driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options().headless().windowSize(screen))
      .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
      .build();
    driver.get("http://localhost:3000/");
    let loginButton = driver.findElement(
      By.xpath('//*[@id="root"]/section/div/div/div/a[2]')
    );
    loginButton.click();

    driver.getCurrentUrl().then((value) => {
      assert.equal(value, "http://localhost:3000/login");
    });

    driver.quit();
  });

  describe(`Testing with Random Email ${randomEmail}`, () => {
    let driver;

    beforeEach(() => {
      driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options().headless().windowSize(screen))
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
        .build();
    });

    it(`Registering with Random email: ${randomEmail}`, () => {
      driver.get("http://localhost:3000/register");
      var nameInput = driver.findElement(By.name("name"));
      nameInput.sendKeys(randomEmail.split("@")[0]);
      var emailInput = driver.findElement(By.name("email"));
      emailInput.sendKeys(randomEmail);
      var passwordInput = driver.findElement(By.name("password"));
      passwordInput.sendKeys("password");
      var confirmPasswordInput = driver.findElement(By.name("password2"));
      confirmPasswordInput.sendKeys("password");
      var registerButton = driver.findElement(
        By.xpath('//*[@id="root"]/section/form/input')
      );
      registerButton.click();

      driver.getCurrentUrl().then((value) => {
        assert.equal(value, "http://localhost:3000/dashboard");
      });
    });

    it("Logging out", () => {
      driver.get("http://localhost:3000/dashboard");
      var logoutButton = driver.findElement(
        By.xpath("/html/body/div[1]/nav/ul/li[3]/a")
      );
      logoutButton.click();

      driver.getCurrentUrl().then((value) => {
        assert.equal(value, "http://localhost:3000/login");
      });
    });

    it("Logging In", () => {
      driver.get("http://localhost:3000/login");
      var emailInput = driver.findElement(By.name("email"));
      emailInput.sendKeys(randomEmail);
      var passwordInput = driver.findElement(By.name("password"));
      passwordInput.sendKeys("password");
      var loginButton = driver.findElement(
        By.xpath('//*[@id="root"]/section/form/input')
      );
      loginButton.click();

      driver.getCurrentUrl().then((value) => {
        assert.equal(value, "http://localhost:3000/dashboard");
      });
    });

    it("Redirecting to Profile", () => {
      driver.get("http://localhost:3000/login");
      var profileRedirect = driver.findElement(
        By.xpath('//*[@id="root"]/section/a')
      );
      profileRedirect.click();

      driver.getCurrentUrl().then((value) => {
        assert.equal(value, "http://localhost:3000/create-profile");
      });
    });

    it("Creating Profile", () => {
      driver.get("http://localhost:3000/create-profile");
      var statusInput = driver.findElement(By.name("status"));
      statusInput.sendKeys("Developer");
      var companyInput = driver.findElement(By.name("company"));
      companyInput.sendKeys("ROCKSOME");
      var websiteInput = driver.findElement(By.name("website"));
      websiteInput.sendKeys("rocksome.com");
      var locationInput = driver.findElement(By.name("location"));
      locationInput.sendKeys("Talagang, Chakwal, Pakistan");
      var githubusernameInput = driver.findElement(By.name("githubusername"));
      githubusernameInput.sendKeys("DrsTangent");
      var githubusernameInput = driver.findElement(By.name("bio"));
      githubusernameInput.sendKeys("My real name is Ali Hussain");

      var createProfile = driver.findElement(
        By.xpath('//*[@id="root"]/section/form/input')
      );
      createProfile.click();

      driver.getCurrentUrl().then((value) => {
        assert.equal(value, "http://localhost:3000/dashboard");
      });
    });

    it("Delete Profile", () => {
      driver.get("http://localhost:3000/dashboard");
      var deleteButton = driver.findElement(
        By.xpath('//*[@id="root"]/section/div[2]/button')
      );
      deleteButton.click();
      driver.switchTo().alert().accept();

      driver.getCurrentUrl().then((value) => {
        assert.equal(value, "http://localhost:3000/login");
      });
    });

    afterEach(() => {
      driver.quit();
    });
  });
});
