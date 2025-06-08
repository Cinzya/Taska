import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Load all messages for client-side switching
  const [enMessages, deMessages] = await Promise.all([
    import(`../messages/en.json`).then(m => m.default),
    import(`../messages/de.json`).then(m => m.default)
  ]);

  return {
    locale: "en", // Default locale
    messages: {
      en: enMessages,
      de: deMessages
    }
  };
});
