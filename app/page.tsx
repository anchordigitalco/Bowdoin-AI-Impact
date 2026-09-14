import { Hero } from "@/components/home/Hero";
import { HeroQuote } from "@/components/home/HeroQuote";
import { HeroPitch } from "@/components/home/HeroPitch";
import { AcademicCalendar } from "@/components/home/AcademicCalendar";
import { ThreeUp } from "@/components/home/ThreeUp";
import { CurriculumTeaser } from "@/components/home/CurriculumTeaser";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { ClosingCta } from "@/components/home/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroQuote />
      <HeroPitch />
      <AcademicCalendar />
      <ThreeUp />
      <CurriculumTeaser />
      <ProjectsTeaser />
      <ClosingCta />
    </>
  );
}
