import { exec as execCb } from 'node:child_process';
import { promisify } from 'node:util';

import { getOrThrow, initializeRuntime } from 'runtime';

const exec = promisify(execCb);

const main = async () => {
  await initializeRuntime(require('manifest.json'));

  console.log('Running migrations...');

  const POSTGRES_DATABASE_URL = getOrThrow('DATABASE_URL');

  const { stdout, stderr } = await exec(`npx prisma migrate deploy`, {
    env: {
      ...process.env,
      POSTGRES_DATABASE_URL,
    },
  });

  console.log(stdout);
  console.error(stderr);
};

main()
  .then(() => {
    console.log('Migrations ran successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      error instanceof Error ? error.message : 'Failed to run migrations.'
    );

    process.exit(1);
  });
