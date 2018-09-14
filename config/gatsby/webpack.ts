function createSassRule(loaders: any) {
  const styleLoader =
    process.env.NODE_ENV !== 'production'
      ? loaders.style()
      : loaders.miniCssExtract();
  const cssLoader = loaders.css({
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]-[local]_[hash:base64:5]',
  });
  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  };
  return {
    test: /\.scss$/,
    use: [styleLoader, cssLoader, sassLoader],
  };
}

function createGraphQLRule() {
  return {
    test: /\.(graphql|gql)$/,
    loader: 'graphql-tag/loader',
  };
}

export function createWebpackRules(loaders: any) {
  return [createGraphQLRule(), createSassRule(loaders)];
}
