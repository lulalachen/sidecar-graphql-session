import { AuthenticationError } from 'apollo-server'
import { uuid } from 'uuidv4'

export const doctors = [
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

export default {
  Mutation: {
    bookmarkDoctor: async (_parent, { input = {} }, { user, db }) => {
      if (!user) throw new AuthenticationError('Unauthorized')
      const doctor = doctors.find(doc => input.uuid === doc.uuid)
      const bookmark = await db.bookmarks.findOne({
        where: { userUuid: user.uuid, doctorUuid: input.uuid },
      })

      if (!!bookmark) {
        await bookmark.destroy()
      } else {
        await db.bookmarks.create({
          uuid: uuid(),
          userUuid: user.uuid,
          doctorUuid: input.uuid,
        })
      }

      return {
        isBookmarked: !bookmark,
        doctor,
      }
    },
  },
  Query: {
    getDoctor: (_parent, { input }, _context, _info) => {
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
