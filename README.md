Small experiment with [playwright](https://github.com/microsoft/playwright).

The report is available at [https://dalf.github.io/searxng-browser-tests/](https://dalf.github.io/searxng-browser-tests/).

Usage, once the dependencies are installed:

```sh
npx playwright test
npx allure generate ./allure-results --clean
npx allure open ./allure-report
```
