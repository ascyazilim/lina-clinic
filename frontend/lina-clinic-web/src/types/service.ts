export interface ServiceImage {
  src?: string;
  alt: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: ServiceImage;
}

export interface ServiceSummary {
  id: number;
  name: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  durationMinutes: number;
  requiresDoctor: boolean;
  image?: ServiceImage;
}

export interface ServiceDetail extends ServiceSummary {
  detailDescription: string;
  overviewPoints: string[];
}

export interface ServiceCategoryGroup extends ServiceCategory {
  services: ServiceDetail[];
  serviceCount: number;
}
