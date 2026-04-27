import { categoryImageMap, serviceImageMap } from "../../assets/images/services";
import type {
  ServiceCategory,
  ServiceCategoryGroup,
  ServiceDetail,
} from "../../types/service";

const serviceCategories: ServiceCategory[] = [
  {
    id: 1,
    name: "Lazer Uygulamalari",
    slug: "lazer-uygulamalari",
    description:
      "Lazer temelli uygulamalar; alan, seans araligi ve cilt ihtiyaci birlikte degerlendirilerek planlanir.",
    image: {
      src: categoryImageMap["lazer-uygulamalari"],
      alt: "Lazer uygulamalari icin anonim gorsel alan",
    },
  },
  {
    id: 2,
    name: "Estetik Uygulamalari",
    slug: "estetik-uygulamalari",
    description:
      "Yuz orani, uygulama alani ve beklentinin birlikte ele alindigi planli estetik basliklari.",
    image: {
      src: categoryImageMap["estetik-uygulamalari"],
      alt: "Estetik uygulamalari icin anonim gorsel alan",
    },
  },
  {
    id: 3,
    name: "Cilt Bakimi ve Cilt Problemleri",
    slug: "cilt-bakimi-ve-cilt-problemleri",
    description:
      "Cilt yapisi, hassasiyet ve takip ihtiyacina gore sekillenen bakim ve degerlendirme surecleri.",
    image: {
      src: categoryImageMap["cilt-bakimi-ve-cilt-problemleri"],
      alt: "Cilt bakimi uygulamalari icin anonim gorsel alan",
    },
  },
  {
    id: 4,
    name: "Vucut Sekillendirme",
    slug: "vucut-sekillendirme",
    description:
      "Bolgesel destek ve vucut konturu odakli, seans duzeniyle ilerleyen uygulama grubu.",
    image: {
      src: categoryImageMap["vucut-sekillendirme"],
      alt: "Vucut sekillendirme uygulamalari icin anonim gorsel alan",
    },
  },
  {
    id: 5,
    name: "Sac Uygulamalari",
    slug: "sac-uygulamalari",
    description:
      "Sacli deri ve sac yogunlugu odakli, on gorusme ile planlanan uygulama alanlari.",
    image: {
      src: categoryImageMap["sac-uygulamalari"],
      alt: "Sac uygulamalari icin anonim gorsel alan",
    },
  },
];

const categoryMap = Object.fromEntries(
  serviceCategories.map((category) => [category.slug, category]),
) as Record<string, ServiceCategory>;

const services: ServiceDetail[] = [
  {
    id: 1,
    name: "Lazer Epilasyon",
    slug: "lazer-epilasyon",
    category: categoryMap["lazer-uygulamalari"],
    shortDescription:
      "Kil yogunlugunu azaltmaya yonelik, seans planlamasiyla ilerleyen lazer uygulamasidir.",
    detailDescription:
      "Lazer epilasyon, uygulama bolgesi ve cilt yapisina gore planlanan seansli bir surectir. Seans araliklari, alan buyuklugu ve bakim notlari on gorusmede netlestirilir.",
    overviewPoints: [
      "Seans duzeni uygulama alanina gore planlanir.",
      "Randevu oncesi alan ve sure bilgisi birlikte degerlendirilir.",
      "Bakim notlari surecin bir parcasi olarak aktarilir.",
    ],
    durationMinutes: 30,
    requiresDoctor: false,
    image: {
      src: serviceImageMap["lazer-epilasyon"],
      alt: "Lazer epilasyon icin anonim gorsel alan",
    },
  },
  {
    id: 2,
    name: "Dovme Sildirme",
    slug: "dovme-sildirme",
    category: categoryMap["lazer-uygulamalari"],
    shortDescription:
      "Dovme pigmentinin zaman icinde hafifletilmesine yonelik lazer temelli uygulamadir.",
    detailDescription:
      "Dovme sildirme sureci, pigment yogunlugu, renk yapisi ve uygulama alaninin ozelliklerine gore planlanir. Seans sayisi ve araliklari kisinin mevcut durumuna gore belirlenir.",
    overviewPoints: [
      "Renk ve pigment yogunlugu sureci etkiler.",
      "Uygulama araliklari seans planlamasiyla sekillenir.",
      "Alan bazli degerlendirme on gorusmede yapilir.",
    ],
    durationMinutes: 45,
    requiresDoctor: false,
    image: {
      src: serviceImageMap["dovme-sildirme"],
      alt: "Dovme sildirme icin anonim gorsel alan",
    },
  },
  {
    id: 3,
    name: "Lazer Cilt Uygulamalari",
    slug: "lazer-cilt-uygulamalari",
    category: categoryMap["lazer-uygulamalari"],
    shortDescription:
      "Cilt gorunumu ve doku ihtiyacina gore planlanan lazer destekli bakim grubudur.",
    detailDescription:
      "Lazer cilt uygulamalari, cilt tipi ve hedeflenen destek alanina gore farklilasabilir. Islem kapsami ve takip adimlari degerlendirme sonrasinda belirlenir.",
    overviewPoints: [
      "Cilt tipi ve ihtiyac on planda tutulur.",
      "Planlama, alan ve sure bilgisini birlikte icerir.",
      "Takip adimlari uygulama basligina gore degisir.",
    ],
    durationMinutes: 45,
    requiresDoctor: false,
    image: {
      src: serviceImageMap["lazer-cilt-uygulamalari"],
      alt: "Lazer cilt uygulamalari icin anonim gorsel alan",
    },
  },
  {
    id: 4,
    name: "Dudak Dolgusu",
    slug: "dudak-dolgusu",
    category: categoryMap["estetik-uygulamalari"],
    shortDescription:
      "Dudak hacmi ve kontur dengesinin degerlendirilmesiyle planlanan enjeksiyon uygulamasidir.",
    detailDescription:
      "Dudak dolgusu surecinde mevcut doku yapisi, yuz orani ve beklenti birlikte ele alinir. Islem kapsaminda uygulama alani ve takip notlari onceden konusulur.",
    overviewPoints: [
      "Dudak konturu ve yuz dengesi birlikte ele alinir.",
      "Uygulama oncesi planlama beklentiyle birlikte yapilir.",
      "Takip notlari surecin bir parcasi olarak aktarilir.",
    ],
    durationMinutes: 45,
    requiresDoctor: true,
    image: {
      src: serviceImageMap["dudak-dolgusu"],
      alt: "Dudak dolgusu icin anonim gorsel alan",
    },
  },
  {
    id: 5,
    name: "Dolgu Tedavileri",
    slug: "dolgu-tedavileri",
    category: categoryMap["estetik-uygulamalari"],
    shortDescription:
      "Yuzun belirli alanlarindaki hacim ve destek ihtiyacina gore sekillenen uygulamalardir.",
    detailDescription:
      "Dolgu tedavileri, uygulama yapilacak bolgeye gore farkli tekniklerle planlanir. Alan secimi, uygulama sureci ve kontrol adimlari hekim degerlendirmesiyle netlesir.",
    overviewPoints: [
      "Bolgesel ihtiyac ve doku destegi birlikte degerlendirilir.",
      "Uygulama kapsami planli bir on gorusme ile netlesir.",
      "Kontrol sureci uygulama alanina gore sekillenir.",
    ],
    durationMinutes: 45,
    requiresDoctor: true,
    image: {
      src: serviceImageMap["dolgu-tedavileri"],
      alt: "Dolgu tedavileri icin anonim gorsel alan",
    },
  },
  {
    id: 6,
    name: "Ameliyatsiz Estetik Uygulamalari",
    slug: "ameliyatsiz-estetik-uygulamalari",
    category: categoryMap["estetik-uygulamalari"],
    shortDescription:
      "Cerrahi islem olmadan planlanan estetik yaklasimlari bir araya getiren uygulama grubudur.",
    detailDescription:
      "Bu baslik, farkli ihtiyaclara gore sekillenen ameliyatsiz estetik uygulamalari kapsar. Yontem secimi ve surec plani, on degerlendirme sonrasinda belirlenir.",
    overviewPoints: [
      "Ihtiyaca gore birden fazla uygulama secenegi degerlendirilir.",
      "Uygun planlama oncesinde on gorusme yapilir.",
      "Surec ve takip adimlari secilen yonteme gore degisir.",
    ],
    durationMinutes: 60,
    requiresDoctor: true,
    image: {
      src: serviceImageMap["ameliyatsiz-estetik-uygulamalari"],
      alt: "Ameliyatsiz estetik uygulamalari icin anonim gorsel alan",
    },
  },
  {
    id: 7,
    name: "Leke Tedavileri",
    slug: "leke-tedavileri",
    category: categoryMap["cilt-bakimi-ve-cilt-problemleri"],
    shortDescription:
      "Cilt tonu farkliliklarini degerlendirmeye odaklanan planli bakim ve uygulama surecidir.",
    detailDescription:
      "Leke tedavileri, cilt yapisi ve leke tipine gore farkli yaklasimlarla planlanir. Bakim duzeni ve takip sirasinda gunes koruma gibi notlar da surece dahildir.",
    overviewPoints: [
      "Cilt tonu ve leke tipi birlikte ele alinir.",
      "Bakim duzeni surecin onemli bir parcasi olarak planlanir.",
      "Takip notlari gundelik rutini de kapsayabilir.",
    ],
    durationMinutes: 45,
    requiresDoctor: false,
    image: {
      src: serviceImageMap["leke-tedavileri"],
      alt: "Leke tedavileri icin anonim gorsel alan",
    },
  },
  {
    id: 8,
    name: "Sivilce Tedavisi",
    slug: "sivilce-tedavisi",
    category: categoryMap["cilt-bakimi-ve-cilt-problemleri"],
    shortDescription:
      "Akneye egilimli ciltler icin takip ve cilt dengesi odakli uygulama planidir.",
    detailDescription:
      "Sivilce tedavisi sureci, cildin hassasiyet duzeyi ve lezyon yogunluguna gore degerlendirilir. Uygulama planina kontrol gorusmeleri de dahil edilebilir.",
    overviewPoints: [
      "Cildin hassasiyet duzeyi dikkate alinir.",
      "Takip planlamasi surecin merkezi parcalarindandir.",
      "Bakim notlari cilt dengesini desteklemek icin paylasilir.",
    ],
    durationMinutes: 45,
    requiresDoctor: false,
    image: {
      src: serviceImageMap["sivilce-tedavisi"],
      alt: "Sivilce tedavisi icin anonim gorsel alan",
    },
  },
  {
    id: 9,
    name: "Medikal Cilt Bakimi",
    slug: "medikal-cilt-bakimi",
    category: categoryMap["cilt-bakimi-ve-cilt-problemleri"],
    shortDescription:
      "Cildin mevcut durumuna gore temizlik, arindirma ve bakim adimlarini birlestiren profesyonel uygulamadir.",
    detailDescription:
      "Medikal cilt bakimi, cildin ihtiyacina gore planlanan asamali bir bakim surecidir. Uygulama icerigi, cilt tipi ve hedeflenen bakim duzenine gore belirlenir.",
    overviewPoints: [
      "Asamali bakim adimlari cilt ihtiyacina gore secilir.",
      "Temizlik ve arindirma sureci profesyonel planla ilerler.",
      "Bakim icerigi cilt tipiyle uyumlu sekilde duzenlenir.",
    ],
    durationMinutes: 60,
    requiresDoctor: false,
    image: {
      src: serviceImageMap["medikal-cilt-bakimi"],
      alt: "Medikal cilt bakimi icin anonim gorsel alan",
    },
  },
  {
    id: 10,
    name: "Bolgesel Incelme",
    slug: "bolgesel-incelme",
    category: categoryMap["vucut-sekillendirme"],
    shortDescription:
      "Belirli bolgelerde destekleyici seans planlamasi ile ilerleyen cihaz odakli uygulamadir.",
    detailDescription:
      "Bolgesel incelme surecinde hedef bolge, seans araligi ve destek ihtiyaci birlikte degerlendirilir. Uygulama plani kisinin genel rutiniyle uyumlu olacak sekilde olusturulur.",
    overviewPoints: [
      "Hedef bolge belirlenerek planlama yapilir.",
      "Seans araligi surecin ritmini belirler.",
      "Destek notlari uygulama planina eslik eder.",
    ],
    durationMinutes: 45,
    requiresDoctor: false,
    image: {
      src: serviceImageMap["bolgesel-incelme"],
      alt: "Bolgesel incelme icin anonim gorsel alan",
    },
  },
  {
    id: 11,
    name: "Vucut Sekillendirme",
    slug: "vucut-sekillendirme",
    category: categoryMap["vucut-sekillendirme"],
    shortDescription:
      "Vucut konturuna yonelik destek alanlarini planlayan, seansli uygulama grubudur.",
    detailDescription:
      "Vucut sekillendirme yaklasiminda uygulama bolgesi ve destek hedefi birlikte ele alinir. Seans duzeni ve uygulama sureci kisinin ihtiyacina gore planlanir.",
    overviewPoints: [
      "Kontur odagi uygulama bolgesine gore degisir.",
      "Seans plani kisinin hedefiyle birlikte sekillenir.",
      "Surec, duzenli takip notlariyla desteklenebilir.",
    ],
    durationMinutes: 60,
    requiresDoctor: false,
    image: {
      src: serviceImageMap["vucut-sekillendirme"],
      alt: "Vucut sekillendirme icin anonim gorsel alan",
    },
  },
  {
    id: 12,
    name: "Selulit Bakimi",
    slug: "selulit-bakimi",
    category: categoryMap["vucut-sekillendirme"],
    shortDescription:
      "Cilt yuzeyi ve bolgesel gorunum uzerine odaklanan duzenli bakim yaklasimidir.",
    detailDescription:
      "Selulit bakimi, cilt yapisi ve destek ihtiyacina gore farkli adimlarla planlanir. Uygulama araligi ve takip duzeni, bolgesel degerlendirme sonrasinda netlesir.",
    overviewPoints: [
      "Cilt yapisi ve bolgesel gorunum birlikte incelenir.",
      "Bakim araligi uygulama ritmini belirler.",
      "Takip planlamasi surecin duzenli ilerlemesini destekler.",
    ],
    durationMinutes: 45,
    requiresDoctor: false,
    image: {
      src: serviceImageMap["selulit-bakimi"],
      alt: "Selulit bakimi icin anonim gorsel alan",
    },
  },
  {
    id: 13,
    name: "Sac Ekimi",
    slug: "sac-ekimi",
    category: categoryMap["sac-uygulamalari"],
    shortDescription:
      "Sac yogunlugunun degerlendirilmesi ve donor alan planlamasi ile ele alinan klinik islemdir.",
    detailDescription:
      "Sac ekimi surecinde donor alan, ekim planlamasi ve takip asamalari ayrintili bicimde degerlendirilir. Islem karari on muayene sonrasi netlestirilir.",
    overviewPoints: [
      "Donor alan ve yogunluk analizi on plandadir.",
      "Planlama sureci ayrintili on degerlendirme ile ilerler.",
      "Takip adimlari operasyon sonrasi sureci kapsar.",
    ],
    durationMinutes: 240,
    requiresDoctor: true,
    image: {
      src: serviceImageMap["sac-ekimi"],
      alt: "Sac ekimi icin anonim gorsel alan",
    },
  },
  {
    id: 14,
    name: "Sac Mezoterapisi",
    slug: "sac-mezoterapisi",
    category: categoryMap["sac-uygulamalari"],
    shortDescription:
      "Sacli derinin destek ihtiyacina gore planlanan enjeksiyon temelli uygulamadir.",
    detailDescription:
      "Sac mezoterapisi, sacli derinin mevcut durumu ve hedeflenen destek duzenine gore planlanir. Seans ritmi ve takip araligi on gorusmeyle sekillenir.",
    overviewPoints: [
      "Sacli derinin mevcut durumu dikkate alinir.",
      "Seans araligi destek planina gore belirlenir.",
      "Surec boyunca takip duzeni korunur.",
    ],
    durationMinutes: 30,
    requiresDoctor: true,
    image: {
      src: serviceImageMap["sac-mezoterapisi"],
      alt: "Sac mezoterapisi icin anonim gorsel alan",
    },
  },
  {
    id: 15,
    name: "PRP Sac Uygulamalari",
    slug: "prp-sac-uygulamalari",
    category: categoryMap["sac-uygulamalari"],
    shortDescription:
      "Sacli deriye yonelik, takip planlamasi gerektiren PRP destek uygulamasidir.",
    detailDescription:
      "PRP sac uygulamalari, sacli derinin destek ihtiyacina ve seans planina gore duzenlenir. Uygulama araligi ile kontrol sureci birlikte planlanir.",
    overviewPoints: [
      "Destek ihtiyaci ve seans duzeni birlikte ele alinir.",
      "Takip gorusmeleri surece planli sekilde eslik eder.",
      "Sacli deri odakli destek yaklasimi benimsenir.",
    ],
    durationMinutes: 45,
    requiresDoctor: true,
    image: {
      src: serviceImageMap["prp-sac-uygulamalari"],
      alt: "PRP sac uygulamalari icin anonim gorsel alan",
    },
  },
];

export const serviceCategoryGroups: ServiceCategoryGroup[] = serviceCategories.map(
  (category) => {
    const categoryServices = services.filter(
      (service) => service.category.slug === category.slug,
    );

    return {
      ...category,
      services: categoryServices,
      serviceCount: categoryServices.length,
    };
  },
);

export const featuredCategories = serviceCategoryGroups;

export const serviceCatalog = services;

export function getServiceBySlug(slug?: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slug?: string) {
  const currentService = getServiceBySlug(slug);

  if (!currentService) {
    return [];
  }

  return services.filter(
    (service) =>
      service.slug !== currentService.slug &&
      service.category.slug === currentService.category.slug,
  );
}
