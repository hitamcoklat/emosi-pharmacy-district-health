import Pendaftaran from "../views/Pendaftaran.vue";
import Logout from "../components/Logout.vue";
export default [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/LoginNew.vue"),
  },
  {
    path: "/pendaftaran",
    name: "Pendaftaran",
    component: Pendaftaran,
  },
  {
    path: "/tenaga-apoteker-ttk",
    name: "TenagaApotekerTKK",
    // component: () => import("../views/ViewTenaga.vue"),
    component: () => import("../views/pages/tenaga/RekapTenagaApoteker.vue"),
  },
  {
    path: "/tenaga/apoteker",
    name: "TenagaApotekerTKK",
    component: () => import("../views/pages/tenaga/InputApoteker.vue"),
  },
  {
    path: "/tenaga/tkk",
    name: "TenagaTKK",
    component: () => import("../views/pages/tenaga/InputTenaga.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardV3.vue"),
  },
  {
    path: "/dashboard-v2",
    name: "DashboardV2",
    component: () => import("../views/DashboardV2.vue"),
  },
  {
    path: "/dashboard/detail",
    name: "DetailDashboard",
    component: () => import("../views/pages/dashboard/Detail.vue"),
  },
  {
    path: "/monev",
    name: "Monev",
    component: () => import("../views/ViewMonev.vue"),
  },
  {
    path: "/keg-pertemuan",
    name: "KegPertemuan",
    component: () => import("../views/ViewKegPertemuan.vue"),
  },
  {
    path: "/keg-pertemuan/farmalkes",
    name: "KegPertemuan",
    component: () => import("../views/pages/kegpertemuan/KegPertemuan.vue"),
  },
  {
    path: "/keg-pertemuan/farmalkes/edit",
    name: "EditKegPertemuan",
    props: true,
    component: () => import("../views/pages/kegpertemuan/EditKegPertemuan.vue"),
  },
  {
    path: "/monev/instrumen-pbf",
    name: "Monev",
    component: () => import("../views/pages/monev/InputMonevPbf.vue"),
  },
  {
    path: "/monev/inspeksi-pak",
    name: "MonevInspeksiPak",
    component: () => import("../views/pages/monev/InspeksiPak.vue"),
  },
  {
    path: "/monev/pak-pkrt",
    name: "MonevInspeksiPakPkrt",
    component: () => import("../views/pages/monev/InspeksiPakPkrt.vue"),
  },
  {
    path: "/monev/pkrt",
    name: "MonevInspeksiPkrt",
    component: () => import("../views/pages/monev/InspeksiPkrt.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/tenaga/apoteker/rekap",
    name: "RekapTenagaApoteker",
    component: () => import("../views/pages/tenaga/RekapTenagaApoteker.vue"),
  },
  {
    path: "/tenaga/tkk/rekap",
    name: "RekapTenagaTkk",
    component: () => import("../views/pages/tenaga/RekapTenagaTkk.vue"),
  },
  {
    path: "/sampling/data-sampling",
    name: "DataSampling",
    component: () => import("../views/pages/sampling/DataSampling.vue"),
  },
  {
    props: true,
    path: "/sampling/data-sampling/edit",
    name: "EditDataSampling",
    component: () => import("../views/pages/sampling/EditDataSampling.vue"),
  },
];