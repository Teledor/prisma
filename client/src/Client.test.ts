import { test } from 'ava'
import { Client } from './Client'
import { Model } from './types'
import { print } from 'graphql'

test('related type', t => {
  const typeDefs = `
    type Query {
      user: User
    }

    type User {
      id: ID!
      posts: [Post!]!
    }

    type Post {
      content: String!
    }
  `

  const models: Model[] = [
    {
      embedded: false,
      name: 'User',
    },
    {
      embedded: false,
      name: 'Post',
    },
  ]

  const endpoint = 'http://localhost;4466'

  const client: any = new Client({
    typeDefs,
    endpoint,
    models,
  })

  client.user()

  const document = client.getDocumentForInstructions(
    Object.keys(client.currentInstructions)[0],
  )

  t.snapshot(print(document))
})

test('embedded type', t => {
  const typeDefs = `
    type Query {
      user: User
    }

    type User {
      id: ID!
      posts: [Post!]!
    }

    type Post {
      content: String!
    }
  `

  const models: Model[] = [
    {
      embedded: false,
      name: 'User',
    },
    {
      embedded: true,
      name: 'Post',
    },
  ]

  const endpoint = 'http://localhost;4466'

  const client: any = new Client({
    typeDefs,
    endpoint,
    models,
  })

  client.user()

  const document = client.getDocumentForInstructions(
    Object.keys(client.currentInstructions)[0],
  )

  t.snapshot(print(document))
})