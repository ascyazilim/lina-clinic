import { apiClient, type ApiResponse } from "./client";
import type { ServiceDetail, ServiceSummary } from "../types/service";
import { getServiceBySlug as getCatalogServiceBySlug } from "../components/services/serviceCatalog";

function enrichServiceSummary(service: ServiceSummary): ServiceSummary {
  const catalogService = getCatalogServiceBySlug(service.slug);

  return {
    ...service,
    category: {
      ...service.category,
      description: catalogService?.category.description ?? "",
      image: catalogService?.category.image,
    },
    image: catalogService?.image,
  };
}

export const publicServiceApi = {
  async getServices() {
    const response =
      await apiClient.get<ApiResponse<ServiceSummary[]>>("/api/public/services");

    return (response.data.data ?? []).map(enrichServiceSummary);
  },

  async getServiceBySlug(slug: string) {
    const response = await apiClient.get<ApiResponse<ServiceDetail>>(
      `/api/public/services/${slug}`,
    );

    const service = response.data.data;

    if (!service) {
      return null;
    }

    const catalogService = getCatalogServiceBySlug(service.slug);

    return {
      ...service,
      category: {
        ...service.category,
        description: catalogService?.category.description ?? "",
        image: catalogService?.category.image,
      },
      image: catalogService?.image,
      overviewPoints: catalogService?.overviewPoints ?? [],
    };
  },
};
