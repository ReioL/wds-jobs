import { ExperienceLevel, JobListingStatus, JobListingType, LocationRequirement, WageInterval } from "@/drizzle/schema";

export function formatWageInterval(wageInterval: WageInterval) {
  switch (wageInterval) {
    case "hourly":
      return "Hour";
    case "yearly":
      return "Year";
    default:
      throw new Error("Invalid wage interval");
  }
}

export function formatLocationRequirement(locationRequirement: LocationRequirement) {
  switch (locationRequirement) {
    case "in-office":
      return "In-Office";
    case "hybrid":
      return "Hybrid";
    case "remote":
      return "Remote";
    default:
      throw new Error("Invalid location requirement");
  }
}

export function formatJobType(jobType: JobListingType) {
  switch (jobType) {
    case "internship":
      return "Internship";
    case "part-time":
      return "Part Time";
    case "full-time":
      return "Full Time";
    default:
      throw new Error("Invalid job type");
  }
}

export function formatExperienceLevel(experienceLevel: ExperienceLevel) {
  switch (experienceLevel) {
    case "junior":
      return "Junior";
    case "mid-level":
      return "Mid Level";
    case "senior":
      return "Senior";
    default:
      throw new Error("Invalid experience level");
  }
}

export function formatJobListingStatus(status: JobListingStatus) {
  switch (status) {
    case "draft":
      return "Draft";
    case "published":
      return "Published";
    case "delisted":
      return "Delisted";
    default:
      throw new Error("Invalid job listing status");
  }
}

export function formatWage(wage: number, wageInterval: WageInterval) {
  const wageFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  switch (wageInterval) {
    case "hourly": {
      return `${wageFormatter.format(wage)} / hr`;
    }
    case "yearly": {
      return wageFormatter.format(wage);
    }
    default:
      throw new Error(`Unknown wage interval: ${wageInterval satisfies never}`);
  }
}

export function formatJobListingLocation({
  stateAbbreviation,
  city,
}: {
  stateAbbreviation: string | null;
  city: string | null;
}) {
  if (stateAbbreviation == null && city == null) return "None";

  const locationParts = [];
  if (city != null) locationParts.push(city);
  if (stateAbbreviation != null) {
    locationParts.push(stateAbbreviation.toUpperCase());
  }

  return locationParts.join(", ");
}
