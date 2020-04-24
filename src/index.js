import { ApolloServer } from 'apollo-server'

const doctors = [
  {
    uuid: '111',
    name: 'John Smith',
    priceFairness: 'LOW',
    addresses: [
      {
        street1: '2381 Rosecrans',
        zipCode: '90245',
      },
    ],
  },
  {
    uuid: '222',
    name: 'Sally Smith',
    priceFairness: 'HIGH',
    addresses: [
      {
        street1: '1234 Rosecrans',
        zipCode: '90245',
      },
    ],
  },
  {
    uuid: '333',
    name: 'Fluffy Smith',
    priceFairness: 'LOW',
    addresses: [],
  },
]

const typeDefs = `
  type Query {
    getDoctor(input: GetDoctorInput): Doctor
    getDoctorList(input: GetDoctorListInput): [Doctor]
  }

  type Mutation {
    bookmarkDoctor(input: GetDoctorInput): Doctor
  }

  # --------- #

  type Doctor {
    uuid: ID!
    name: String!
    addresses: [Address]
    priceFairness: PriceFairness
  }

  enum PriceFairness {
    LOW
    FAIR
    HIGH
  }

  type Address {
    street1: String
    street2: String
    zipCode: String!
  }

  # --------- #

  input GetDoctorInput {
    " uuid of doctor "
    uuid: ID!
  }

  input GetDoctorListInput {
    " filter by the name of doctor "
    name: String
    " filter by the price fairness of the doctor "
    priceFairness: PriceFairness
  }
`

const resolvers = {
  Query: {
    getDoctor: (_parent, { input = {} }, _context, _info) => {
      return doctors.find(doc => doc.uuid === input.uuid)
    },
    getDoctorList: (_parent, { input = {} }, _context, _info) => {
      return doctors.filter(
        doc =>
          (!!input.name ? doc.name === input.name : true) &&
          (!!input.priceFairness
            ? doc.priceFairness === input.priceFairness
            : true),
      )
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen({ port: process.env.PORT || '5000' }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
