import { perRoleType } from "../tools/utils";
import React from "react";
import Homepage from "../pages/Homepage";
import {MenuOutlined, InboxOutlined, ExclamationOutlined, CalendarOutlined, CheckCircleOutlined, FieldTimeOutlined, ProfileOutlined, DatabaseOutlined, ArrowRightOutlined, } from "@ant-design/icons";

const RoleSpecificComponents = {
  Home:{
    id:"/",
    perRoleType: perRoleType.Organization,
    name: "Нүүр",
    componentName: "Home",
    component: <Homepage/>,
    icon:<InboxOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter: []
  },
  // Оюутан
  client_student: {
    id:"2",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Оюутан",
    componentName: "client_student",
    component: <>Оюутан</>,
    icon:<MenuOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter: ["Personal_information", "Study_plan", "Recommended_training_plan", "Payment_information", "Tests_and_progress_scores",
      "Amount_information", "Course_choice_request", "Graduate_Student_Circular", "Update_your_personal_information", "Examination_schedule","Scholarship"],
  },
  Personal_information: {
    id:"3",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Хувийн мэдээлэл",
    componentName: "client_student",
    component: <>Хувийн мэдээлэл</>,
    icon:<ExclamationOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Study_plan: {
    id:"4",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Сургалтын төлөвлөгөө",
    componentName: "client_student",
    component: <>Сургалтын төлөвлөгөө</>,
    icon:<CalendarOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Recommended_training_plan: {
    id:"5",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Санал болгох сургалтын төлөвлөгөө",
    componentName: "client_student",
    component: <>Санал болгох сургалтын төлөвлөгөө</>,
    icon:<CalendarOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Payment_information: {
    id:"6",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Төлбөрийн мэдээлэл",
    componentName: "client_student",
    component: <>Төлбөрийн мэдээлэл</>,
    icon:<CheckCircleOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Tests_and_progress_scores: {
    id:"7",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Сорил, явцын оноо",
    componentName: "client_student",
    component: <>Сорил, явцын оноо</>,
    icon:<FieldTimeOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Amount_information: {
    id:"8",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Дүнгийн мэдээлэл",
    componentName: "client_student",
    component: <>Дүнгийн мэдээлэл</>,
    icon:<ProfileOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Course_choice_request: {
    id:"9",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Хичээл сонголтын хүсэлт",
    componentName: "client_student",
    component: <>Хичээл сонголтын хүсэлт</>,
    icon:<ProfileOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Graduate_Student_Circular: {
    id:"10",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Төгсөгч оюутны тойрох хуудас",
    componentName: "client_student",
    component: <>Төгсөгч оюутны тойрох хуудас</>,
    icon:<ProfileOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Update_your_personal_information: {
    id:"11",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Хувийн мэдээллээ шинэчлэх",
    componentName: "client_student",
    component: <>Хувийн мэдээллээ шинэчлэх</>,
    icon:<ProfileOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Examination_schedule: {
    id:"12",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Шалгалтын хуваарь",
    componentName: "client_student",
    component: <>Шалгалтын хуваарь</>,
    icon:<ProfileOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Scholarship: {
    id:"13",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Тэтгэлэг",
    componentName: "client_student",
    component: <>Тэтгэлэг</>,
    icon:<DatabaseOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  // Хичээл
  lesson: {
    id:"14",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Хичээл",
    componentName: "lesson",
    component: <>Хичээл</>,
    icon:<MenuOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter: ["course_selection1", "course_selection2", "class_schedule"],
  },
  course_selection1: {
    id:"15",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Хичээл сонголт 1",
    componentName: "course_selection1",
    component: <>Хичээл сонголт 1</>,
    icon:<ArrowRightOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  course_selection2: {
    id:"16",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Хичээл сонголт 2",
    componentName: "course_selection2",
    component: <>Хичээл сонголт 2</>,
    icon:<ArrowRightOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  class_schedule: {
    id:"17",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "хичээлийн хуваарь",
    componentName: "class_schedule",
    component: <>хичээлийн хуваарь</>,
    icon:<ArrowRightOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  // ТОДОРХОЙЛОЛТ
  Description: {
    id:"18",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "ТОДОРХОЙЛОЛТ",
    componentName: "Description",
    component: <>Хичээл</>,
    icon:<MenuOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter: ["Description_mongol", "Description_english"],
  },
  Description_mongol: {
    id:"19",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "ТОДОРХОЙЛОЛТ-Монгол",
    componentName: "Description_mongol",
    component: <>ТОДОРХОЙЛОЛТ-Монгол</>,
    icon:<ArrowRightOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  Description_english: {
    id:"20",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "ТОДОРХОЙЛОЛТ-Англи",
    componentName: "Description_english",
    component: <>ТОДОРХОЙЛОЛТ-Англи</>,
    icon:<ArrowRightOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
// busad
  elec_learning: {
    id:"23",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "ЦАХИМ СУРГАЛТ",
    componentName: "elec_learning",
    component: <>ЦАХИМ СУРГАЛТ</>,
    icon:<MenuOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  bank_card: {
    id:"24",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "ГОЛОМТ БАНКНЫ ALL-IN КАРТ ЗАХИАЛГА",
    componentName: "bank_card",
    component: <>ГОЛОМТ БАНКНЫ ALL-IN КАРТ ЗАХИАЛГА</>,
    icon:<MenuOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  library: {
    id:"25",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "24 НОМЫН САНГИЙН ЗАХИАЛГА",
    componentName: "library",
    component: <>24 НОМЫН САНГИЙН ЗАХИАЛГА</>,
    icon:<MenuOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter:[]
  },
  client_teacher: {
    id:"26",
    path: "/studentMenu",
    perRoleType: perRoleType.Organization,
    name: "Багш",
    componentName: "client_teacher",
    component: <>Багш</>,
    icon:<MenuOutlined />,
    permissions: {
      ShowMenuInstructions: {code: "Instructions_ShowMenuInstructions", name: "Цэсээр зааварчилгаа харуулах"},
    },
    subRouter: ["Study_plan", ,
      "Course_choice_request", "Graduate_Student_Circular", "Scholarship"],
  },

};

export {
  RoleSpecificComponents
};
