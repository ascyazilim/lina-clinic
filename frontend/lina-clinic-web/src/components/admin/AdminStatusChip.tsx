import { Chip } from "@mui/material";
import type { ChipProps } from "@mui/material";
import type { AppointmentStatus } from "../../types/appointment";

const statusMeta: Record<
  AppointmentStatus,
  { label: string; color: ChipProps["color"] }
> = {
  REQUESTED: { label: "Bekliyor", color: "warning" },
  CONFIRMED: { label: "Onaylandi", color: "success" },
  CANCELLED: { label: "Iptal Edildi", color: "error" },
  COMPLETED: { label: "Tamamlandi", color: "info" },
  NO_SHOW: { label: "Gelmedi", color: "default" },
};

export function getAppointmentStatusMeta(status: AppointmentStatus) {
  return statusMeta[status];
}

interface AdminStatusChipProps {
  status: AppointmentStatus;
}

export function AdminStatusChip({ status }: AdminStatusChipProps) {
  const meta = getAppointmentStatusMeta(status);

  return (
    <Chip
      label={meta.label}
      color={meta.color}
      size="small"
      sx={{ borderRadius: "10px", fontWeight: 700 }}
    />
  );
}
