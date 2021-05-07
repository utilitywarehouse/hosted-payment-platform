# finance-debt-payment-ui

Built with [Next.js](https://nextjs.org/docs).

## Getting started

### 1. Install dependencies

In the root directory, run:

```
npm install
```

Get it [here](https://www.npmjs.com/get-npm) if you don't have it already.

### 2. Add `debt.uw.systems` to Hosts file

Required for redirection to work.

[How to edit your Mac's Hosts file](https://www.imore.com/how-edit-your-macs-hosts-file-and-why-you-would-want#how-to-edit-the-hosts-file)

## Development

### `npm run dev`

Runs the app with the development GraphQL server.<br />
Navigate to http://debt.uw.systems:3000/?id=BASE_64_ACCOUNT_NUMBER to open the app.

### `npm run cypress`

Runs Cypress tests. The development server needs to be running concurrently.

## Kubernetes

- [dev config](https://github.com/utilitywarehouse/kubernetes-manifests/tree/master/dev-aws/finance/finance-debt-payment-ui)

- [prod config](https://github.com/utilitywarehouse/kubernetes-manifests/tree/master/prod-aws/finance/finance-debt-payment-ui)

## Authentication / authorisation todo

1. Read `uw.co.uk` cookie that contains the JWT.
2. Validate access token with UW auth keys (need to spin up an auth server in the frontend repo to retrieve the keys and verify the token). _Suggestion: use [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to validate the token._
3. Show the protected page to the user if authentication is successful.
4. Each API call will carry the bearer token to authorise individual requests.
