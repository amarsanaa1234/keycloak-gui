import { perRoleType } from "../tools/utils";
import React from "react";
import MainTeacher from "./teacherComponents/MainTeacher";
import MainStudent from "./studentComponents/mainStudent/MainStudent";
import Homepage from "../pages/Homepage";
import {PieChartOutlined} from "@ant-design/icons";

const RoleSpecificComponents = {
  Home:{
    id:"1",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Зааварчилгаа",
    componentName: "client_student",
    component: <Homepage/>,
    icon:<PieChartOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    }
  },
  BankCardOrder: {
    id:"2",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "БАНКНЫ КАРТ ЗАХИАЛГА",
    componentName: "client_student",
    component: <>БАНКНЫ КАРТ ЗАХИАЛГА</>,
    icon:<PieChartOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    }
  },
  ElectronicLEarning: {
    id:"3",
    perRoleType: perRoleType.Organization,
    path: "/teacherMenu",
    name: "ЦАХИМ СУРГАЛТ",
    componentName: "client_teacher",
    component: <>ЦАХИМ СУРГАЛТ</>,
    icon:<PieChartOutlined />,
    permissions: {
      ShowConfig: {code: "ReportConnectConfig_ShowConfig", name: "Тайлант үе, тайлан шивэлтийн тохиргоо харах"},
      ConnectConfig: {code: "ReportConnectConfig_ConnectConfig", name: "Тайлант үе, тайлан шивэлтийн тохиргоо холбох"},
      ShowReportPeriod: {code: "ReportConnectConfig_ShowReportPeriod", name: "Тайлант үеийн тохиргоо харах, холбох"},
      ReportPeriodConnect: {code: "ReportConnectConfig_ReportPeriodConnect", name: "Тайлант үе холбох"},
      ReportConnect: {code: "ReportConnectConfig_ReportConnect", name: "Тайлантай холбогдох"},
      ReturnReportRequest: {code: "ReportConnectConfig_ReturnReportRequest", name: "Тайлан илгээлтийг буцаах"},
      StartReportWriting: {code: "ReportConnectConfig_StartReportWriting", name: "Тайлан шивэлт эхлүүлэх"},
      ReportRequest: {code: "ReportConnectConfig_ReportRequest", name: "Тайлан илгээх"},
      CancelPeriodConnect: {code: "ReportConnectConfig_CancelPeriodConnect", name: "Тайлант үеийн холболт цуцлах"},

      ReportConnectAlert: {code: "ReportConnect_Alert", name: "Тайлантай холбогдох үндсэн тайлбар"},
      ReportWriteAlert: {code: "ReportWriteAlert", name: "Тайлан шивэлтийн үндсэн тайлбар"},
      ReportWriteNoActionAlert: {
        code: "ReportWriteNoAction_Alert",
        name: "Тайлант үед үйлдэл хийх боломжгүй үеийн тайлбар"
      },
    },
  },
  UserOrgReport: {
    id:"4",
    path: "/admin_menu",
    perRoleType: perRoleType.Organization,
    name: "Тайлангийн тохиргоо",
    componentName: "client_admin",
    component: <MainTeacher />,
    permissions: {
      ReportConfigRequest: {code: "UserOrgReport_SendRequest", name: "Тайлангийн тохиргооны хүсэлт гаргах"},

      UserOrgReportAlert: {code: "UserOrgReport_Alert", name: "Тайлангийн тохиргооны үндсэн тайлбар"},
      UserOrgReportConfirmAlert: {code: "UserOrgReportConfirm_Alert", name: "Тайлангийн тохиргоо гаргах тайлбар"},
    }
  },

};

export {
  RoleSpecificComponents
};
