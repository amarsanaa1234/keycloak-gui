import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Descriptions, Layout, Row, Spin, Table} from 'antd';
import {getService} from "../tools/utils";
import {useKeycloak} from "@react-keycloak/web";
import './page.css'
import Meta from "antd/es/card/Meta";
import {UserOutlined, EnvironmentFilled} from "@ant-design/icons";
import {TbMailFilled, TbPhoneFilled} from "react-icons/tb";

const columns = [
  {
    title: 'Товч.Үг',
    dataIndex: 'word',
    key: 'word',
  },
  {
    title: 'Оюутны код',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Регистр',
    dataIndex: 'pin',
    key: 'pin',
  },
  {
    title: 'Эцэг /эх/-н нэр',
    key: 'ownerName',
    dataIndex: 'ownerName',
  },
  {
    title: 'Нэр',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Утас',
    key: 'phone',
    dataIndex: 'phone',
  },
];
const data = [
  {
    word: 'ST',
    code: 'A.AR13D999',
    pin: 'ФП99010595',
    ownerName: 'БОЛД',
    name: 'БАЯРАА',
    phone: '86132390'
  },
  {
    word: 'ST',
    code: 'B161058001',
    pin: 'ШР98090908',
    ownerName: 'ПҮРЭВ',
    name: 'ЛХАГВА',
    phone: '99159835'
  },
];
const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contacts1, setContacts1] = useState([]);
  const [isTrue, setIsTrue] = useState(false) ;

  const keycloakToken = useKeycloak();

  useEffect(() => {
    const role = localStorage.getItem('user_role');

    getAlert();
    if(role.includes('client_teacher')){
      setIsTrue(true);
      getTeacherDescData();
    }else {
      setIsTrue(false);
      getStudentDescData();
    }
  }, []);

  const getTeacherDescData = () => {
    getService("/teacher/getTeacherDescData", {email: keycloakToken.keycloak.tokenParsed.email})
        .then((result) => {
          setContacts(result);
        })
        .finally(() => setLoading(false));
  }

  const getAlert = () => {
    setLoading(true);
    getService("/main/getAlert")
      .then((result) => {
        setAlertData(result);
      })
      .finally();
  }

  const getStudentDescData = () => {
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
            {isTrue ?
                <Descriptions title="багшийн мэдээлэл" bordered column={1} size="middle">
                  <Descriptions.Item label="Сургууль">{contacts.school}</Descriptions.Item>
                  <Descriptions.Item label="Мэргэжил">{contacts.work}</Descriptions.Item>
                  <Descriptions.Item label="Оюутны код">{contacts.code}</Descriptions.Item>
                  <Descriptions.Item label="Нэр">{contacts.fullName}</Descriptions.Item>
                  <Descriptions.Item label="Регистр">{contacts.pin}</Descriptions.Item>
                </Descriptions> :
                <Descriptions title="Оюутны товч мэдээлэл" bordered column={1} size="middle">
                  <Descriptions.Item label="Сургууль">{contacts.school}</Descriptions.Item>
                  <Descriptions.Item label="Салбар тэнхим">{contacts.department}</Descriptions.Item>
                  <Descriptions.Item label="Мэргэжил">{contacts.work}</Descriptions.Item>
                  <Descriptions.Item label="Оюутны код">{contacts.code}</Descriptions.Item>
                  <Descriptions.Item label="Нэр">{contacts.fullName}</Descriptions.Item>
                  <Descriptions.Item label="Регистр">{contacts.pin}</Descriptions.Item>
                  <Descriptions.Item label="Нийт кредит">{contacts.credit}</Descriptions.Item>
                  <Descriptions.Item label="ҮГД">{contacts.averageScore}</Descriptions.Item>
                </Descriptions>}
          </Col>
          <Col span={12}>
            {isTrue ? <div></div> : <Descriptions title="Зөвлөх багшийн мэдээлэл" bordered column={0} size="middle">
              <Descriptions.Item label={<img alt="example" style={{width: 100}}
                                             src="https://png.pngtree.com/png-clipart/20230930/original/pngtree-friendly-female-avatar-for-website-and-social-network-vector-png-image_12917752.png"/>}>
                <p style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <UserOutlined/>{contacts1.fullName}</p>
                <p style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <TbMailFilled/>{contacts1.email}</p>
                <p style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}><EnvironmentFilled/>6-304
                </p>
                <p style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <TbPhoneFilled/>{contacts1.phone}</p>
              </Descriptions.Item>
            </Descriptions>}
          </Col>
        </Row>
        <Row gutter={16} justify="space-around" align="middle" style={{marginTop: 50}}>
          <Col span={16} style={{background: '#EEEEEE', padding: 30, borderRadius: 20}}>
            <div className='card'>
              <div className='card-box'>
                <Card hoverable
                      style={{width: '90%'}}>
                  <Meta title="Оюутнуудын анхааралд" description="Сургалтын төлбөр төлөхдөө дараах форматын дагуу гүйлгээний утгыг оруулна уу. ST Оюутны код Регистр Овог Нэр Утас"/>
                </Card>
                <img className='card-box-img' alt="example" style={{width: 100}} src="https://png.pngtree.com/png-clipart/20230930/original/pngtree-friendly-female-avatar-for-website-and-social-network-vector-png-image_12917752.png"/>
              </div>
              <Table columns={columns} dataSource={data}/>
              <Descriptions title="Товчилсон үсгийн тайлбар" bordered column={1} size="middle">
                <Descriptions.Item label="Товч.Үг">Тайлбар</Descriptions.Item>
                <Descriptions.Item label="ST">СУРГАЛТЫН ТӨЛБӨР</Descriptions.Item>
                <Descriptions.Item label="TD">ОЮУТНЫ ТОДОРХОЙЛОЛТ</Descriptions.Item>
                <Descriptions.Item label="U">КРЕДИТ ШУУД ТООЦОХ ШАЛГАЛТЫН ТӨЛБӨР</Descriptions.Item>
                <Descriptions.Item label="E">НӨХӨН ШАЛГАЛТЫН ТӨЛБӨР</Descriptions.Item>
                <Descriptions.Item label="TR">ТОРГУУЛЬ</Descriptions.Item>
                <Descriptions.Item label="AD">АЛДАНГИ</Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
        </Row>
      </Layout>
    </Spin>
  );
};
export default Homepage;
