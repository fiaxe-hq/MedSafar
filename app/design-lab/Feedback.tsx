"use client";

import dynamic from "next/dynamic";

/** The overlay reads the window and localStorage, so it renders in the browser only. */
export const Feedback = dynamic(() => import("./FeedbackOverlay").then((m) => m.FeedbackOverlay), {
  ssr: false,
});
