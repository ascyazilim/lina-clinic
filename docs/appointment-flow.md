# Lina Clinic - Appointment Flow

## Kullanicinin Randevu Alma Akisi

1. Kullanici public tarafta hizmetleri listeler.
2. Kullanici bir hizmet detayi acar ve ilgili hizmeti inceler.
3. Kullanici randevu formunda ad, soyad, telefon ve hizmet secimini yapar.
4. Kullanici tarih secer.
5. Frontend, secilen hizmet ve tarih icin `GET /api/public/available-slots` endpointini cagirir.
6. Backend'in dondugu uygun saatler ekranda listelenir.
7. Kullanici yalnizca bu listeden bir saat secer.
8. Frontend, `POST /api/public/appointments` ile randevu talebini gonderir.
9. Backend slotu tekrar dogrular, uygun staff atar ve randevuyu `PENDING` durumunda olusturur.
10. Kullaniciya randevu talebinin alindigi bilgisi gosterilir.

## Backend'in Uygun Saat Hesaplama Mantigi

Uygun saat hesaplama akisi ilk surum icin asagidaki sekilde planlanir:

1. `serviceId` ile hizmet kaydi bulunur.
2. Hizmetin `durationMinutes` degeri okunur.
3. Secilen tarihte calisan ve aktif staff kayitlari bulunur.
4. Staff bazli calisma saatleri kayitlari okunur.
5. Gerekirse mola araliklari hesap disi birakilir.
6. Her uygun staff icin, calisma saati araliginda slot adaylari uretilir.
7. Slot uzunlugu hizmet suresine gore belirlenir.
8. Mevcut randevular okunur.
9. `PENDING`, `CONFIRMED` ve gerekirse operasyonel karara gore `COMPLETED` kayitlari cakisma hesabina dahil edilir.
10. `CANCELLED` kayitlari musaitlik hesabina dahil edilmez.
11. En az bir uygun staff tarafinda karsilanabilen saatler public API sonucunda dondurulur.

## Onerilen Slot Kurallari

- Saatler `HH:mm` formatinda sunulur.
- Slot araligi ilk surumde sabit olabilir.
- Onerilen varsayim: 30 dakikalik baslangic araliklari kullanilsin.
- Hizmet suresi 30 dakikadan uzunsa, secilen saatten itibaren gereken tum zaman araligi bos olmali.
- Gecmis tarih veya gecmis saat icin slot dondurulmez.

## Cakisan Randevu Kontrolu

Randevu olusturma sirasinda sadece public tarafta gorunen slot listesine guvenilmez. Backend ikinci kez kontrol yapar.

Kontrol adimlari:

1. Gelen `serviceId`, `date` ve `time` bilgisi dogrulanir.
2. Hizmetin suresine gore `startTime` ve `endTime` hesaplanir.
3. Bu araligi karsilayabilecek bir staff secilir.
4. Ayni staff icin ayni tarihte var olan randevular sorgulanir.
5. Asagidaki mantikla cakisma kontrolu yapilir:

```text
existing.startTime < new.endTime
AND
existing.endTime > new.startTime
```

6. Cakisma varsa randevu olusturulmaz.
7. Cakisma yoksa randevu tek transaction icinde kaydedilir.

## Transaction ve Veri Tutarliligi

- Randevu olusturma service katmaninda `@Transactional` olmalidir.
- Slot sorgusu ile kayit olusturma arasinda yaris durumu olabilecegi icin son kontrol kayit aninda tekrar yapilmalidir.
- Gerekirse veritabani seviyesinde ek unique/index veya locking stratejileri ile veri tutarliligi guclendirilebilir.

## Admin Onay / Iptal / Tamamlandi Akisi

### Onay Akisi

1. Admin veya calisan bekleyen randevulari listeler.
2. Randevu detayi acilir.
3. Uygunsa `confirm` aksiyonu calistirilir.
4. Durum `PENDING -> CONFIRMED` olarak guncellenir.

### Iptal Akisi

1. Admin veya calisan randevuyu secer.
2. Gerekirse iptal nedeni girer.
3. `cancel` aksiyonu calistirilir.
4. Durum `PENDING` veya `CONFIRMED` durumundan `CANCELLED` durumuna cekilir.
5. Iptal edilen kayit, ileride ayni zaman araliginin yeniden uygun gorunmesine izin verir.

### Tamamlandi Akisi

1. Onaylanmis randevu hizmet verildikten sonra secilir.
2. `complete` aksiyonu calistirilir.
3. Durum `CONFIRMED -> COMPLETED` olarak guncellenir.

## Onerilen Durum Gecisleri

```text
PENDING -> CONFIRMED
PENDING -> CANCELLED
CONFIRMED -> CANCELLED
CONFIRMED -> COMPLETED
```

Gecersiz gecisler:

- `CANCELLED -> CONFIRMED`
- `COMPLETED -> PENDING`
- `COMPLETED -> CANCELLED`

## Frontend Davranis Kurallari

- Frontend kullaniciya serbest saat girisi acmamalidir.
- Saat secimi sadece backend'ten gelen slot listesi ile yapilmalidir.
- Randevu olusturma sirasinda `409 Conflict` donerse kullaniciya secilen saatin artik uygun olmadigi bilgisi gosterilmelidir.
- Admin panelinde durum guncelleme isleminden sonra liste ve detay verileri tazelenmelidir.
