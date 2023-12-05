var assert = require("assert");
var { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
let randomEmail = require("random-email");

const screenq = {
  width: 1366,
  height: 768,
};
