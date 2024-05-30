import React, {useEffect, useState} from "react";
import MainHeader from "../components/toolComponents/MainHeader";
import {Avatar, Button, Calendar, Card, Layout, Menu, Spin} from "antd";
import MainFooter from "../components/toolComponents/MainFooter";
import {RoleSpecificComponents} from "../components/RoleSpecificComponents";
import {HomeOutlined, LockOutlined, PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import './student.css'
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {getService} from "../tools/utils";
import contextKeycloak from "./contextKeycloak";

const {Sider, Content} = Layout;
const layoutStyle = {
  borderRadius: '8px',
  width: '100vw',
  height: '100vh',
}
const contentStyle = {
  height: '100vh'
}

function getItem(label, key, icon, children, component) {
  return {
    key,
    icon,
    children,
    label,
    component
  };
}

export const MainLayout = ({role, email}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isTrue, setIsTrue] = useState(false) ;
  const roleComponents = [];
  const {logoutUser, changePassword} = React.useContext(contextKeycloak);

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if(role.includes('client_teacher')){
      setIsTrue(true);
      getTeacherDescData();
    }else {
      setIsTrue(false);
      getSomeData();

    }
  }, []);
  const getSomeData = () => {
    setLoading(true);
    getService("/student/getStudentData", {email: email})
      .then((result) => {
        setData(result);
      })
      .finally(() => setLoading(false));
  }

  const getTeacherDescData = () => {
    getService("/teacher/getTeacherDescData", {email: email})
        .then((result) => {
          setData(result);
        })
        .finally(() => setLoading(false));
  }

  const roleComp = () => {
    role.forEach((item) => {
      const it = RoleSpecificComponents[item];
      if (it.subRouter.length > 0) {
        const subItems = it.subRouter.map((subItem) => {
          const subComponent = RoleSpecificComponents[subItem];
          return getItem(subComponent.name, subComponent.id, subComponent.icon, null, subComponent.component);
        });
        roleComponents.push(
          getItem(it.name, it.id, it.icon, subItems, it.component)
        );
      } else {
        roleComponents.push(
          getItem(it.name, it.id, it.icon, null, it.component)
        );
      }
    });
  };
  const renderComponent = () => {
    return (
      <Routes>
        <Route key="*" element={<Navigate to="error" replace/>}/>
        <Route key="error" element="Хуудас олдсонгүй"/>
        {roleComponents?.map((r) => (
          <Route key={r.key} path={r.key} element={r.component}/>
        ))}
      </Routes>
    )
  }

  return (
    <Spin spinning={loading}>
      <Layout style={layoutStyle}>
      {roleComp()}
      <Content style={contentStyle}>
        <MainHeader/>
        <Layout style={{height: 'auto'}}>
          <Sider style={{background: '#001529'}} width={306}>
            <Card style={{
              width: 'auto',
              margin: '30px 10px 30px 10px ',
              background: '#003765'
            }}
            >
              <Avatar shape="square" size={64} icon={<UserOutlined/>}
                      style={{margin: '0px 30px 0px 0px '}}/>
              <div className='profile'>
                <p><HomeOutlined style={{marginRight: '5px'}}/><Link to="/"><Button type="link" >{data.code}</Button></Link></p>
                <p><LockOutlined style={{marginRight: '5px'}}/><Button type="link" onClick={changePassword}>Нууц үг солих</Button></p>
                <p><PoweroffOutlined style={{marginRight: '5px'}}/><Button type="link" onClick={logoutUser}>Гарах</Button></p>
              </div>
            </Card>
            <Menu
              defaultSelectedKeys={[window.location.pathname.replace("/", "")]}
              mode="inline"
              theme="dark"
              items={roleComponents}
              onClick={(e) => navigate(e.key)}
            />
            <Card style={{
              width: 'auto',
              margin: '30px 10px 0px 10px ',
              background: '#003765'
            }}>
              <Card style={{width: 'auto', background: '#001529', color: '#fff'}}>
                <h1>XVII</h1>
                <p>Долоо хоног</p>
              </Card>
              <div>
                <p style={{color: '#577B8D'}}>Хичээлийн жил</p>
                <p style={{color: '#fff', fontWeight: 'bold'}}>2023-2024</p>
                <p style={{color: '#fff', fontWeight: 'bold'}}>Хавар</p>
              </div>
            </Card>
            <Calendar fullscreen={false} style={{margin: '10px', marginTop: '30px'}}/>
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
              fontSize: '40px',
              fontWeight: 'bold'
            }}
          >
            {renderComponent()}
          </Content>
        </Layout>
        <MainFooter/>
      </Content>
    </Layout>
    </Spin>
  );
};

