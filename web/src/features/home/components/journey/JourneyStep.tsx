import { MediaImage } from "@/components/ui/MediaImage";

import { journeyImage, type JourneyStepData } from "./journeySteps";

export function JourneyStep({
  step,
  index,
  active,
  stepRef,
}: {
  step: JourneyStepData;
  index: number;
  active: boolean;
  stepRef: (element: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={stepRef}
      data-step={index}
      className={active ? "journey-step is-active" : "journey-step"}
    >
      <span className="media">
        <MediaImage
          imageKey={journeyImage(index)}
          alt={`Minh họa: ${step.title}`}
          sizes="100vw"
        />
      </span>
      <i>0{index + 1}</i>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </div>
  );
}
