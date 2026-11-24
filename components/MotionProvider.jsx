"use client";

import { MotionConfig } from "framer-motion";

/** Every framer-motion animation on the site follows the visitor's "reduce motion" setting. */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
