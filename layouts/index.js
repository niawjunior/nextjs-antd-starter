import React from 'react'
import { Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'
const { Content } = Layout

const layout = () => {
    return (
        <Layout>
            <Header />
            <Content>
                <h1>Hello</h1>
            </Content>
            <Footer />
        </Layout>
    )
}
export default layout