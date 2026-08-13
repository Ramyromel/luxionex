export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Luxionex",

  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? "",
  },

  github: {
    token: process.env.GITHUB_TOKEN ?? "",
  },

  binance: {
    apiKey: process.env.BINANCE_API_KEY ?? "",
    secretKey: process.env.BINANCE_SECRET_KEY ?? "",
  },
};
