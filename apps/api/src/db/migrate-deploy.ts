import { exec as execCb } from 'node:child_process';
import { promisify } from 'node:util';

import { getOrThrow, initializeRuntime } from 'runtime';

const exec = promisify(execCb);

const main = async () => {
  await initializeRuntime(require('manifest.json'));

  // eslint-disable-next-line no-console
  console.log('Running migrations...');

  const POSTGRES_DATABASE_URL = getOrThrow('DATABASE_URL');

  const { stdout, stderr } = await exec(`npx prisma migrate deploy`, {
    env: {
      ...process.env,
      POSTGRES_DATABASE_URL,
    },
  });

  // eslint-disable-next-line no-console
  console.log(stdout);
  // eslint-disable-next-line no-console
  console.error(stderr);
};

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Migrations ran successfully');
    process.exit(0);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(
      error instanceof Error ? error.message : 'Failed to run migrations.'
    );

    process.exit(1);
  });
