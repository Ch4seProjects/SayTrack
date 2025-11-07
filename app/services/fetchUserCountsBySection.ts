import { getSupabaseClient } from "@/app/utils/client";
import { SECTIONS } from "@/lib/constants";

type Section = (typeof SECTIONS)[number];

type SectionCount = {
  section: Section;
  count: number;
};

export async function fetchUserCountsBySection(): Promise<{
  sectionCounts: SectionCount[];
  totalCount: number;
  totalAdmins: number;
}> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("section, type");

  if (error || !data) {
    console.error("Error fetching user sections:", error);
    return {
      sectionCounts: SECTIONS.map((section) => ({ section, count: 0 })),
      totalCount: 0,
      totalAdmins: 0,
    };
  }

  // Initialize counts for each section
  const counts: Record<Section, number> = {
    Newton: 0,
    Bernoulli: 0,
    Galileo: 0,
    Charles: 0,
    Boyle: 0,
  };

  let totalAdmins = 0;

  // Tally counts from fetched data
  for (const profile of data) {
    const section = profile.section as Section;
    if (SECTIONS.includes(section)) {
      counts[section]++;
    }

    if (profile.type === "admin") {
      totalAdmins++;
    }
  }

  // Format results
  const sectionCounts = SECTIONS.map((section) => ({
    section,
    count: counts[section],
  }));

  const totalCount = sectionCounts.reduce((sum, s) => sum + s.count, 0);

  return { sectionCounts, totalCount, totalAdmins };
}
