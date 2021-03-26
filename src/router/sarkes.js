export default [
  {
    path: "/sarkes",
    name: "ViewSarkes",
    component: () => import("../views/ViewSarkes.vue"),
  },
  {
    path: "/sarkes/pedagang-besar-farmasi/edit",
    name: "EditPbf",
    props: true,
    component: () => import("../views/pages/sarkes/editPage/Pbf.vue"),
  },
  {
    path: "/sarkes/penyalur-alat-kesehatan/edit",
    name: "EditPak",
    props: true,
    component: () => import("../views/pages/sarkes/editPage/PenyalurAlkes.vue"),
  },
  {
    path: "/sarkes/ukot/edit",
    name: "EditUkot",
    props: true,
    component: () => import("../views/pages/sarkes/editPage/Ukot.vue"),
  },
  {
    path: "/sarkes/apotek",
    name: "ViewApotek",
    component: () => import("../views/pages/sarkes/Apotek.vue"),
  },
  {
    path: "/sarkes/rekap/apotek",
    name: "RekapApotek",
    component: () => import("../views/pages/sarkes/rekap/RekapApotek.vue"),
  },
  {
    path: "/sarkes/rekap/toko-obat",
    name: "RekapTokoObat",
    component: () => import("../views/pages/sarkes/rekap/RekapTokoObat.vue"),
  },
  {
    path: "/sarkes/rekap/pirt",
    name: "RekapPirt",
    component: () => import("../views/pages/sarkes/rekap/RekapPirt.vue"),
  },
  {
    path: "/sarkes/rekap/toko-alkes",
    name: "RekapTokoAlkes",
    component: () => import("../views/pages/sarkes/rekap/RekapTokoAlkes.vue"),
  },
  {
    path: "/sarkes/toko-obat",
    name: "ViewTokoObat",
    component: () => import("../views/pages/sarkes/TokoObat.vue"),
  },
  {
    path: "/sarkes/penyalur-alat-kesehatan",
    name: "PenyalurAlkes",
    component: () => import("../views/pages/sarkes/PenyalurAlkes.vue"),
  },
  {
    path: "/sarkes/penyalur-alat-kesehatan/import",
    name: "PenyalurAlkesImport",
    component: () =>
      import("../views/pages/sarkes/dataPusat/import/PenyalurAlkes.vue"),
  },
  {
    path: "/sarkes/penyalur-alat-kesehatan/pusat/edit",
    props: true,
    name: "EditPakPusat",
    component: () =>
      import("../views/pages/sarkes/editPage/PakPusat.vue"),
  },
  {
    path: "/sarkes/pbf/pusat/edit",
    props: true,
    name: "EditPbfPusat",
    component: () =>
      import("../views/pages/sarkes/editPage/PbfPusat.vue"),
  },
  {
    path: "/sarkes/data-pusat/import",
    name: "ImportTemplateAll",
    component: () =>
      import("../views/pages/sarkes/dataPusat/import/ImportTemplateAll.vue"),
  },
  {
    path: "/sarkes/data-pusat/pkrt/import",
    name: "ImportTemplatePusatPkrt",
    component: () =>
      import("../views/pages/sarkes/dataPusat/import/SertifikatProdPkrt.vue"),
  },
  {
    path: "/sarkes/data-pusat/alkes/import",
    name: "ImportTemplatePusatAlkes",
    component: () =>
      import(
        "../views/pages/sarkes/dataPusat/import/SertifikatProdAlkes.vue"
      ),
  },
  {
    path: "/sarkes/data-pusat/pak/import",
    name: "ImportTemplatePakPusat",
    component: () =>
      import(
        "../views/pages/sarkes/dataPusat/import/PakPusat.vue"
      ),
  },
  {
    path: "/sarkes/data-pusat/pbf/import",
    name: "ImportTemplatePbfPusat",
    component: () =>
      import(
        "../views/pages/sarkes/dataPusat/import/PbfPusat.vue"
      ),
  },
  {
    props: true,
    path: "/sarkes/pedagang-besar-farmasi",
    name: "PBFarmasi",
    component: () => import("../views/pages/sarkes/PBFarmasi.vue"),
  },
  {
    path: "/sarkes/industri-ekstrak-bahan-alam",
    name: "IndustriBahanAlam",
    component: () => import("../views/pages/sarkes/IndustriBahanAlam.vue"),
  },
  {
    path: "/sarkes/industri-obat-tradisional",
    name: "Iot",
    component: () => import("../views/pages/sarkes/Iot.vue"),
  },
  {
    path: "/sarkes/rekap-obat-tradisional",
    name: "RekapObatTradisional",
    component: () => import("../views/pages/sarkes/RekapObatTradisional.vue"),
  },
  {
    path: "/sarkes/kelas-rmh-tangga",
    name: "RekapObatTradisional",
    component: () => import("../views/pages/sarkes/KlsRmhTangga.vue"),
  },
  {
    path: "/sarkes/industri-kosmetik",
    name: "IndustriKosmetik",
    component: () => import("../views/pages/sarkes/IndustriKosmetik.vue"),
  },
  {
    path: "/sarkes/rekap-industri-kosmetik",
    name: "RekapIndustriKosmetik",
    component: () => import("../views/pages/sarkes/RekapIndustriKosmetik.vue"),
  },
  {
    path: "/sarkes/industri-farmasi",
    name: "IndustriFarmasi",
    component: () => import("../views/pages/sarkes/IndustriFarmasi.vue"),
  },
  {
    path: "/sarkes/sertifikat-produksi-alkes",
    name: "SertifikatProdAlkes",
    component: () => import("../views/pages/sarkes/SertifikatProdAlkes.vue"),
  },
  {
    props: true,
    path: "/sarkes/sertifikat-produksi-alkes/edit",
    name: "EditSertifikatProdAlkes",
    component: () =>
      import("../views/pages/sarkes/editPage/SertifikatProdAlkes.vue"),
  },
  {
    path: "/sarkes/sertifikat-produksi-pkrt",
    name: "SertifikatProdPkrt",
    component: () => import("../views/pages/sarkes/SertifikatProdPkrt.vue"),
  },
  {
    props: true,
    path: "/sarkes/sertifikat-produksi-pkrt/edit",
    name: "EditSertifikatProdPkrt",
    component: () =>
      import("../views/pages/sarkes/editPage/SertifikatProdPkrt.vue"),
  },
  {
    path: "/sarkes/ukot",
    name: "Ukot",
    component: () => import("../views/pages/sarkes/Ukot.vue"),
  },
  {
    path: "/sarkes/toko-alkes",
    name: "ViewTokoAlkes",
    component: () => import("../views/pages/sarkes/TokoAlkes.vue"),
  },
  {
    path: "/sarkes/pirt",
    name: "ViewPirt",
    component: () => import("../views/pages/sarkes/Pirt.vue"),
  },
];