const withImages = require('next-images')

module.exports = withImages({
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL || 'https://finance-graphql.dev.aws.uw.systems/query',
    SPREEDLY_ENVIRONMENT_KEY: process.env.SPREEDLY_ENVIRONMENT_KEY || "LncsIjDAoJEsJdp51wFFONjRkzb"
  }
});
