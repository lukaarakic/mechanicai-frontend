"use client";

import { useEffect, useState } from "react";

// On phones, keep a way back to the problem box once the hero scrolls away.
// Hidden while any of `hideWhenVisibleIds` (the hero, the final CTA) is on
// screen, since those already show the box.
const MobileStickyCta = ({
  hideWhenVisibleIds,
  heroId,
  inputId,
}: {
  hideWhenVisibleIds: string[];
  heroId: string;
  inputId: string;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = hideWhenVisibleIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hideWhenVisibleIds]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <button
        type="button"
        onClick={() => {
          document
            .getElementById(heroId)
            ?.scrollIntoView({ behavior: "smooth" });
          document.getElementById(inputId)?.focus({ preventScroll: true });
        }}
        className="h-12 w-full cursor-pointer rounded-lg bg-white text-sm font-semibold text-black active:scale-[0.98]"
      >
        Start free diagnosis
      </button>
    </div>
  );
};

export default MobileStickyCta;
