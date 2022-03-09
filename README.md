Use [playwright](https://github.com/microsoft/playwright) to render the SearXNG pages in various configurations.

A weekly report is available at:
* [full report](https://searxng.org/searxng-browser-tests/).
* [screenshot browser](https://searxng.org/searxng-browser-tests/attachment_browser.html).

## Local installation

The tests can run locally

### Install

```sh
npm run install
```

### Usage

The tests expect an SearXNG instance at `http://localhost:8888`.

```sh
npm run test
npm run report
npx allure open ./allure-report
```
