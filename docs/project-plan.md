# Lina Clinic - Project Plan

## Proje Amaci

Lina Clinic projesinin amaci, Lina Guzellik Merkezi icin iki ana ihtiyaci karsilayan fullstack bir sistem olusturmaktir:

1. Hizmetlerin sade, bilgilendirici ve duzenli bir tanitim yapisiyla kullanicilara sunulmasi
2. Kullanici tarafinda randevu talebi olusturma, admin/calisan tarafinda ise randevu yonetimi yapilmasi

Ilk surum, mikroservis yerine moduler monolith olarak gelistirilecektir. Bu yaklasim, daha dusuk operasyonel karmasiklik ile daha hizli gelistirme ve daha kolay bakim hedefler.

## Kullanilacak Teknolojiler

### Backend

- Java 17
- Spring Boot 3
- Maven
- PostgreSQL
- Spring Data JPA
- Spring Security + JWT
- Flyway
- Bean Validation
- Lombok
- Springdoc OpenAPI

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router
- Axios
- MUI X Date Pickers
- Dayjs

## Backend Modulleri

Backend, moduler monolith yaklasimiyla asagidaki sorumluluklara ayrilacaktir:

### 1. Auth Modulu

- Admin/calisan girisi
- JWT token uretimi ve dogrulamasi
- Yetki bazli erisim kurallari

### 2. Public Service Catalog Modulu

- Hizmet listesinin sunulmasi
- Hizmet detayinin slug bazli sunulmasi
- Hizmet kategorilerinin yapilandirilmasi
- Public sayfalar icin DTO bazli veri cikisi

### 3. Appointment Modulu

- Randevu talebi olusturma
- Uygun saatlerin hesaplanmasi
- Cakisma kontrolu
- Randevu durum yonetimi
- `@Transactional` randevu olusturma akisi

### 4. Staff Modulu

- Calisan kayitlari
- Calisan-hizmet iliskileri
- Calisan aktif/pasif durumu

### 5. Working Hours Modulu

- Calisma gunleri ve saatlerinin tanimlanmasi
- Gerekirse mola araliklarinin tanimlanmasi
- Uygun slot hesaplamasina veri saglanmasi

### 6. Admin Management Modulu

- Randevu listeleme ve filtreleme
- Randevu detay goruntuleme
- Onaylama, iptal etme, tamamlandi olarak isaretleme
- Hizmet CRUD
- Calisan CRUD
- Calisma saati CRUD

### 7. Common/Infrastructure Modulu

- Ortak exception handling
- API response standardi
- DTO mapping
- Validation ve sabitler
- Audit alanlari ve ortak teknik altyapi

## Frontend Sayfalari

### Public Sayfalar

- Ana sayfa
- Hizmetler sayfasi
- Hizmet detay sayfasi
- Randevu olusturma sayfasi
- Randevu talebi basarili/alinmistir sayfasi
- Iletisim ve temel kurumsal bilgi bolumleri

### Admin Sayfalari

- Giris sayfasi
- Admin dashboard
- Randevu listesi
- Randevu detay sayfasi
- Hizmet yonetimi sayfasi
- Calisan yonetimi sayfasi
- Calisma saatleri yonetimi sayfasi

## Admin Panel Ozellikleri

- JWT tabanli giris
- Randevulari listeleme
- Duruma, tarihe, hizmete veya telefona gore filtreleme
- Randevu detayini goruntuleme
- Randevuyu onaylama
- Randevuyu iptal etme
- Randevuyu tamamlandi olarak guncelleme
- Hizmet ekleme, guncelleme, pasife alma veya silme
- Calisan ekleme, guncelleme, pasife alma veya silme
- Calisma gunu ve saatlerini tanimlama ve guncelleme

## Gelistirme Asamalari

### Asama 1 - Temel Kurulum

- Backend ve frontend proje iskeletlerinin hazirlanmasi
- Temel klasor yapilarinin olusturulmasi
- Ortam degiskenleri ve konfigurasyonlarin ayrilmasi
- Flyway ve veritabani baglantisinin hazirlanmasi

### Asama 2 - Domain ve Veri Modeli

- Hizmet, calisan, calisma saati, randevu ve kullanici modellerinin tasarlanmasi
- Entity-DTO ayriminin netlestirilmesi
- Ilk migration dosyalarinin yazilmasi

### Asama 3 - Public API

- Hizmet listeleme ve detay endpointlerinin tamamlanmasi
- Uygun saat sorgulama endpointinin hazirlanmasi
- Randevu talebi olusturma endpointinin tamamlanmasi

### Asama 4 - Guvenlik ve Admin API

- Login akisi ve JWT yapisinin kurulmasi
- Admin randevu yonetimi endpointleri
- Hizmet, calisan ve calisma saati CRUD endpointleri

### Asama 5 - Public Frontend

- Tanitim sayfalari
- Hizmet listeleme ve detay ekranlari
- Randevu formu ve uygun saat secimi

### Asama 6 - Admin Frontend

- Login ekrani
- Dashboard
- Randevu yonetim ekranlari
- Hizmet/calisan/calisma saati yonetim ekranlari

### Asama 7 - Test ve Dogrulama

- Backend unit ve integration testleri
- Kritik randevu akislari icin test senaryolari
- Frontend form, durum ve entegrasyon testleri

### Asama 8 - Yayin Hazirligi

- OpenAPI dokumantasyonu kontrolu
- CORS, logging ve production ayarlari
- Temel hata izleme ve deploy hazirligi
