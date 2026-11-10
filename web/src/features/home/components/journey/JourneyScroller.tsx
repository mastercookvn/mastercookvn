"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { JourneyStep } from "./JourneyStep";
import { journeyImage, JOURNEY_STEPS } from "./journeySteps";

/** M07 */
export function JourneyScroller() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="journey-grid">
      <div className="journey-stage">
        {JOURNEY_STEPS.map((step, index) => (
          <span
            key={step.title}
            className={index === active ? "media is-active" : "media"}
          >
            <Image
              src={journeyImage(index)}
              alt={`Minh họa: ${step.title}`}
              fill
              sizes="(max-width: 1320px) 55vw, 700px"
              className="object-cover"
            />
          </span>
        ))}
      </div>
      <div className="journey-steps">
        <span
          className="journey-progress"
          style={{ height: `${((active + 1) / JOURNEY_STEPS.length) * 100}%` }}
        />
        {JOURNEY_STEPS.map((step, index) => (
          <JourneyStep
            key={step.title}
            step={step}
            index={index}
            active={index === active}
            stepRef={(element) => {
              steps.current[index] = element;
            }}
          />
        ))}
      </div>
    </div>
  );
}
