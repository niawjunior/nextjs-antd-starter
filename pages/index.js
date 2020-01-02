import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Tag } from 'antd';
import Nav from '../components/nav'

const Home = () => {
  const users = [{
    id: 1,
    name: 1,
  },
  {
    id: 2,
    name: 2,
  },
  {
    id: 3,
    name: 3,
  },
  {
    id: 4,
    name: 4,
  },

  ]
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Nav />
      <div>
        {
          users.map(({ name, id }) => (
            <Link key={id} href="/users/[user]" as={`/users/${name}`}>
              <Tag color="blue">
                User
                {name}
              </Tag>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
