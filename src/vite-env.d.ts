/// <reference types="vite/client" />

declare module "*.css";

interface ImportMetaEnv {
  /** Third-party form-service endpoint for the newsletter / release-alert opt-in
   *  (Block D / W10–W11). When unset, the signup UI does not render. Set it as a
   *  build-time env var / repo secret (Formspree, Buttondown, Web3Forms, …). */
  readonly VITE_NEWSLETTER_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
