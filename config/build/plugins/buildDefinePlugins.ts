import webpack from "webpack"

export const buildDefinePlugins = (options: {
  isDev: boolean
  apiURL: string
}) => {
  const { isDev, apiURL } = options

  return new webpack.DefinePlugin({
    __IS_DEV__: JSON.stringify(isDev),
    __API_URL__: JSON.stringify(apiURL),
    __BUILD_VERSION__: `${new Date().getDate()}-${new Date().getMonth()}-${JSON.stringify(
      new Date().getFullYear()
    )}`,
  })
}
