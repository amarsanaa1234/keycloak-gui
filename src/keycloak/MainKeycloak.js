import {KeycloakProvider} from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import React, {useContext, useState} from "react";
import contextLogin from "../components/contextLogin";
import contextKeycloak from "../keycloak/contextKeycloak";
import {Spin} from "antd";
import './student.css'
import {MainLayout} from "./MainLayout";

const {REACT_APP_KEYCLOAK_URL, REACT_APP_KEYCLOAK_REALM, REACT_APP_KEYCLOAK_CLIENT_ID} = process.env;

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

const MainKeycloak = () => {
  const {setKeycloakToken, setLoggedUserDetail} = useContext(contextLogin);
  const [loadingUseEffect, setLoadingUseEffect] = useState(true);
  const [loadingKeycloak, setLoadingKeycloak] = useState(true);
  const [role, setRole] = useState([]);
  const [email, setEmail] = useState();

  const loginUser = () => {
    keycloak.login();
  };
  const logoutUser = () => {
    keycloak.logout();
  };
  const refreshToken = () => {
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
    const {token} = tokens;
    if (token) {
      setKeycloakToken(token);
      setLoggedUserDetail(keycloak.tokenParsed);
      localStorage.setItem('jwtToken', token);
      setRole(keycloak.tokenParsed.resource_access.keycloak_rest_api.roles);
      setEmail(keycloak.tokenParsed.email)
    }
  };
  React.useEffect(() => {
    setLoadingUseEffect(false)
  }, []);

  if (loadingUseEffect)
    return <Spin fullscreen spinning/>

  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={keycloakProviderInitConfig}
      onTokens={onKeycloakTokens}
      onEvent={onKeycloakEvent}>
      <contextKeycloak.Provider value={{loginUser, logoutUser, refreshToken}}>
        {!loadingKeycloak &&
          <MainLayout role={role} email={email}/>
        }
      </contextKeycloak.Provider>
    </KeycloakProvider>
  );
};

export default MainKeycloak;
