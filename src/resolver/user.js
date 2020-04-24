import { uuid } from 'uuidv4'
import { sign } from 'jsonwebtoken'
import { UserInputError } from 'apollo-server'
import { doctors } from './doctor'

export default {
  Query: {
    getBookmarks: async (_, __, { db, user }) => {
      if (!user) throw new AuthenticationError('Unauthorized')
      const bookmarks = await db.bookmarks
        .findAll({ where: { userUuid: user.uuid } })
        .map(b => b.doctorUuid)

      return doctors.filter(doc => bookmarks.includes(doc.uuid))
    },
  },
  Mutation: {
    signup: async (parent, { input = {} }, { db }) => {
      const user = await db.users.findOne({ where: { email: input.email } })
      if (!!user) throw new UserInputError('User already exists')

      const newUser = await db.users.create({
        uuid: uuid(),
        email: input.email,
        password: input.password,
      })

      return {
        token: sign({ uuid: newUser.uuid }, 'FLUFFY_CAT'),
      }
    },
    login: async (parent, { input = {} }, { db }) => {
      const user = await db.users.findOne({ where: { email: input.email } })

      if (!user || user.password !== input.password) {
        throw new UserInputError('Email/Password is wrong')
      }

      return { token: sign({ uuid: user.uuid }, 'FLUFFY_CAT') }
    },
  },
}
