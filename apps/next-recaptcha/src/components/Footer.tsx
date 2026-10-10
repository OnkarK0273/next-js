"use client";

import { sendGAEvent } from "@next/third-parties/google";

function Footer() {
  const handleAuthorClick = () => {
    sendGAEvent("event", "author_link_clicked", {
      destination: "onkar_linktree",
    });
  };

  return (
    <footer className="border-t  py-2 text-center text-xs text-neutral-400">
      <p className="mb-1">
        NextRecaptcha By
        <a
          href="https://linktr.ee/onkar.k"
          target="_blank"
          rel="noreferrer"
          className="text-black hover:underline ml-1"
          onClick={handleAuthorClick}
        >
          Onkar.K
        </a>
      </p>
    </footer>
  );
}

export default Footer;
