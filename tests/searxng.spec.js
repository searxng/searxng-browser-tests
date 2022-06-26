// @ts-check
const { test, expect } = require("@playwright/test");
const { injectAxe, checkA11y, getViolations, reportViolations } = require('axe-playwright');

const BASE_URL = "http://localhost:8888/";

test("preferences", async ({ page }, testInfo) => {
  await page.goto(BASE_URL + "preferences");

  const tabs = await page.$$("#search_form > .tabs > label");
  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    const screenshot = await page.screenshot();
    await testInfo.attach("preferences-" + (await tabs[i].textContent()), {
      body: screenshot,
      contentType: "image/png",
    });
  }
});

test("index", async ({ page }, testInfo) => {
  await page.goto(BASE_URL);
  const screenshot = await page.screenshot();
  await testInfo.attach("index", { body: screenshot, contentType: "image/png"});

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    // await page.fill('input#q', 'time');
    await page.focus('input#q');
    await page.keyboard.insertText('time');
    await page.waitForTimeout(3000);
    /*
    await page.waitForSelector('.autocomplete > ul > li');
    */
    const screenshot = await page.screenshot();
    await testInfo.attach("index_autocomplete", { body: screenshot, contentType: "image/png"});
  }

  /*
  await injectAxe();
  await checkA11y(page, null, {
    axeOptions: {
      runOnly: {
        type: 'tag',
        values: ['wcag21a'],
      },
    },
  });
  */
});

test("search_general", async ({ page }, testInfo) => {
  await page.goto(BASE_URL + "search?q=time");
  await page.waitForLoadState('networkidle');

  const screenshot = await page.screenshot();
  await testInfo.attach("search_general", { body: screenshot, contentType: "image/png"});

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const screenshot = await page.screenshot();
    await testInfo.attach("search_general_2", { body: screenshot, contentType: "image/png"});
  }
});

test("search_images", async ({ page }, testInfo) => {
  await page.goto(BASE_URL + "search?q=time&categories=images");
  await page.waitForLoadState('networkidle');

  const screenshot = await page.screenshot();
  await testInfo.attach("search_images", { body: screenshot, contentType: "image/png"});

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    const results = await page.$$("#results article");
    await results[0].click();

    const screenshot_detail = await page.screenshot();
    await testInfo.attach("search_images_detail", { body: screenshot_detail, contentType: "image/png"});
  }
});

test("search_videos", async ({ page }, testInfo) => {
  await page.goto(BASE_URL + "search?q=3blue1brown&categories=videos");
  await page.waitForLoadState('networkidle');

  const screenshot = await page.screenshot();
  await testInfo.attach("search_videos", { body: screenshot, contentType: "image/png"});

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    const results = await page.$$("#results article a.media-loader");
    await results[0].click();
    await page.waitForTimeout(3000);

    const screenshot_detail = await page.screenshot();
    await testInfo.attach("search_videos_player", { body: screenshot_detail, contentType: "image/png"});
  }
});

test("search_map", async ({ page }, testInfo) => {
  await page.goto(BASE_URL + "search?q=bruxelles&categories=map");
  await page.waitForLoadState('networkidle');

  const errorLogs = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      errorLogs.push(message.text())
    }
  })

  const screenshot = await page.screenshot();
  await testInfo.attach("search_map", { body: screenshot, contentType: "image/png"});

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    const results = await page.$$("article.result:first-child .searxng_init_map");
    await results[0].click();
    await page.waitForTimeout(3000);
    // await page.waitForSelector('.leaflet-map-pane');

    const screenshot_detail = await page.screenshot();
    await testInfo.attach("search_map_detail", { body: screenshot_detail, contentType: "image/png"});
    await testInfo.attach("search_map_console", { body: JSON.stringify(errorLogs), contentType: "application/json" });
  }
});

test("search_code", async ({ page }, testInfo) => {
  await page.goto(BASE_URL + "search?q=!scc%20grep");
  await page.waitForLoadState('networkidle');

  const screenshot = await page.screenshot();
  await testInfo.attach("search_code", { body: screenshot, contentType: "image/png"});
});

test("about", async ({ page }, testInfo) => {
  await page.goto(BASE_URL + "about");

  const screenshot = await page.screenshot();
  await testInfo.attach("about", { body: screenshot, contentType: "image/png"});
});
