# Lina Clinic - API Contract

## Genel Kurallar

- Base path yapisi:
  - Public endpointler: `/api/public`
  - Admin endpointler: `/api/admin`
  - Auth endpointi: `/api/auth`
- Response modellerinde entity yerine DTO kullanilir.
- Tum tarih alanlari `yyyy-MM-dd` formatindadir.
- Tum saat alanlari `HH:mm` formatindadir.
- Admin endpointleri `Authorization: Bearer <token>` gerektirir.
- Randevu durumlari ilk surum icin su sekilde planlanir:
  - `PENDING`
  - `CONFIRMED`
  - `CANCELLED`
  - `COMPLETED`

## Temel DTO Onerileri

### ServiceSummaryDto

```json
{
  "id": 1,
  "name": "Lazer Epilasyon",
  "slug": "lazer-epilasyon",
  "category": "Lazer Uygulamalari",
  "shortDescription": "Kisa ve bilgilendirici aciklama",
  "durationMinutes": 30
}
```

### ServiceDetailDto

```json
{
  "id": 1,
  "name": "Lazer Epilasyon",
  "slug": "lazer-epilasyon",
  "category": "Lazer Uygulamalari",
  "shortDescription": "Kisa aciklama",
  "description": "Detayli ve bilgilendirici aciklama",
  "durationMinutes": 30
}
```

### AvailableSlotDto

```json
{
  "date": "2026-05-01",
  "time": "10:30"
}
```

### AppointmentCreateRequest

```json
{
  "firstName": "Ayse",
  "lastName": "Yilmaz",
  "phone": "05551234567",
  "serviceId": 1,
  "date": "2026-05-01",
  "time": "10:30"
}
```

### AppointmentDto

```json
{
  "id": 45,
  "firstName": "Ayse",
  "lastName": "Yilmaz",
  "phone": "05551234567",
  "service": {
    "id": 1,
    "name": "Lazer Epilasyon"
  },
  "staff": {
    "id": 3,
    "fullName": "Uzman Personel"
  },
  "date": "2026-05-01",
  "startTime": "10:30",
  "endTime": "11:00",
  "status": "PENDING",
  "createdAt": "2026-04-26T18:30:00Z"
}
```

## Public Endpointler

### GET /api/public/services

Amac:
- Aktif hizmetlerin listesini dondurur.

Response `200 OK`:

```json
[
  {
    "id": 1,
    "name": "Lazer Epilasyon",
    "slug": "lazer-epilasyon",
    "category": "Lazer Uygulamalari",
    "shortDescription": "Kisa ve bilgilendirici aciklama",
    "durationMinutes": 30
  }
]
```

### GET /api/public/services/{slug}

Amac:
- Tek bir hizmetin detayini slug ile dondurur.

Path parametreleri:
- `slug`: hizmetin URL dostu benzersiz alani

Response `200 OK`:

```json
{
  "id": 1,
  "name": "Lazer Epilasyon",
  "slug": "lazer-epilasyon",
  "category": "Lazer Uygulamalari",
  "shortDescription": "Kisa aciklama",
  "description": "Detayli ve bilgilendirici aciklama",
  "durationMinutes": 30
}
```

Response `404 Not Found`:

```json
{
  "message": "Service not found"
}
```

### GET /api/public/available-slots?serviceId={id}&date={yyyy-MM-dd}

Amac:
- Secilen hizmet ve tarih icin kullanicinin secebilecegi uygun saatleri dondurur.

Query parametreleri:
- `serviceId`: hizmet kimligi
- `date`: randevu tarihi

Kurallar:
- Kullanici sadece bu endpointin dondurdugu saatleri secebilir.
- Slotlar, aktif calisanlarin uygunlugu ve calisma saatleri dikkate alinarak hesaplanir.
- `CANCELLED` durumundaki randevular cakisma hesabina dahil edilmez.

Response `200 OK`:

```json
[
  {
    "date": "2026-05-01",
    "time": "10:00"
  },
  {
    "date": "2026-05-01",
    "time": "10:30"
  },
  {
    "date": "2026-05-01",
    "time": "11:00"
  }
]
```

Response `400 Bad Request`:

```json
{
  "message": "Invalid date or serviceId"
}
```

### POST /api/public/appointments

Amac:
- Kullanici tarafindan yeni randevu talebi olusturur.

Request body:

```json
{
  "firstName": "Ayse",
  "lastName": "Yilmaz",
  "phone": "05551234567",
  "serviceId": 1,
  "date": "2026-05-01",
  "time": "10:30"
}
```

Kurallar:
- Islem `@Transactional` olarak calismalidir.
- Secilen saat tekrar backend tarafinda dogrulanmalidir.
- Uygun staff bulunursa randevu olusturulur ve ilgili staff atanir.
- Cakisma varsa istek reddedilir.

Response `201 Created`:

```json
{
  "id": 45,
  "status": "PENDING",
  "message": "Appointment request created"
}
```

Response `409 Conflict`:

```json
{
  "message": "Selected slot is no longer available"
}
```

## Auth Endpointi

### POST /api/auth/login

Amac:
- Admin/calisan kullanicisi icin giris yapar ve JWT dondurur.

Request body:

```json
{
  "username": "admin",
  "password": "secret"
}
```

Response `200 OK`:

```json
{
  "accessToken": "jwt-token",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "user": {
    "id": 1,
    "username": "admin",
    "role": "ADMIN"
  }
}
```

Response `401 Unauthorized`:

```json
{
  "message": "Invalid credentials"
}
```

## Admin Appointment Endpointleri

### GET /api/admin/appointments

Amac:
- Randevulari listelemek ve filtrelemek.

Onerilen query parametreleri:
- `status`
- `date`
- `serviceId`
- `phone`
- `page`
- `size`

Response `200 OK`:

```json
{
  "content": [
    {
      "id": 45,
      "firstName": "Ayse",
      "lastName": "Yilmaz",
      "phone": "05551234567",
      "date": "2026-05-01",
      "startTime": "10:30",
      "endTime": "11:00",
      "status": "PENDING",
      "serviceName": "Lazer Epilasyon",
      "staffName": "Uzman Personel"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

### GET /api/admin/appointments/{id}

Amac:
- Tek bir randevunun detayini dondurur.

Response `200 OK`:

```json
{
  "id": 45,
  "firstName": "Ayse",
  "lastName": "Yilmaz",
  "phone": "05551234567",
  "service": {
    "id": 1,
    "name": "Lazer Epilasyon"
  },
  "staff": {
    "id": 3,
    "fullName": "Uzman Personel"
  },
  "date": "2026-05-01",
  "startTime": "10:30",
  "endTime": "11:00",
  "status": "PENDING",
  "notes": null,
  "createdAt": "2026-04-26T18:30:00Z"
}
```

### PATCH /api/admin/appointments/{id}/confirm

Amac:
- Bekleyen randevuyu onaylar.

Response `200 OK`:

```json
{
  "id": 45,
  "status": "CONFIRMED"
}
```

### PATCH /api/admin/appointments/{id}/cancel

Amac:
- Randevuyu iptal eder.

Request body:

```json
{
  "reason": "User requested cancellation"
}
```

Response `200 OK`:

```json
{
  "id": 45,
  "status": "CANCELLED"
}
```

### PATCH /api/admin/appointments/{id}/complete

Amac:
- Onayli randevuyu tamamlandi durumuna gunceller.

Response `200 OK`:

```json
{
  "id": 45,
  "status": "COMPLETED"
}
```

## Admin Service CRUD

### GET /api/admin/services

- Hizmet listesini dondurur.

### GET /api/admin/services/{id}

- Tek bir hizmetin detayini dondurur.

### POST /api/admin/services

Request body:

```json
{
  "name": "Lazer Epilasyon",
  "slug": "lazer-epilasyon",
  "category": "Lazer Uygulamalari",
  "shortDescription": "Kisa aciklama",
  "description": "Detayli aciklama",
  "durationMinutes": 30,
  "active": true
}
```

### PUT /api/admin/services/{id}

- Mevcut hizmeti tum alanlariyla gunceller.

### PATCH /api/admin/services/{id}

- Hizmetin sinirli alanlarini gunceller.

### DELETE /api/admin/services/{id}

- Hizmeti siler veya soft delete yapar.

## Admin Staff CRUD

### GET /api/admin/staff

- Calisan listesini dondurur.

### GET /api/admin/staff/{id}

- Tek bir calisani dondurur.

### POST /api/admin/staff

Request body:

```json
{
  "fullName": "Uzman Personel",
  "phone": "05550000000",
  "serviceIds": [1, 2],
  "active": true
}
```

### PUT /api/admin/staff/{id}

- Calisan kaydini tum alanlariyla gunceller.

### PATCH /api/admin/staff/{id}

- Calisanin sinirli alanlarini gunceller.

### DELETE /api/admin/staff/{id}

- Calisani siler veya pasife alir.

## Admin Working Hours CRUD

### GET /api/admin/working-hours

- Calisma saati kayitlarini listeler.

### GET /api/admin/working-hours/{id}

- Tek bir kaydi dondurur.

### POST /api/admin/working-hours

Request body:

```json
{
  "staffId": 3,
  "dayOfWeek": "MONDAY",
  "startTime": "09:00",
  "endTime": "18:00",
  "breakStartTime": "12:00",
  "breakEndTime": "13:00",
  "active": true
}
```

### PUT /api/admin/working-hours/{id}

- Kaydi tum alanlariyla gunceller.

### PATCH /api/admin/working-hours/{id}

- Kaydin sinirli alanlarini gunceller.

### DELETE /api/admin/working-hours/{id}

- Kaydi siler veya pasife alir.

## Hata Kodlari Onerisi

- `400 Bad Request`: validation veya format hatasi
- `401 Unauthorized`: kimlik dogrulama basarisiz
- `403 Forbidden`: yetki yetersiz
- `404 Not Found`: kayit bulunamadi
- `409 Conflict`: slot cakismasi veya durum gecisi uyumsuzlugu
- `422 Unprocessable Entity`: is kurali ihlali
