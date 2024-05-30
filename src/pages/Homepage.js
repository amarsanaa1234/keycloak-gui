import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Descriptions, Layout, Row, Spin} from 'antd';
import {getService} from "../tools/utils";
import {useKeycloak} from "@react-keycloak/web";
import './page.css'
import Meta from "antd/es/card/Meta";
import Title from "antd/es/skeleton/Title";
import {UserOutlined} from "@ant-design/icons";
import {TbMailFilled, TbPhoneFilled} from "react-icons/tb";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contacts1, setContacts1] = useState([]);

  const keycloakToken = useKeycloak();

  useEffect(() => {
    getAlert();
    getEmpDescData();
  }, []);

  const getAlert = () => {
    setLoading(true);
    getService("/main/getAlert")
      .then((result) => {
        setAlertData(result);
      })
      .finally();
  }

  const getEmpDescData = () => {
    getService("/student/getStudentAndTeacher", {email: keycloakToken.keycloak.tokenParsed.email})
      .then((result) => {
        setContacts(result);
        setContacts1(result.teacherList);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Spin spinning={loading}>
      <Layout>
        {alertData.map((alert) => (
          <Card key={alert.id} style={{width: '95%', margin: '10px 0px 10px 0px'}}>
            <h3 style={{color: '#FF0000'}} >{alert.text}</h3>
            <Button type="primary"><a href={alert.href} target="_blank">Дэлгэрэнгүй</a></Button>
          </Card>
        ))}
        <Row style={{marginTop: '40px'}} gutter={16}>
          <Col span={12}>
            <Descriptions title="Оюутны товч мэдээлэл" bordered column={1} size="middle" className="custom-descriptions">
              <Descriptions.Item label="Сургууль">{contacts.school}</Descriptions.Item>
              <Descriptions.Item label="Салбар тэнхим">{contacts.department}</Descriptions.Item>
              <Descriptions.Item label="Мэргэжил">{contacts.work}</Descriptions.Item>
              <Descriptions.Item label="Оюутны код">{contacts.code}</Descriptions.Item>
              <Descriptions.Item label="Нэр">{contacts.fullName}</Descriptions.Item>
              <Descriptions.Item label="Регистр">{contacts.pin}</Descriptions.Item>
              <Descriptions.Item label="Нийт кредит">{contacts.credit}</Descriptions.Item>
              <Descriptions.Item label="ҮГД">{contacts.averageScore}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions title="Зөвлөх багшийн мэдээлэл" bordered column={1} size="middle" className="custom-descriptions">
              <Descriptions.Item label={<img alt="example" style={{width: 100}}
                                             src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}>
                <p><UserOutlined/>{contacts1.fullName}</p>
                <p><TbMailFilled />{contacts1.email}</p>
                <p>6-304</p>
                <p><TbPhoneFilled />{contacts1.phone}</p>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Layout>
    </Spin>
  );
};
export default Homepage;
