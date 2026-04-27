package com.lina.clinic.adminapi;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lina.clinic.appointment.entity.Appointment;
import com.lina.clinic.appointment.enums.AppointmentStatus;
import com.lina.clinic.appointment.repository.AppointmentRepository;
import com.lina.clinic.auth.dto.LoginRequest;
import com.lina.clinic.staff.entity.StaffMember;
import com.lina.clinic.staff.entity.StaffService;
import com.lina.clinic.staff.repository.StaffServiceRepository;
import com.lina.clinic.treatment.entity.TreatmentService;
import com.lina.clinic.treatment.repository.TreatmentServiceRepository;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(scripts = "/sql/cleanup-admin-appointments.sql", executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/sql/cleanup-admin-appointments.sql", executionPhase = ExecutionPhase.AFTER_TEST_METHOD)
class AuthAndAdminAppointmentApiIntegrationTest {

    private static final String SERVICE_SLUG = "lazer-epilasyon";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    @Autowired
    private StaffServiceRepository staffServiceRepository;

    @Test
    void loginReturnsJwtForSeededAdminUser() throws Exception {
        LoginRequest request = new LoginRequest("admin", "admin123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.accessToken").isString())
                .andExpect(jsonPath("$.data.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.data.username").value("admin"))
                .andExpect(jsonPath("$.data.fullName").value("Admin User"))
                .andExpect(jsonPath("$.data.role").value("ADMIN"));
    }

    @Test
    void getAdminAppointmentsWithoutTokenReturnsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/admin/appointments"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Authentication required"));
    }

    @Test
    void getAdminAppointmentsWithTokenReturnsFilteredAppointments() throws Exception {
        Appointment appointment = createAppointment(
                AppointmentStatus.REQUESTED,
                "7778880001",
                LocalDateTime.of(2099, 5, 3, 9, 0)
        );

        String token = loginAndGetAccessToken();

        mockMvc.perform(get("/api/admin/appointments")
                        .header(AUTHORIZATION, bearerToken(token))
                        .param("status", "REQUESTED")
                        .param("date", "2099-05-03")
                        .param("serviceId", appointment.getTreatmentService().getId().toString())
                        .param("staffId", appointment.getStaffMember().getId().toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[*].id", hasItem(appointment.getId().intValue())))
                .andExpect(jsonPath("$.data[0].status").value("REQUESTED"));
    }

    @Test
    void confirmEndpointAllowsRequestedAppointment() throws Exception {
        Appointment appointment = createAppointment(
                AppointmentStatus.REQUESTED,
                "7778880002",
                LocalDateTime.of(2099, 5, 4, 10, 0)
        );

        String token = loginAndGetAccessToken();

        mockMvc.perform(patch("/api/admin/appointments/{id}/confirm", appointment.getId())
                        .header(AUTHORIZATION, bearerToken(token)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(appointment.getId()))
                .andExpect(jsonPath("$.data.status").value("CONFIRMED"));
    }

    @Test
    void completeEndpointAllowsConfirmedAppointment() throws Exception {
        Appointment appointment = createAppointment(
                AppointmentStatus.CONFIRMED,
                "7778880003",
                LocalDateTime.of(2099, 5, 5, 11, 0)
        );

        String token = loginAndGetAccessToken();

        mockMvc.perform(patch("/api/admin/appointments/{id}/complete", appointment.getId())
                        .header(AUTHORIZATION, bearerToken(token)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(appointment.getId()))
                .andExpect(jsonPath("$.data.status").value("COMPLETED"));
    }

    @Test
    void confirmEndpointRejectsCancelledAppointment() throws Exception {
        Appointment appointment = createAppointment(
                AppointmentStatus.CANCELLED,
                "7778880004",
                LocalDateTime.of(2099, 5, 6, 12, 0)
        );

        String token = loginAndGetAccessToken();

        mockMvc.perform(patch("/api/admin/appointments/{id}/confirm", appointment.getId())
                        .header(AUTHORIZATION, bearerToken(token)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message")
                        .value("Invalid appointment status transition from CANCELLED to CONFIRMED"));
    }

    private Appointment createAppointment(
            AppointmentStatus status,
            String phone,
            LocalDateTime appointmentStart
    ) {
        TreatmentService treatmentService = treatmentServiceRepository
                .findBySlugAndActiveTrueAndCategoryActiveTrue(SERVICE_SLUG)
                .orElseThrow(() -> new IllegalStateException("Seeded treatment service not found: " + SERVICE_SLUG));

        StaffMember staffMember = staffServiceRepository.findActiveStaffServicesByTreatmentServiceId(treatmentService.getId())
                .stream()
                .map(StaffService::getStaffMember)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No active staff found for service: " + SERVICE_SLUG));

        Appointment appointment = new Appointment();
        appointment.setCustomerFirstName("Admin");
        appointment.setCustomerLastName("Flow");
        appointment.setCustomerPhone(phone);
        appointment.setTreatmentService(treatmentService);
        appointment.setStaffMember(staffMember);
        appointment.setAppointmentStart(appointmentStart);
        appointment.setAppointmentEnd(appointmentStart.plusMinutes(treatmentService.getDurationMinutes()));
        appointment.setStatus(status);
        appointment.setKvkkApproved(true);
        appointment.setNote("Admin appointment integration test");

        return appointmentRepository.saveAndFlush(appointment);
    }

    private String loginAndGetAccessToken() throws Exception {
        LoginRequest request = new LoginRequest("admin", "admin123");

        MvcResult mvcResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(request)))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode responseJson = objectMapper.readTree(mvcResult.getResponse().getContentAsByteArray());
        return responseJson.path("data").path("accessToken").asText();
    }

    private String bearerToken(String accessToken) {
        return "Bearer " + accessToken;
    }
}
