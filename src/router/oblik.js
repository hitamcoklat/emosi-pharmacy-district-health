export default [
  {
    path: "/oblik",
    name: "ViewOblik",
    component: () => import("../views/ViewOblik.vue"),
  },
  {
    path: "/oblik/obat",
    name: "ObatVaksin",
    component: () => import("../views/pages/oblik/ObatVaksin.vue"),
  },
  {
    path: "/oblik/provinsi/obat",
    name: "ObatVaksinProvinsi",
    component: () => import("../views/pages/provinsi/rekap-oblik.vue"),
  },
  {
    path: "/oblik/provinsi/ifk150",
    name: "Ifk150Provinsi",
    component: () => import("../views/pages/provinsi/rekap-150-obat.vue"),
  },
  {
    path: "/oblik/petunjuk",
    name: "PetunjukTeknisObat",
    component: () => import("../views/pages/oblik/PetunjukTeknis.vue"),
  },
  {
    path: "/oblik/laporan-hasil-perjadin",
    name: "LaporanHasilPerjadin",
    component: () => import("../views/pages/oblik/LaporanHasilPerjadin.vue"),
  },
  {
    path: "/oblik/form-monev-150-obat-vaksin",
    name: "FormMonevObatVaksin",
    component: () => import("../views/pages/oblik/FormMonevObatVaksin.vue"),
  },
  {
    path: "/oblik/form-monev-150-obat-vaksin-excell",
    name: "FormMonevObatVaksinExcell",
    component: () =>
      import("../views/pages/oblik/FormMonevObatVaksinExcell.vue"),
  },
  {
    path: "/oblik/persentasi-farmasi-vaksin-sesuai-standar",
    name: "FormPersentasiVaksinStandar.vue",
    component: () =>
      import("../views/pages/oblik/FormPersentasiVaksinStandar.vue"),
  },
  {
    path: "/oblik/persentasi-farmasi-vaksin-sesuai-standar/list",
    name: "ListFormPersentasiVaksinStandar.vue",
    component: () =>
      import("../views/pages/oblik/ListPersentasiVaksinStandar.vue"),
  },
  {
    path: "/oblik/persentasi-farmasi-vaksin-sesuai-standar/rekap",
    name: "RekapPresentaseVaksin.vue",
    component: () =>
      import("../views/pages/provinsi/rekap-presentase-vaksin.vue"),
  },
  {
    path: "/oblik/form-instrumen-monitoring",
    name: "FormInstrumenMonitoring",
    component: () => import("../views/pages/oblik/FormInstrumenMonitoring.vue"),
  },
];