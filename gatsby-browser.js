const { registerLinkResolver } = require('gatsby-source-prismic-graphql');

registerLinkResolver(require('./src/utils/linkResolver').linkResolver);
