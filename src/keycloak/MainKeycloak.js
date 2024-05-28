import {KeycloakProvider, useKeycloak} from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import React, { useContext, useState } from "react";
import contextLogin from "../components/contextLogin";
import contextKeycloak from "../keycloak/contextKeycloak";
import MainHeader from "../components/toolComponents/MainHeader";
import {Layout, Menu, theme, Calendar, Card, Avatar} from "antd";
import MainFooter from "../components/toolComponents/MainFooter";
import {RoleSpecificComponents} from "../components/RoleSpecificComponents";
import { UserOutlined, HomeOutlined, PoweroffOutlined, LockOutlined } from '@ant-design/icons';
import './student.css'

const { REACT_APP_KEYCLOAK_URL, REACT_APP_KEYCLOAK_REALM, REACT_APP_KEYCLOAK_CLIENT_ID } = process.env;

const keycloak = new Keycloak({
    realm: REACT_APP_KEYCLOAK_REALM,
    url: REACT_APP_KEYCLOAK_URL,
    clientId: REACT_APP_KEYCLOAK_CLIENT_ID,
    "ssl-required": "external",
    verifyTokenAudience: true,
    "public-client": true,
});

const keycloakProviderInitConfig = {
    promiseType: "native",
    checkLoginIframe: false,
    onLoad: 'login-required'
};
const { Sider, Content } = Layout;


const layoutStyle = {
    borderRadius: '8px',
    width: '100vw',
    height: '100vh',
}
const contentStyle = {
    textAlign: 'center',
    height: '100vh'
}
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const MainKeycloak = () => {
    const { setKeycloakToken, setLoggedUserDetail } = useContext(contextLogin);
    const [loadingUseEffect, setLoadingUseEffect] = useState(true);
    const [loadingKeycloak, setLoadingKeycloak] = useState(true);
    const [role, setRole] = useState([]);
    const roleComponents = [];
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const loginUser = () => {
        keycloak.login();
    };
    const logoutUser = () => {
        keycloak.logout();
    };

    const refreshToken = () =>{
        keycloak.updateToken();
    }

    const onKeycloakEvent = (event) => {
        if (event === 'onReady') {
            setLoadingKeycloak(false);
        } else if (event === "onAuthSuccess") {
        } else if (event === "onAuthError") {
        }
    };
    const onKeycloakTokens = (tokens) => {
        const { token } = tokens;
        if (token) {
            setKeycloakToken(token);
            setLoggedUserDetail(keycloak.tokenParsed);
            setRole(keycloak.tokenParsed.resource_access.keycloak_rest_api.roles);
        }
    };
    const roleComp = () => {
        role.forEach((item) => {
            const it = RoleSpecificComponents[item];
            if (it.subRouter.length > 0) {
                const subItems = it.subRouter.map((subItem) => {
                    const subComponent = RoleSpecificComponents[subItem];
                    return getItem(subComponent.name, subComponent.id, subComponent.icon);
                });
                roleComponents.push(
                    getItem(it.name, it.id, it.icon, subItems)
                );
            } else {
                roleComponents.push(
                    getItem(it.name, it.id, it.icon)
                );
            }
        });
    };

    React.useEffect(() => {
        setLoadingUseEffect(false)
    }, []);

    return (
        <div>
            {!loadingUseEffect && (
                <KeycloakProvider
                    keycloak={keycloak}
                    initConfig={keycloakProviderInitConfig}
                    onTokens={onKeycloakTokens}
                    onEvent={onKeycloakEvent}
                >
                    <contextKeycloak.Provider
                        value={{
                            loginUser,
                            logoutUser,
                            refreshToken,
                        }}
                    >
                        {!loadingKeycloak &&
                            <Layout style={layoutStyle}>
                                {roleComp()}
                                <Content style={contentStyle}>
                                    <MainHeader/>
                                    <Layout style={{height:'auto'}}>
                                        <Sider style={{background: '#001529'}} width={306}>
                                            <Card style={{ width:'auto', margin: '30px 10px 0px 10px ', background: '#003765'}}>
                                                <Avatar shape="square" size={64} icon={<UserOutlined />} style={{ margin: '0px 30px 0px 0px '}}/>
                                                <div className='profile'>
                                                    <p><HomeOutlined style={{marginRight: '5px'}}/>B200910803</p>
                                                    <p><LockOutlined style={{marginRight: '5px'}}/>Нууц үг солих</p>
                                                    <p><PoweroffOutlined style={{marginRight: '5px'}}/>Гарах</p>
                                                </div>
                                            </Card>
                                            <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark" items={roleComponents}/>
                                            <Card style={{ width:'auto', margin: '30px 10px 0px 10px ', background: '#003765'}}>
                                                <Card style={{ width:'auto', background: '#001529', color: '#fff'}}>
                                                    <h1>XVII</h1>
                                                    <p>Долоо хоног</p>
                                                </Card>
                                                <div>
                                                    <p style={{color: '#577B8D'}}>Хичээлийн жил</p>
                                                    <p style={{color: '#fff',fontWeight: 'bold'}}>2023-2024</p>
                                                    <p style={{color: '#fff',fontWeight: 'bold'}}>Хавар</p>
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
                                            Student
                                        </Content>
                                    </Layout>
                                    <MainFooter/>
                                </Content>
                            </Layout>
                        }
                    </contextKeycloak.Provider>
                </KeycloakProvider>
            )}
        </div>
    );
};

MainKeycloak.propTypes = {};

export default MainKeycloak;
