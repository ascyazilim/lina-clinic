INSERT INTO treatment_categories (name, slug, display_order, active)
VALUES
    ('Lazer Uygulamaları', 'lazer-uygulamalari', 1, TRUE),
    ('Estetik Uygulamaları', 'estetik-uygulamalari', 2, TRUE),
    ('Cilt Bakımı ve Cilt Problemleri', 'cilt-bakimi-ve-cilt-problemleri', 3, TRUE),
    ('Vücut Şekillendirme', 'vucut-sekillendirme', 4, TRUE),
    ('Saç Uygulamaları', 'sac-uygulamalari', 5, TRUE)
ON CONFLICT (slug) DO UPDATE
SET
    name = EXCLUDED.name,
    display_order = EXCLUDED.display_order,
    active = EXCLUDED.active,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO treatment_services (
    category_id,
    name,
    slug,
    short_description,
    detail_description,
    duration_minutes,
    active,
    requires_doctor
)
VALUES
    (
        (SELECT id FROM treatment_categories WHERE slug = 'lazer-uygulamalari'),
        'Lazer Epilasyon',
        'lazer-epilasyon',
        'İstenmeyen tüylerin azaltılmasına yönelik planlanan seanslı uygulamadır.',
        'Lazer epilasyon, cilt yapısı ve uygulama alanı değerlendirilerek planlanan seanslarla yürütülen bir işlemdir. Uygulama öncesinde alan, seans aralığı ve bakım önerileri hakkında bilgilendirme yapılır.',
        30,
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'lazer-uygulamalari'),
        'Dövme Sildirme',
        'dovme-sildirme',
        'Dövme pigmentinin kademeli olarak azaltılmasına yönelik uygulamadır.',
        'Dövme sildirme işlemi, pigment yoğunluğu, renk yapısı ve uygulama alanına göre planlanır. İşlem süresi ve seans sayısı kişisel duruma göre değişebileceğinden ön değerlendirme önemlidir.',
        45,
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'lazer-uygulamalari'),
        'Lazer Cilt Uygulamaları',
        'lazer-cilt-uygulamalari',
        'Cilt görünümünü desteklemeye yönelik lazer temelli uygulama grubudur.',
        'Lazer cilt uygulamaları, cilt tipine ve hedeflenen ihtiyaca göre planlanır. Uygulama alanı, seans sıklığı ve işlem sonrası bakım adımları değerlendirme sonrasında netleştirilir.',
        45,
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'estetik-uygulamalari'),
        'Dudak Dolgusu',
        'dudak-dolgusu',
        'Dudak hacmi ve konturuna yönelik enjeksiyon planlaması içeren işlemdir.',
        'Dudak dolgusu uygulamasında yüz oranı, mevcut doku yapısı ve beklenti birlikte değerlendirilir. İşlem yalnızca uygun klinik değerlendirme sonrası planlanır.',
        45,
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'estetik-uygulamalari'),
        'Dolgu Tedavileri',
        'dolgu-tedavileri',
        'Yüz bölgelerinde hacim ve destek ihtiyacına göre planlanan uygulamalardır.',
        'Dolgu tedavileri, uygulama yapılacak bölgeye ve doku ihtiyacına göre farklı içerik ve tekniklerle planlanır. Uygunluk değerlendirmesi işlem öncesinde yapılır.',
        45,
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'estetik-uygulamalari'),
        'Ameliyatsız Estetik Uygulamaları',
        'ameliyatsiz-estetik-uygulamalari',
        'Cerrahi işlem gerektirmeyen estetik uygulama grubudur.',
        'Ameliyatsız estetik uygulamaları, ihtiyaca göre farklı yöntemlerin değerlendirilmesini içerir. Uygulama kararı, işlem kapsamı ve takip adımları uzman değerlendirmesi ile belirlenir.',
        60,
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'cilt-bakimi-ve-cilt-problemleri'),
        'Leke Tedavileri',
        'leke-tedavileri',
        'Cilt tonu farklılıklarının değerlendirilmesine yönelik bakım ve uygulama planıdır.',
        'Leke tedavileri, cilt yapısı, lekenin tipi ve günlük bakım alışkanlıkları birlikte değerlendirilerek planlanır. Süreçte düzenli takip ve uygun bakım önerileri önem taşır.',
        45,
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'cilt-bakimi-ve-cilt-problemleri'),
        'Sivilce Tedavisi',
        'sivilce-tedavisi',
        'Akneye eğilimli ciltler için planlanan takip odaklı uygulamadır.',
        'Sivilce tedavisi sürecinde cilt tipi, lezyon yoğunluğu ve eşlik eden cilt hassasiyetleri dikkate alınır. Gerekli görülen durumlarda düzenli kontrol planı oluşturulur.',
        45,
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'cilt-bakimi-ve-cilt-problemleri'),
        'Medikal Cilt Bakımı',
        'medikal-cilt-bakimi',
        'Cilt temizliği ve bakım ihtiyacına yönelik profesyonel uygulamadır.',
        'Medikal cilt bakımı, cildin mevcut durumuna göre planlanan profesyonel bakım adımlarını içerir. Kullanılan yöntem ve ürün seçimi cilt değerlendirmesi sonrası belirlenir.',
        60,
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'vucut-sekillendirme'),
        'Bölgesel İncelme',
        'bolgesel-incelme',
        'Belirli bölgelerde destekleyici bakım ve cihaz uygulamalarını kapsar.',
        'Bölgesel incelme uygulamaları, hedef bölge ve mevcut vücut yapısı değerlendirilerek planlanır. İşlem aralığı ve takip yaklaşımı kişisel ihtiyaca göre değişebilir.',
        45,
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'vucut-sekillendirme'),
        'Vücut Şekillendirme',
        'vucut-sekillendirme',
        'Vücut konturunun desteklenmesine yönelik planlanan uygulama grubudur.',
        'Vücut şekillendirme sürecinde uygulama bölgesi, hedeflenen destek alanı ve seans planı birlikte değerlendirilir. Süreç, kişisel ihtiyaçlara göre yapılandırılır.',
        60,
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'vucut-sekillendirme'),
        'Selülit Bakımı',
        'selulit-bakimi',
        'Cilt yüzey görünümünü desteklemeye yönelik bakım yaklaşımını içerir.',
        'Selülit bakımı, cilt yapısı ve bölgesel ihtiyaç dikkate alınarak planlanır. Uygulama yöntemi ve takip süreci kişisel değerlendirmeye göre şekillenir.',
        45,
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'sac-uygulamalari'),
        'Saç Ekimi',
        'sac-ekimi',
        'Saç kaybı değerlendirmesi sonrası planlanan klinik işlemdir.',
        'Saç ekimi sürecinde donör alan, ekim planı ve işlem sonrası takip adımları değerlendirilir. İşlem, ayrıntılı ön muayene sonrasında planlanır.',
        240,
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'sac-uygulamalari'),
        'Saç Mezoterapisi',
        'sac-mezoterapisi',
        'Saç ve saçlı deri desteğine yönelik planlanan enjeksiyon temelli uygulamadır.',
        'Saç mezoterapisi, saçlı derinin mevcut durumu ve destek ihtiyacı değerlendirilerek planlanır. Uygulama sıklığı ve içerik seçimi ön görüşme sonrasında netleşir.',
        30,
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM treatment_categories WHERE slug = 'sac-uygulamalari'),
        'PRP Saç Uygulamaları',
        'prp-sac-uygulamalari',
        'Saçlı deriye yönelik planlanan PRP destek uygulamasıdır.',
        'PRP saç uygulamaları, kişisel değerlendirme sonrasında planlanan ve takip gerektiren klinik işlemler arasında yer alır. Seans planı ihtiyaca göre belirlenir.',
        45,
        TRUE,
        TRUE
    )
ON CONFLICT (slug) DO UPDATE
SET
    category_id = EXCLUDED.category_id,
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    detail_description = EXCLUDED.detail_description,
    duration_minutes = EXCLUDED.duration_minutes,
    active = EXCLUDED.active,
    requires_doctor = EXCLUDED.requires_doctor,
    updated_at = CURRENT_TIMESTAMP;
