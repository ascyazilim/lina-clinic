import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Alert, Box, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import type { AvailableSlot } from "../../types/appointment";

interface AvailableSlotSelectorProps {
  slots: AvailableSlot[];
  selectedTime: string;
  isLoading: boolean;
  hasSearchCriteria: boolean;
  helperMessage: string | null;
  onSelect: (time: string) => void;
}

export function AvailableSlotSelector({
  slots,
  selectedTime,
  isLoading,
  hasSearchCriteria,
  helperMessage,
  onSelect,
}: AvailableSlotSelectorProps) {
  return (
    <Stack spacing={1.6}>
      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
        Uygun saatler
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            minHeight: 112,
            borderRadius: "18px",
            border: "1px dashed",
            borderColor: "divider",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Stack direction="row" spacing={1.25} alignItems="center">
            <CircularProgress size={20} color="secondary" />
            <Typography color="text.secondary">Uygun saatler aliniyor...</Typography>
          </Stack>
        </Box>
      ) : null}

      {!isLoading && helperMessage ? (
        <Alert severity={hasSearchCriteria ? "warning" : "info"} sx={{ borderRadius: "18px" }}>
          {helperMessage}
        </Alert>
      ) : null}

      {!isLoading && slots.length > 0 ? (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {slots.map((slot) => {
            const label = slot.time.slice(0, 5);

            return (
              <Chip
                key={`${slot.date}-${slot.time}`}
                icon={<AccessTimeRoundedIcon />}
                label={label}
                clickable={slot.available}
                disabled={!slot.available}
                color={selectedTime === slot.time ? "secondary" : "default"}
                variant={selectedTime === slot.time ? "filled" : "outlined"}
                onClick={() => {
                  if (slot.available) {
                    onSelect(slot.time);
                  }
                }}
                sx={{
                  height: 38,
                  borderRadius: "12px",
                  px: 0.8,
                }}
              />
            );
          })}
        </Stack>
      ) : null}
    </Stack>
  );
}
