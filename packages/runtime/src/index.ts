import { z } from 'zod';

import { SecretFetcher } from 'src/secrets';

export enum InternalEnv {
  PRODUCTION = 'prod',
  LOCAL = 'local',
}

export const GCP_PROJECT_MAP: Record<InternalEnv, string> = {
  [InternalEnv.PRODUCTION]: 'concert-tracker-277016',
  [InternalEnv.LOCAL]: 'concert-tracker-277016',
};

export const IS_RUNTIME_INITIALIZED_VAR = 'IS_RUNTIME_INITIALIZED';
export const RUNTIME_INITIALIZED_MESSAGE = 'you_bet_chief';

export const initializeRuntime = async (rawManifest: object) => {
  if (
    process.env[`${IS_RUNTIME_INITIALIZED_VAR}`] === RUNTIME_INITIALIZED_MESSAGE
  ) {
    return;
  }

  const runtimeManifest = parseManifest(rawManifest);

  const internalEnv = getInternalEnv();
  setInternalEnv(internalEnv);

  // Set local env vars and secret overrides
  if (internalEnv === InternalEnv.LOCAL) {
    Object.entries(runtimeManifest.local.environmentVariables).forEach(
      ([key, value]) => {
        process.env[key] = value;
      }
    );

    Object.entries(runtimeManifest.local.secretOverrides).forEach(
      ([key, value]) => {
        process.env[key] = value;
      }
    );
  }

  // If secrets are not already present in the env, fetch and set them
  const secretFetcher = new SecretFetcher(internalEnv);
  try {
    for (const secret of runtimeManifest.secrets) {
      if (process.env[secret] !== undefined) {
        continue;
      }

      const secretValue = await secretFetcher.run(secret);
      if (!secretValue) {
        throw new Error(`Could not access secret: ${secret}`);
      }

      process.env[secret] = secretValue;
    }
  } catch (e) {
    throw e;
  } finally {
    await secretFetcher.closeConnection();
  }

  process.env[`${IS_RUNTIME_INITIALIZED_VAR}`] = RUNTIME_INITIALIZED_MESSAGE;

  return;
};

export const parseManifest = (rawManifest: object): RuntimeManifest => {
  const parsedManifestResult = runtimeManifestSchema.safeParse(rawManifest);
  if (parsedManifestResult.success) {
    return parsedManifestResult.data;
  } else {
    throw new Error('Invalid manifest file');
  }
};

export const setInternalEnv = (env: string) => {
  if (
    !env ||
    !Object.values(InternalEnv).includes(env as unknown as InternalEnv)
  ) {
    throw new Error('Invalid Environment');
  }

  process.env['INTERNAL_ENV'] = env;
};

export const getInternalEnv = (): InternalEnv => {
  const env = process.env['INTERNAL_ENV'] || InternalEnv.LOCAL;
  if (
    !env ||
    !Object.values(InternalEnv).includes(env as unknown as InternalEnv)
  ) {
    throw new Error('Invalid Environment');
  }

  return env as InternalEnv;
};

export const isRuntimeInitialized = (): boolean => {
  return (
    process.env[`${IS_RUNTIME_INITIALIZED_VAR}`] === RUNTIME_INITIALIZED_MESSAGE
  );
};

export const getOrThrow = (envVarName: string): string => {
  const val = process.env[envVarName];
  if (!val) {
    throw new Error(`Could not access env var: ${envVarName}`);
  }

  return val;
};

export const getOrEmpty = (envVarName: string): string => {
  const val = process.env[envVarName];

  return val || '';
};

const localManifestSchema = z.object({
  secretOverrides: z.record(z.string()),
  environmentVariables: z.record(z.string()),
});

export type RuntimeManifest = z.infer<typeof runtimeManifestSchema>;

const runtimeManifestSchema = z.object({
  secrets: z.string().array(),
  local: localManifestSchema,
});
