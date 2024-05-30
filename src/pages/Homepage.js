import React, {useEffect, useState} from 'react';
import {Layout, Spin} from 'antd';
import {getService} from "../tools/utils";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const getSomeData = () => {
    setLoading(true);
    getService("/v1/helloFirst")
      .then((result) => {
        setData(result);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getSomeData();
  }, []);

  return (
    <Spin spinning={loading}>
      <Layout style={{marginTop: '200px'}}>
        <p>HOME page</p> {data}
      </Layout>
    </Spin>
  );
};
export default Homepage;
