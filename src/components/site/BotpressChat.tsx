import { useEffect } from "react";

// TODO: replace with your real bot's embed URL from the Botpress dashboard:
// Workspace → your bot → Webchat → Deploy Settings → copy the "Embed code"
// (it's the src of the second <script> tag, hosted on files.bpcontent.cloud).
const BOTPRESS_CONFIG_URL = "https://files.bpcontent.cloud/2026/09/01/09/20260901093350-6GUQG53H.js";

const INJECT_SCRIPT_ID = "bp-webchat-inject";
const CONFIG_SCRIPT_ID = "bp-webchat-config";

/**
 * Loads the Botpress webchat widget on every page. Client-side only — the
 * widget mounts itself as a floating bubble, so nothing needs to be rendered
 * here beyond kicking off the two script tags Botpress' own docs ask for.
 */
export function BotpressChat() {
  useEffect(() => {
    if (BOTPRESS_CONFIG_URL.includes("REPLACE/ME")) {
      // No real bot configured yet — skip silently instead of loading a 404.
      return;
    }
    if (document.getElementById(INJECT_SCRIPT_ID)) return;

    const inject = document.createElement("script");
    inject.id = INJECT_SCRIPT_ID;
    inject.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js";
    inject.async = true;

    inject.onload = () => {
      if (document.getElementById(CONFIG_SCRIPT_ID)) return;
      const config = document.createElement("script");
      config.id = CONFIG_SCRIPT_ID;
      config.src = BOTPRESS_CONFIG_URL;
      config.defer = true;
      document.body.appendChild(config);
    };

    document.body.appendChild(inject);
  }, []);

  return null;
}