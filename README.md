# Clarity Migration ESLint Rules

# Testing locally

1. Install `verdaccio` globally and run it

```bash
npm install -g verdaccio
verdaccio
```

2. Install the dependencies and publish the package to the local registry (`verdaccio`)

```bash
npm install
npm publish --registry http://localhost:4873
```

3. Create a new project, navigate to it and add an `.npmrc` file pointing to the local registry

```bash
ng new linter-test-project
cd linter-test-project
echo registry=http://localhost:4873 >> .npmrc
```

4. Install the package

```bash
# This will install the local version of the plugin because of the .npmrc config
npm install -D eslint-plugin-clarity-migration
```

5. Install the other linter dependencies

```bash
npm i -D  @typescript-eslint/parser eslint
```

6. Add `.eslintrc` config file with the following:

```json
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": ["clarity-migration"],
    "rules": {
        "clarity-migration/no-clr-button": "error"
    }
}
```

7. Lint the project

```
npx eslint --ext=ts src/
```
