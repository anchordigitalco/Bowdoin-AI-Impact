import { Hero } from "@/components/home/Hero";
import { HeroPitch } from "@/components/home/HeroPitch";
import { AcademicCalendar } from "@/components/home/AcademicCalendar";
import { WhatThisClubIs } from "@/components/home/WhatThisClubIs";
import { ThreeUp } from "@/components/home/ThreeUp";
import { CurriculumTeaser } from "@/components/home/CurriculumTeaser";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { ClosingCta } from "@/components/home/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroPitch />
      <AcademicCalendar />
      <WhatThisClubIs />
      <ThreeUp />
      <CurriculumTeaser />
      <ProjectsTeaser />
      <ClosingCta />
    </>
  );
}
