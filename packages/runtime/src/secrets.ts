import {
  SecretManagerServiceClient,
  protos,
} from '@google-cloud/secret-manager';

import { GCP_PROJECT_MAP, InternalEnv } from 'src/index';

export class SecretFetcher {
  private readonly internalEnv: InternalEnv;
  private static memoizedSecretClient: SecretManagerServiceClient;

  constructor(internalEnv: InternalEnv) {
    this.internalEnv = internalEnv;
  }

  public run = async (secretName: string) => {
    const command: protos.google.cloud.secretmanager.v1.IGetSecretRequest = {
      name: this.resolvedKeyName(secretName),
    };

    let secretValue;
    try {
      const [version] = await this.secretClient.accessSecretVersion(command);

      secretValue = version.payload?.data?.toString() || '';
    } catch (e) {
      this.processError(e);
    }

    return secretValue;
  };

  public closeConnection = async () => {
    await this.secretClient.close();
  };

  private get secretClient(): SecretManagerServiceClient {
    if (!SecretFetcher.memoizedSecretClient) {
      SecretFetcher.memoizedSecretClient = new SecretManagerServiceClient();
    }

    return SecretFetcher.memoizedSecretClient;
  }

  private resolvedKeyName = (secretName: string): string => {
    return this.secretClient.secretVersionPath(
      GCP_PROJECT_MAP[this.internalEnv],
      secretName,
      'latest'
    );
  };

  private processError = (e: unknown) => {
    if (e instanceof Error) {
      throw new Error(`${e.name}: ${e.message}`);
    }

    throw new Error('Unable to fetch secret');
  };
}
