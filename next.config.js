const withImages = require('next-images')

module.exports = withImages({
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    GRAPHQL_URL: process.env.GRAPHQL_URL || 'https://finance-graphql.dev.aws.uw.systems/query',
    SPREEDLY_ENVIRONMENT_KEY: process.env.SPREEDLY_ENVIRONMENT_KEY || "LncsIjDAoJEsJdp51wFFONjRkzb",
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN || "c4f9c42eec07534c28a8903a7c471f82"
  }
});
