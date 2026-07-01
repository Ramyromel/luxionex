export const openaiConnector = {
  chat: async (input: any) => {
    return {
      ok: true,
      mock: true,
      input,
    };
  },
};
