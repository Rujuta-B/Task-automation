import setupLocatorUI from "@locator/runtime";

if (process.env.DEVELOPMENT_MODE === "development") {
  setupLocatorUI();
}