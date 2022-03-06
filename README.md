Use [playwright](https://github.com/microsoft/playwright) to render the SearXNG pages in various configurations.

A weekly report is available at:
* [full report](https://searxng.org/searxng-browser-tests/).
* [screenshot browser](https://searxng.org/searxng-browser-tests/attachment_browser.html).

## Local installation

The tests can run locally

### Install

```sh
npx playwright install --with-deps
```

### Usage

The tests expect an SearXNG instance at `http://localhost:8888`.

```sh
npx playwright test --reporter=line,experimental-allure-playwright
npx allure generate ./allure-results --clean
npx allure open ./allure-report
```
