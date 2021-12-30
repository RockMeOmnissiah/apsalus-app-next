const chalk = require('chalk');
const next = require('next');

module.exports = function defineNextHook(sails) {

  let configKey = 'next';

  return {

    initialize: async function () {
      sails.after('hook:custom:loaded', async function() {
        sails.log.info("Initializing Next hook... (`api/hooks/next/`)");
        const dev = process.env.NODE_ENV !== 'production';

        // Retrieve configuration
        const { server, api } = sails.config[configKey];
        // todo: Probably check if blueprints is enabled before getting the prefix
        const isBlueprintsSimilar = api.prefix !== sails.config.blueprints.prefix;

        if (isBlueprintsSimilar) {
          log('blueprints.prefix !== next.api.prefix. ' +
              'They need to be the same for API calls to work. ' +
              `Expected "${api.prefix}"`);
        }

        // Create special route to handle Next.js SSR
        sails.on('router:after', () => {
          sails.router.bind(`r|^\S*\s*(?!\/api).*$|`, {
            skipAssets: false,

            target: async (req, res) => {
              sails.config[configKey].handle(req, res);
            }
          })
        })

        // Create a bridge to Next.js app instance
        const nextApp = next({ ...server, dev });

        // Retrieve request handler + next app
        sails.config[configKey].handle = nextApp.getRequestHandler();
        sails.config[configKey].app = nextApp;
      });
    },

    configure: async function () {
      sails.after('hook:next:loaded', async function() {
        sails.on('router:after', async function() {
          // Prepare Next.js app
          sails.log.info('Configuring Next hook...');
          try {
            await sails.config[configKey].app.prepare();
          } catch (ex) {
            error(ex.stack);
          }
        });
      });
    }
  }

  function title () {
    return `${chalk.cyan('sails-hook-next')}:`;
  }

  function log (...args) {
    sails.log.debug(title(), ...args);
  }

  function error (...args) {
    sails.log.error(title(), ...args);
  }
}
