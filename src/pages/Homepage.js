import React from 'react';
import { Layout } from 'antd';


const Homepage = () => {

    // useEffect(() => {
    //     fetch(`http://localhost:8081/api/v1/getStudentData`).then(res => {
    //         console.log(res.json());
    //     })
    // }, []);

    return (
            <Layout style={{marginTop: '200px'}}>
                <p>HOME page</p>
            </Layout>
    );
};
export default Homepage;
