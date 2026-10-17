/**
 * Viglet Cloud as a surface (Block I / W29): the one place the site describes
 * the hosted offering, so the footer link and the later callouts (W30–W32) all
 * say the same thing.
 *
 * Cloud is in beta. Nothing here claims stability, an SLA or pricing: the
 * one-liner restates what viglet.cloud says of itself (the three products run
 * as a hosted service).
 */

export interface CloudSurface {
  name: string
  url: string
  beta: boolean
  /** One line on what it is, for links and callouts. */
  oneLiner: string
  /** Self-service sign-up: the console's Keycloak registration (`?register=1`). */
  signUpUrl: string
}

export const cloud: CloudSurface = {
  name: 'Viglet Cloud',
  url: 'https://viglet.cloud',
  beta: true,
  signUpUrl: 'https://console.viglet.cloud/?register=1',
  oneLiner: 'Viglet Turing, Shio and Dumont as a hosted service, run by Viglet.',
}
