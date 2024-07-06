// component
import Iconify from "../../components/Iconify";
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/admin-dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Manage User",
    path: "/admin-dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Manage Doctor",
    path: "/admin-dashboard/manage-doctor",
    icon: getIcon("openmoji:male-doctor"),
  },
  {
    title: "Manage Health Examination Plan",
    path: "/admin-dashboard/manage-schedule",
    icon: getIcon("icon-park:plan"),
  },
  {
    title: "Manage Hospital",
    path: "/admin-dashboard/manage-clinic",
    icon: getIcon("healthicons:ambulatory-clinic"),
  },
  {
    title: "Manage Specialty",
    path: "/admin-dashboard/manage-specialty",
    icon: getIcon("medical-icon:health-services"),
  },
  {
    title: "Manage Drug",
    path: "/admin-dashboard/manage-drug",
    icon: getIcon("mdi:drugs"),
  },
  {
    title: "Restore user",
    path: "/admin-dashboard/restore-user",
    icon: getIcon("eva:people-fill"),
  },
];

export default sidebarConfig;
