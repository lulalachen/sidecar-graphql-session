import { UserInputError } from 'apollo-server'

export default {
  Query: {},
  Mutation: {
    login: async (parent, { input = {} }, { db, dataSources: { AuthAPI } }) => {
      const login = await AuthAPI.login(input.email, input.password)

      if (!login) {
        throw new UserInputError('Email/Password is wrong')
      }
      console.log(login)
      return login
    },
  },
}
