package com.lina.clinic.publicapi;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lina.clinic.appointment.dto.AppointmentCreateRequest;
import com.lina.clinic.treatment.entity.TreatmentService;
import com.lina.clinic.treatment.repository.TreatmentServiceRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(scripts = "/sql/cleanup-public-appointments.sql", executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/sql/cleanup-public-appointments.sql", executionPhase = ExecutionPhase.AFTER_TEST_METHOD)
class PublicAppointmentApiIntegrationTest {

    private static final String SERVICE_SLUG = "lazer-epilasyon";
    private static final String SERVICE_NAME = "Lazer Epilasyon";
    private static final LocalDate AVAILABLE_SLOTS_DATE = LocalDate.of(2099, 4, 28);
    private static final LocalDate KVKK_VALIDATION_DATE = LocalDate.of(2099, 4, 29);
    private static final LocalDate APPOINTMENT_CREATE_DATE = LocalDate.of(2099, 4, 30);
    private static final LocalTime FIRST_SLOT_TIME = LocalTime.of(9, 0);
    private static final LocalTime KVKK_VALIDATION_TIME = LocalTime.of(10, 0);
    private static final LocalTime APPOINTMENT_CREATE_TIME = LocalTime.of(11, 0);

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    @Test
    void getServicesReturnsSeededServicesWithoutAuthentication() throws Exception {
        mockMvc.perform(get("/api/public/services"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[*].slug", hasItem(SERVICE_SLUG)))
                .andExpect(jsonPath("$.data[*].name", hasItem(SERVICE_NAME)));
    }

    @Test
    void getServiceDetailReturnsSeededServiceWithoutAuthentication() throws Exception {
        mockMvc.perform(get("/api/public/services/{slug}", SERVICE_SLUG))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.slug").value(SERVICE_SLUG))
                .andExpect(jsonPath("$.data.name").value(SERVICE_NAME))
                .andExpect(jsonPath("$.data.category.slug").value("lazer-uygulamalari"));
    }

    @Test
    void getAvailableSlotsReturnsNonEmptySlotsForSeededService() throws Exception {
        mockMvc.perform(get("/api/public/available-slots")
                        .param("serviceId", getServiceId().toString())
                        .param("date", AVAILABLE_SLOTS_DATE.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].date").value(AVAILABLE_SLOTS_DATE.toString()))
                .andExpect(jsonPath("$.data[*].time", hasItem("09:00:00")));
    }

    @Test
    void createAppointmentReturnsBadRequestWhenKvkkApprovalIsFalse() throws Exception {
        AppointmentCreateRequest request = new AppointmentCreateRequest(
                "Integration",
                "Tester",
                "9998880001",
                getServiceId(),
                KVKK_VALIDATION_DATE,
                KVKK_VALIDATION_TIME,
                false,
                "KVKK validation test"
        );

        mockMvc.perform(post("/api/public/appointments")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.errors.kvkkApproved").value("KVKK approval must be true"));
    }

    @Test
    void createAppointmentReturnsCreatedWhenKvkkApprovalIsTrue() throws Exception {
        AppointmentCreateRequest request = new AppointmentCreateRequest(
                "Integration",
                "Tester",
                "9998880002",
                getServiceId(),
                APPOINTMENT_CREATE_DATE,
                APPOINTMENT_CREATE_TIME,
                true,
                "Successful appointment test"
        );

        mockMvc.perform(post("/api/public/appointments")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("REQUESTED"))
                .andExpect(jsonPath("$.data.treatmentServiceName").value(SERVICE_NAME))
                .andExpect(jsonPath("$.data.appointmentStart").value("2099-04-30T11:00:00"));
    }

    @Test
    void createAppointmentReturnsConflictWhenSameSlotIsRequestedTwice() throws Exception {
        AppointmentCreateRequest firstRequest = new AppointmentCreateRequest(
                "Integration",
                "Tester",
                "9998880003",
                getServiceId(),
                AVAILABLE_SLOTS_DATE,
                FIRST_SLOT_TIME,
                true,
                "First slot reservation"
        );

        AppointmentCreateRequest secondRequest = new AppointmentCreateRequest(
                "Integration",
                "Tester",
                "9998880004",
                getServiceId(),
                AVAILABLE_SLOTS_DATE,
                FIRST_SLOT_TIME,
                true,
                "Conflict slot reservation"
        );

        mockMvc.perform(post("/api/public/appointments")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(firstRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));

        mockMvc.perform(post("/api/public/appointments")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(secondRequest)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Selected slot is not available"));
    }

    private Long getServiceId() {
        TreatmentService treatmentService = treatmentServiceRepository
                .findBySlugAndActiveTrueAndCategoryActiveTrue(SERVICE_SLUG)
                .orElseThrow(() -> new IllegalStateException("Seeded treatment service not found: " + SERVICE_SLUG));

        return treatmentService.getId();
    }
}
