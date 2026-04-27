# Lina Clinic - Güzellik Merkezi Tanıtım ve Randevu Yönetim Sistemi

**Lina Clinic**, güzellik merkezi / klinik firmaları için geliştirilmiş modern bir tanıtım sitesi ve randevu yönetim sistemidir.

Proje; kullanıcıların hizmetleri inceleyebilmesini, uygun tarih-saat seçerek randevu talebi oluşturabilmesini ve firma çalışanlarının yönetim paneli üzerinden randevuları takip edebilmesini hedefler.

---



## Kullanılan Teknolojiler

### Backend

- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security
- JWT Authentication
- PostgreSQL
- Flyway Migration
- Validation
- Lombok
- Springdoc OpenAPI / Swagger
- JUnit 5
- MockMvc Integration Tests

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router DOM
- Axios
- MUI X Date Pickers
- Dayjs

### DevOps / Araçlar

- Docker
- Docker Compose
- Maven
- Git / GitHub

---

## Proje Mimarisi

Proje monorepo yapısındadır.

```text
lina-clinic/
 ├─ backend/
 │   └─ lina-clinic-api/
 │       ├─ src/
 │       ├─ pom.xml
 │       └─ README.md
 │
 ├─ frontend/
 │   └─ lina-clinic-web/
 │       ├─ src/
 │       ├─ package.json
 │       └─ README.md
 │
 ├─ docs/
 │   ├─ api-contract.md
 │   ├─ appointment-flow.md
 │   └─ project-plan.md
 │
 ├─ docker-compose.yml
 ├─ AGENTS.md
 └─ README.md
```

Backend tarafı ilk aşamada **modüler monolith** olarak tasarlanmıştır. Böylece proje başlangıçta sade tutulmuş, ancak ileride mikroservis mimarisine ayrılabilecek şekilde modüllere bölünmüştür.

Backend modülleri:

```text
com.lina.clinic
 ├─ auth
 ├─ appointment
 ├─ treatment
 ├─ staff
 ├─ workinghour
 └─ common
```

---

## Hizmet Kategorileri

Projede aşağıdaki hizmet kategorileri bulunmaktadır:

### Lazer Uygulamaları

- Lazer Epilasyon
- Dövme Sildirme
- Lazer Cilt Uygulamaları

### Estetik Uygulamaları

- Dudak Dolgusu
- Dolgu Tedavileri
- Ameliyatsız Estetik Uygulamaları

### Cilt Bakımı ve Cilt Problemleri

- Leke Tedavileri
- Sivilce Tedavisi
- Medikal Cilt Bakımı

### Vücut Şekillendirme

- Bölgesel İncelme
- Vücut Şekillendirme
- Selülit Bakımı

### Saç Uygulamaları

- Saç Ekimi
- Saç Mezoterapisi
- PRP Saç Uygulamaları

---

## Temel Özellikler

### Public Kullanıcı Özellikleri

Kullanıcılar:

- Hizmetleri görüntüleyebilir.
- Hizmet detaylarını inceleyebilir.
- Uygun randevu tarih ve saatlerini görebilir.
- Ad, soyad, telefon, hizmet, tarih ve saat seçerek randevu talebi oluşturabilir.
- KVKK onayı vermeden randevu oluşturamaz.

### Admin / Firma Çalışanı Özellikleri

Admin kullanıcılar:

- Sisteme giriş yapabilir.
- Randevuları listeleyebilir.
- Randevu detaylarını görüntüleyebilir.
- Randevuyu onaylayabilir.
- Randevuyu iptal edebilir.
- Randevuyu tamamlandı olarak işaretleyebilir.

---

## Randevu Akışı

Randevu sistemi şu akışa göre çalışır:

1. Kullanıcı hizmet seçer.
2. Kullanıcı tarih seçer.
3. Backend, hizmet süresi ve çalışma saatlerine göre uygun slotları hesaplar.
4. Dolu saatler listeden çıkarılır.
5. Kullanıcı uygun saatlerden birini seçer.
6. Kullanıcı KVKK onayını işaretler.
7. Randevu talebi oluşturulur.
8. Aynı çalışan için aynı saat aralığında ikinci randevu oluşturulamaz.

Çakışma kontrolü şu mantıkla yapılır:

```text
existing.appointmentStart < requestedEnd
AND
existing.appointmentEnd > requestedStart
```

Bu sayede aynı zaman aralığına denk gelen randevular engellenir.

`CANCELLED` durumundaki randevular çakışma kontrolüne dahil edilmez.

---

## Randevu Durumları

Randevular aşağıdaki durumlara sahip olabilir:

```text
REQUESTED
CONFIRMED
CANCELLED
COMPLETED
NO_SHOW
```

Geçerli durum geçişleri:

```text
REQUESTED  -> CONFIRMED
REQUESTED  -> CANCELLED
CONFIRMED  -> CANCELLED
CONFIRMED  -> COMPLETED
```

Geçersiz durum geçişleri backend tarafında engellenir.

---

## API Endpointleri

### Public API

```http
GET /api/public/services
```

Aktif hizmetleri listeler.

```http
GET /api/public/services/{slug}
```

Slug değerine göre hizmet detayını getirir.

```http
GET /api/public/available-slots?serviceId={id}&date={yyyy-MM-dd}
```

Seçilen hizmet ve tarih için uygun randevu saatlerini getirir.

```http
POST /api/public/appointments
```

Public kullanıcı için randevu talebi oluşturur.

Örnek request:

```json
{
  "firstName": "İsim",
  "lastName": "Soyisim",
  "phone": "05551234567",
  "serviceId": 1,
  "appointmentDate": "2026-04-28",
  "startTime": "10:00",
  "kvkkApproved": true,
  "note": "Test randevusu"
}
```

---

### Auth API

```http
POST /api/auth/login
```

Admin kullanıcının giriş yapmasını sağlar.

Örnek request:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Örnek response:

```json
{
  "accessToken": "jwt-token",
  "tokenType": "Bearer",
  "username": "admin",
  "fullName": "Admin User",
  "role": "ADMIN"
}
```

> Not: Bu kullanıcı yalnızca local geliştirme ortamı içindir. Production ortamında varsayılan kullanıcı bilgileri değiştirilmelidir.

---

### Admin Appointment API

```http
GET /api/admin/appointments
```

Randevuları listeler.

Opsiyonel filtreler:

```text
status
date
serviceId
staffId
```

```http
GET /api/admin/appointments/{id}
```

Randevu detayını getirir.

```http
PATCH /api/admin/appointments/{id}/confirm
```

Randevuyu onaylar.

```http
PATCH /api/admin/appointments/{id}/cancel
```

Randevuyu iptal eder.

```http
PATCH /api/admin/appointments/{id}/complete
```

Randevuyu tamamlandı olarak işaretler.

---

## Local Kurulum

### Gereksinimler

- Java 17+
- Maven
- Node.js 18+
- Docker
- Docker Compose
- Git

---

## 1. Projeyi Klonlama

```bash
git clone https://github.com/ascyazilim/lina-clinic.git
cd lina-clinic
```


---

## 2. PostgreSQL Container'ını Başlatma

Proje kök dizininde:

```bash
docker compose up -d
```

PostgreSQL container bilgileri:

```text
Host: localhost
Port: 5433
Database: lina_clinic_db
Username: lina_user
Password: lina_password
```

Container durumunu kontrol etmek için:

```bash
docker compose ps
```

---

## 3. Backend'i Çalıştırma

```bash
cd backend/lina-clinic-api
mvn clean install
mvn spring-boot:run
```

Backend varsayılan olarak şu adreste çalışır:

```text
http://localhost:8080
```

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

---

## 4. Frontend'i Çalıştırma

Yeni terminal açarak:

```bash
cd frontend/lina-clinic-web
npm install
npm run dev
```

Frontend varsayılan olarak şu adreste çalışır:

```text
http://localhost:5173
```

Frontend environment dosyası:

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## Testler

Backend integration testlerini çalıştırmak için:

```bash
cd backend/lina-clinic-api
mvn clean test
```

Mevcut test kapsamı:

- Public services endpoint testi
- Service detail endpoint testi
- Available slots endpoint testi
- KVKK onayı validation testi
- Appointment create testi
- Çakışan randevu kontrolü testi
- Admin login testi
- Token olmadan admin endpoint erişim testi
- Token ile admin endpoint erişim testi
- Admin randevu durum geçişleri testi

---

## Frontend Sayfaları

Public sayfalar:

```text
/
 /hizmetler
 /hizmetler/:slug
 /randevu
 /hakkimizda
 /iletisim
 /kvkk
```

Admin sayfaları:

```text
/admin/login
/admin/dashboard
/admin/randevular
```

---

## Tasarım Yaklaşımı

Frontend tarafında sade, modern ve premium bir görünüm hedeflenmiştir.

Kullanılan genel tasarım dili:

- Beyaz ve açık krem arka plan
- Soft pembe / rose gold vurgu rengi
- Koyu lacivert ana renk
- Zarif kart tasarımları
- Responsive grid yapısı
- Mobil uyumlu layout
- Hizmet bazlı görsel fallback sistemi

---

## Güvenlik Notları

Bu proje geliştirme aşamasındadır.

Production ortamına geçmeden önce dikkat edilmesi gerekenler:

- Varsayılan admin kullanıcı bilgileri değiştirilmelidir.
- JWT secret environment variable üzerinden yönetilmelidir.
- CORS ayarları production domain ile sınırlandırılmalıdır.
- Hassas bilgiler GitHub'a eklenmemelidir.
- HTTPS kullanılmalıdır.
- KVKK metinleri hukuki danışman tarafından kontrol edilmelidir.
- Randevu formlarında yalnızca gerekli minimum kişisel veri toplanmalıdır.

---

## KVKK ve Sağlık Hizmeti Tanıtımı Notu

Bu proje güzellik merkezi / klinik tanıtımı ve randevu yönetimi amacıyla geliştirilmiştir.

Hizmet açıklamalarında:

- Kesin sonuç iddiası
- Garanti vaadi
- Abartılı reklam dili
- Yanıltıcı tedavi beyanları
- Öncesi / sonrası manipülatif anlatımlar

kullanılmaması hedeflenmiştir.

Sitede yer alan metinler bilgilendirme amacı taşır. Gerçek kullanımda tüm hukuki metinler ve hizmet açıklamaları firma yetkilileri ve ilgili uzmanlar tarafından kontrol edilmelidir.

---


## Örnek Komutlar

Backend build:

```bash
cd backend/lina-clinic-api
mvn clean install
```

Backend test:

```bash
cd backend/lina-clinic-api
mvn clean test
```

Backend run:

```bash
cd backend/lina-clinic-api
mvn spring-boot:run
```

Frontend install:

```bash
cd frontend/lina-clinic-web
npm install
```

Frontend run:

```bash
cd frontend/lina-clinic-web
npm run dev
```

Frontend build:

```bash
cd frontend/lina-clinic-web
npm run build
```

Docker PostgreSQL başlatma:

```bash
docker compose up -d
```

Docker PostgreSQL durdurma:

```bash
docker compose down
```

---
