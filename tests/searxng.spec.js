// @ts-check
const { test, expect } = require("@playwright/test");
const { injectAxe, checkA11y, getViolations, reportViolations } = require('axe-playwright');

const BASE_URL = "http://localhost:8888/";

async function attach_screenshot(name, page, testInfo) {
  const screenshot = await page.screenshot();
  await testInfo.attach(name, { body: screenshot, contentType: "image/png"});
}

async function attach_messages(name, messages, testInfo) {
  await testInfo.attach(name, { body: JSON.stringify(messages), contentType: "application/json" });
}

function log_console(page) {
  const messages = []
  page.on("console", (message) => {
    messages.push({type: message.type(), text: message.text()})
  })
  return messages;
}

test("preferences", async ({ page }, testInfo) => {
  const messages = log_console(page);

  await page.goto(BASE_URL + "preferences");

  const tabs = await page.$$("#search_form > .tabs > label");
  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await attach_screenshot("preferences-" + (await tabs[i].textContent()), page, testInfo);
  }

  await attach_messages("preferences_console", messages, testInfo);
});

test("index", async ({ page }, testInfo) => {
  const messages = log_console(page);

  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await attach_screenshot("index", page, testInfo);

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    await page.focus('input#q');
    await page.keyboard.insertText('time');
    await page.waitForTimeout(3000);
    /*
    await page.waitForSelector('.autocomplete > ul > li');
    */
    await attach_screenshot("index_autocomplete", page, testInfo);
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

  await attach_messages("index_console", messages, testInfo);
});

test("search_general", async ({ page }, testInfo) => {
  const messages = log_console(page);

  await page.goto(BASE_URL + "search?q=time");
  await page.waitForLoadState('networkidle');

  await attach_screenshot("search_general", page, testInfo);

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await attach_screenshot("search_general_2", page, testInfo);
  }

  await attach_messages("search_general_console", messages, testInfo);
});

test("search_images", async ({ page }, testInfo) => {
  const messages = log_console(page);

  await page.goto(BASE_URL + "search?q=time&categories=images");
  await page.waitForLoadState('networkidle');

  await attach_screenshot("search_images", page, testInfo);

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    const results = await page.$$("#results article");
    await results[0].click();
    await attach_screenshot("search_images_detail", page, testInfo);
  }

  await attach_messages("search_images_console", messages, testInfo);
});

test("search_videos", async ({ page }, testInfo) => {
  const messages = log_console(page);

  await page.goto(BASE_URL + "search?q=3blue1brown&categories=videos");
  await page.waitForLoadState('networkidle');

  await attach_screenshot("search_videos", page, testInfo);

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    const results = await page.$$("#results article a.media-loader");
    await results[0].click();
    await page.waitForTimeout(3000);

    await attach_screenshot("search_videos_player", page, testInfo);
  }
  await attach_messages("search_videos_console", messages, testInfo);
});

test("search_map", async ({ page }, testInfo) => {
  const messages = log_console(page);

  await page.goto(BASE_URL + "search?q=bruxelles&categories=map");
  await page.waitForLoadState('networkidle');

  await attach_screenshot("search_map", page, testInfo);

  const html_js = await page.$$("html.js");
  if (html_js.length > 0) {
    const results = await page.$$("article.result:first-child .searxng_init_map");
    await results[0].click();
    await page.waitForTimeout(3000);
    // await page.waitForSelector('.leaflet-map-pane');

    await attach_screenshot("search_map_detail", page, testInfo);
  }
  await attach_messages("search_map_console", messages, testInfo);
});

test("search_code", async ({ page }, testInfo) => {
  const messages = log_console(page);

  await page.goto(BASE_URL + "search?q=!scc%20grep");
  await page.waitForLoadState('networkidle');

  await attach_screenshot("search_code", page, testInfo);

  await attach_messages("search_code_console", messages, testInfo);
});

test("about", async ({ page }, testInfo) => {
  const messages = log_console(page);

  await page.goto(BASE_URL + "about");

  await attach_screenshot("about", page, testInfo);

  await attach_messages("about_console", messages, testInfo);
});
