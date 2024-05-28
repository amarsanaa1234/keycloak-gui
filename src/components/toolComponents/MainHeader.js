import React, {useState,useEffect} from 'react';
import {Button, Flex, Image, Layout, Menu, Space, Tooltip, Statistic, Modal} from "antd";
import shutisImage from '../../img/mustlogo.png';
import contextKeycloak from "../../keycloak/contextKeycloak";
import {useKeycloak} from "@react-keycloak/web";

const {Countdown} = Statistic;


const { Header} = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    lineHeight: '64px',
    display: 'flex',
};
const MainHeader = () => {


    const { logoutUser, refreshToken } = React.useContext(contextKeycloak);
    const [tokenExpireDate, setTokenExpireDate] = React.useState(0);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const keycloakToken = useKeycloak();

    useEffect(() => {
        setTokenExpireDate(keycloakToken.keycloak.tokenParsed.exp * 1000);
    }, [refresh]);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('Амжилттай сунгаж байна?');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        refreshToken();
        setRefresh(!refresh);
    };

    const handleCancel = () => {
        logoutUser();
    };

    return (
        <Header style={headerStyle}>
            <div className="demo-logo">
                <Image
                    width={400}
                    src={shutisImage}
                />
            </div>
            <Flex justify={"end"} style={{width: '100%'}}>
                <Space size={8}>
                    <Tooltip placement={"bottom"} title={"Хандалтын хугацаа"}>
                        <Countdown onFinish={showModal} value={tokenExpireDate} valueStyle={{fontSize: '16px', color: 'gray'}}/>
                    </Tooltip>
                    <Button type="primary" onClick={logoutUser}>Гарах</Button>
                </Space>
                <Modal
                    title="Нэвтрэлтийн хугацаа дууссан байна хугацаагаа сунгах уу"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>
            </Flex>
        </Header>
    )
}
export default MainHeader;