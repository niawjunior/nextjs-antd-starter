import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Tag } from 'antd';
import Nav from '../components/nav'

const Home = () => {
  const users = [1, 2, 3, 4, 5]
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Nav />
      <div>
        {
          users.map((user, key) => (
            <Link key={key} href="/users/[user]" as={`/users/${user}`}>
              <Tag color="blue">
                {' '}
                User
                {user}
              </Tag>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
