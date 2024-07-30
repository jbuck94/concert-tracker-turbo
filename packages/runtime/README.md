# Runtime

A library for managing the runtime of all of our applications. Features include:

- Determining which environment a given application is running in (oneof LOCAL, DEV, or PROD)
- Parsing a `manifest.json` file to fetch secrets for use at runtime as an alternative to injecting secrets via env vars

## Getting Started

1. The runtime library uses the gcloud SDK to access secrets. The gcloud SDK uses the gcloud CLI to manage the credentials it uses. So, all you have to do is setup the gcloud CLI locally, see [these instructions](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev). TLDR; install the CLI and then run `gcloud auth application-default login`.
1. Set the gcloud CLI to use the dev project. When running apps locally, we use the dev secrets and apply local overrides via the `manifest.json`. This process is outlined in more detail below. To use a project, issue the command:

   ```bash
   gcloud config set project [projectName]
   ```

## manifest.json

The runtime configuration for our apps is stored in a `manifest.json` file. The format of this file is as follows:

- **secrets**: This field is an array that takes the list of secrets in Secret Manager that the application needs access to.
- **local**: stores configuration that's only applied when running locally (i.e. the INTERNAL_ENV is `local`).

  - **secretOverrides**: overrides for the values stored in GCP secret manager.
  - **environmentVariables**: non-sensitive values that need to be in the runtime for local development. An example are the flags that tell the FireBase SDK to connect to the local FireBase emulator.

## INternal Environments

There are 2 Internal Environments:

- local
- prod

On startup, the first thing the `runtime` library does is determine which environment the app is in by checking for the presence of a `INTERNAL_ENV` environment variable. If none is present, it will assume that the environment is `local`.

When running in `local` mode, the `runtime` library will set environment variables specified in the `local` block of the app's `manifest.json` file. These environment variables are used to override the values of secrets stored in secret manager (in the `secretOverrides` block) and to set environment variables that are non-sensitive and otherwise needed (in the `environmentVariables` block).

## Changing Environments

If for some reason, you need to test the app as it would behave in dev or prod (i.e. test against prod FireStore or test a stripe transaction using the real prod key), **DO NOT** do so by placing sensitive values into the local overrides of the apps manifest. `manifest.json` is commited to source control, so this would leak our sensitive credentials into the git history.

Instead, simply:

1. Update the gcloud cli to use the project you want.
1. Set the INTERNAL_ENV to the desired value. This can be done by either setting the value in your `.zshrc` or equivalent file, or by prepending to the turbo command. For example, to run an app in dev mode and connect to dev FireStore instead of the local emulator, issue:

   ```bash
   INTERNAL_ENV=dev pnpm run dev
   ```
