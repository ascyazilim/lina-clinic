DELETE FROM appointments
WHERE appointment_start >= TIMESTAMP '2099-04-28 00:00:00'
  AND appointment_start < TIMESTAMP '2099-05-01 00:00:00';
