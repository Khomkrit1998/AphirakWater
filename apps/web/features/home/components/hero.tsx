import Image from "next/image"
import Link from "next/link"

import { home, site } from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { CheckMark } from "@workspace/ui/components/check-list"
import { cn } from "@workspace/ui/lib/utils"

import heroTruck from "../assets/hero-truck.png"
import { WaterGlow, WaveField } from "./decor"

// Contact shadows in the photo's own pixel space (viewBox = image size), so they
// scale with the truck. The photo is a low 3/4 view: tyres touch the ground at
// different heights (measured from the alpha channel), so a flat ellipse made the
// truck float. Rear tyres ~y898/922, near front ~y1020, far front ~y994.
function TruckShadow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1447 1087"
      className="absolute inset-0 size-full overflow-visible text-black"
    >
      <defs>
        <filter id="truck-shadow-soft" x="-30%" y="-100%" width="160%" height="300%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id="truck-shadow-tight" x="-50%" y="-300%" width="200%" height="700%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      {/* footprint on the tilted ground plane */}
      <polygon
        points="80,896 330,928 640,1034 1160,1004 1190,946 760,902 300,874"
        fill="currentColor"
        opacity="0.2"
        filter="url(#truck-shadow-soft)"
      />
      {/* where each visible tyre meets the ground */}
      <g fill="currentColor" opacity="0.55" filter="url(#truck-shadow-tight)">
        <ellipse cx="148" cy="900" rx="58" ry="9" />
        <ellipse cx="272" cy="924" rx="74" ry="10" />
        <ellipse cx="606" cy="1022" rx="90" ry="12" />
        <ellipse cx="1070" cy="996" rx="82" ry="11" />
      </g>
    </svg>
  )
}

// Asymmetric hero. Desktop: heading and CTA panel on the left half; the cut-out
// truck stands on a soft stage that covers its whole footprint and bleeds to the
// right viewport edge.
// Mobile: heading, truck, then the panel.
export function Hero() {
  const { hero } = home
  return (
    <>
      <section id="top" className="relative isolate">
        <WaterGlow className="-top-40 -left-72 size-[760px]" />
        <WaveField className="bottom-0 left-0 hidden h-44 w-1/2 text-brand opacity-[0.14] lg:block" />
        <div className="mx-auto grid max-w-[1200px] px-5 pt-10 lg:min-h-[680px] lg:grid-cols-12 lg:content-center lg:py-16">
          <div className="lg:col-span-6 lg:pr-8">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-soft-border bg-background px-3.5 py-[7px] text-[13px] font-semibold text-brand-strong">
              <span aria-hidden="true" className="size-[7px] rounded-full bg-live" />
              {hero.badge}
            </p>
            <h1 className="text-[clamp(38px,5.6vw,76px)] leading-[1.06] font-bold tracking-[-0.02em]">
              {hero.heading}
              <br />
              <span className="text-brand">{hero.headingAccent}</span>
            </h1>
          </div>

          <div className="relative z-[1] mt-8 lg:absolute lg:inset-y-0 lg:right-0 lg:left-1/2 lg:mt-0 lg:flex lg:items-center">
            {/* The box has the truck's own aspect ratio, so the stage and shadows stay in
                proportion to the truck at every width. */}
            <div className="relative mx-auto aspect-[1447/1087] w-full max-w-[560px] lg:mr-[5%] lg:ml-0 lg:w-[92%] lg:max-w-[820px]">
              {/* Soft stage the truck stands on. It runs below every tyre so no edge
                  cuts through the truck (a horizon line would fight the photo's
                  tilted ground), deepens slightly towards the floor, and bleeds past
                  the right edge (clipped by <main>). */}
              <div
                aria-hidden="true"
                className="absolute top-[14%] -bottom-[6%] left-0 -right-[40%] isolate overflow-clip rounded-[40px] bg-linear-to-b from-soft from-40% to-soft-hover lg:-left-[3%] lg:rounded-[64px]"
              >
                <WaveField className="inset-x-0 top-0 h-3/5 text-brand opacity-[0.18]" />
              </div>
              <div className="motion-drive absolute inset-0">
                <TruckShadow />
                <Image
                  src={heroTruck}
                  alt={hero.imageAlt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-2 lg:col-span-6 lg:col-start-1 lg:mt-10 lg:pr-4">
            <div className="rounded-[24px] border bg-background p-6 sm:p-8">
              <p className="mb-6 text-lg leading-[1.65] text-ink-600">{hero.lead}</p>
              <div className="mb-6 flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className={cn(buttonVariants({ size: "cta" }), "shadow-cta max-sm:w-full")}
                >
                  ขอราคาน้ำ
                </Link>
                <a
                  href={site.phoneHref}
                  className={cn(
                    buttonVariants({ variant: "call-outline", size: "cta" }),
                    "max-sm:w-full"
                  )}
                >
                  โทรสอบถาม {site.phone}
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-[26px] gap-y-2.5">
                {hero.proof.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-[9px] text-[15px] font-medium text-ink-700"
                  >
                    <CheckMark className="size-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="ตัวเลขความน่าเชื่อถือ" className="mt-12 bg-primary lg:mt-0">
        <div className="mx-auto max-w-[1200px] px-5 py-9 lg:py-12">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {home.stats.map((stat) => (
              <li key={stat.label} className="text-white">
                <p className="font-heading text-[clamp(28px,2.4vw,34px)] leading-[1.05] font-bold whitespace-nowrap">
                  {stat.value}
                </p>
                <p className="mt-1.5 max-w-[8.5rem] text-sm text-on-dark-muted">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
