import { KeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import React, { useContext, useState } from "react";
import contextLogin from "../components/contextLogin";
import contextKeycloak from "../keycloak/contextKeycloak";
import MainHeader from "../components/toolComponents/MainHeader";
import {Layout, Menu, theme} from "antd";
import MainFooter from "../components/toolComponents/MainFooter";
import {RoleSpecificComponents} from "../components/RoleSpecificComponents";

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
    const roleComp = () =>{
        role.map((item, index) => {
            const it = RoleSpecificComponents[item];
            roleComponents.push(
                getItem(it?.name, it?.id, it?.icon)
            );
        });
    };
    console.log(roleComponents)


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
                        }}
                    >
                        {!loadingKeycloak &&
                            <Layout style={layoutStyle}>
                                {roleComp()}
                                <Content style={contentStyle}>
                                    <MainHeader/>
                                    <Layout style={{height:'100%'}}>
                                        <Sider
                                            style={{
                                                background: colorBgContainer,
                                            }}
                                            width={256}
                                        >
                                            <Menu
                                                defaultSelectedKeys={['1']}
                                                mode="inline"
                                                theme="dark"
                                                items={roleComponents}
                                            />
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
