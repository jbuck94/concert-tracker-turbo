export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // /*
    //  * Datadog's tracer must be imported & initialized before importing logger
    //  */
    // const { tracer } = await import('dd-trace');
    // tracer.init({
    //   logInjection: true,
    // });

    // /*
    //  * Load the next-logger package as quickly as possible so Next's
    //  * default logging methods get overridden with Pino.
    //  */
    // await require('pino');
    await require('next-logger');

    const { initializeRuntime } = await import('runtime');
    await initializeRuntime(require('manifest.json'));
  }
}
