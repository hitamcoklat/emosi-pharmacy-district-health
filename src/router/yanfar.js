export default [
  {
    path: "/yanfar",
    name: "ViewYanfar",
    component: () => import("../views/ViewYanfar.vue"),
  },
  {
    path: "/yanfar/por",
    name: "HomeLandingPage",
    component: () => import("../views/pages/yanfar/POR.vue"),
  },
  {
    path: "/yanfar/pelayanan-kefarmasian",
    name: "PelayananKefarmasian",
    component: () => import("../views/pages/yanfar/PelayananFarmasi.vue"),
  },
  {
    path: "/yanfar/rekap-pio-jabar",
    name: "RekapPioJabar",
    component: () => import("../views/pages/yanfar/RekapPioJabar.vue"),
  },
  {
    path: "/yanfar/monev-fornas",
    name: "MonevFornas",
    component: () => import("../views/pages/yanfar/MonevFornas.vue"),
  },
  {
    path: "/yanfar/tenaga-kefarmasian",
    name: "MonevFornas",
    component: () => import("../views/pages/yanfar/TenagaKefarmasian.vue"),
  },
  {
    path: "/yanfar/gema-cermat",
    name: "MonevFornas",
    component: () => import("../views/pages/yanfar/GemaCermat.vue"),
  },
  {
    path: "/yanfar/apotek-aoc",
    name: "ApotekerAOC",
    component: () => import("../views/pages/yanfar/ApotekerAoc.vue"),
  },
  {
    path: "/yanfar/apotek-aoc/edit",
    name: "ApotekerAOCEdit",
    props: true,
    component: () => import("../views/pages/yanfar/edit/ApotekerAoc.vue"),
  },
];