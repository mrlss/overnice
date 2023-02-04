import { useBounds, useScroll, useWindowSizes } from "@/hooks";
import { useCallback, useEffect, useRef, useState } from "react";

import { BarItem } from "./Bar";
import { INTRO_BARS } from "@/staticData/bars";
import { clamp } from "@/utils";

export default function Bars({ className = "", viewVisibilityKoeff = 0.2 }) {
  const barsRef = useRef();
  const winSizes = useWindowSizes();
  const [bounds, boundsRef] = useBounds();
  const [initialPosition, setInitialPosition] = useState();
  const [choosenColor, setChoosenColor] = useState();
  const barsColorRectByColor = new Map();

  // getting DOM prepared, gathering info for hover effect
  useEffect(() => {
    const allColorBlocks = [
      ...barsRef.current.querySelectorAll("[data-bar-rect]"),
    ];

    const allLabels = [
      ...barsRef.current.querySelectorAll("[data-floating-label]"),
    ];

    // grouping all rect/labels by color parameter for cached use
    [...allColorBlocks, ...allLabels].forEach((block) => {
      const fill =
        block.getAttribute("fill") || block.getAttribute("data-floating-label");

      if (barsColorRectByColor.has(fill)) {
        barsColorRectByColor.set(fill, [
          ...barsColorRectByColor.get(fill),
          block,
        ]);
      } else {
        barsColorRectByColor.set(fill, [block]);
      }
    });
  });

  // updating inline CSS prop progress for CSS animation calculation
  const updateProgress = useCallback(
    (scrollPosition) => {
      if (!bounds || !winSizes) return;

      const { height: WH } = winSizes;
      const { top } = bounds;

      const fullProgress =
        (scrollPosition - (top - WH + initialPosition)) /
        (bounds.height + WH * viewVisibilityKoeff);

      const progress = clamp(fullProgress, 0, 1);

      barsRef.current.style.setProperty("--progress", progress);
    },
    [barsRef, bounds, initialPosition, viewVisibilityKoeff, winSizes]
  );

  const switchBarColor = (currentColor) => {
    const itemsToHiglight = barsColorRectByColor.get(currentColor);

    if (itemsToHiglight && itemsToHiglight.length) {
      barsColorRectByColor.forEach((entry) => {
        for (let i = 0; i < entry.length; i++) {
          const element = entry[i];
          element.classList.remove("is-active");
        }
      });

      [...itemsToHiglight].forEach((el) => el.classList.add("is-active"));
    }
  };

  // switching between different colors, of the same color is hovered - nothing change
  const onMouseOver = (e) => {
    const { target } = e;

    if (!target.hasAttribute("data-bar-rect")) return;

    const currentColor = target.getAttribute("fill");

    if (currentColor === choosenColor) return;

    switchBarColor(currentColor);
    setChoosenColor(currentColor);
  };

  // initial setup for progress based on initial scroll position
  useEffect(() => {
    updateProgress(initialPosition);
    barsRef.current.classList.add("is-loaded");
  }, [initialPosition, updateProgress]);

  // getting initial load scroll position for correct progress calculation (required if page loaded not from top)
  useEffect(() => {
    setInitialPosition(window.scrollY);
  }, [barsRef]);

  useScroll(updateProgress);

  return (
    <div
      ref={(node) => {
        boundsRef.current = node;
        barsRef.current = node;
      }}
      onMouseOver={onMouseOver}
      className={`w-full gap-x-4 gap-y-10 flex flex-wrap lg:flex-nowrap lg:justify-around justify-center items-end lg:gap-x-10 laptop:gap-x-20 group pointer-events-none bars-block ${className}`}
    >
      {INTRO_BARS.map((bar) => (
        <BarItem key={bar.id} {...bar} />
      ))}
    </div>
  );
}
