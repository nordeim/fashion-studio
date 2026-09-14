/**
 * Decorative wave marquee pinned to the top of the collections section
 * (source parity): two overlapping beige waves drifting left on a 35s
 * linear loop. Purely presentational — hidden from assistive technology.
 * The 300%-wide strip translates by exactly one pattern width, so the
 * loop is seamless.
 */
export function WaveMarquee() {
  return (
    <div aria-hidden className="absolute left-0 top-0 z-0 h-40 w-full overflow-hidden md:h-64">
      <div className="animate-marquee absolute left-0 top-0 h-full w-[300%]">
        <svg
          className="h-full w-full"
          viewBox="0 0 3000 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C500,80 500,0 1000,40 C1500,80 1500,0 2000,40 C2500,80 2500,0 3000,40 L3000,0 L0,0 Z"
            fill="rgba(210, 195, 180, 0.15)"
          />
          <path
            d="M0,30 C400,60 600,0 1000,30 C1400,60 1600,0 2000,30 C2400,60 2600,0 3000,30 L3000,0 L0,0 Z"
            fill="rgba(210, 195, 180, 0.08)"
          />
        </svg>
      </div>
    </div>
  );
}
