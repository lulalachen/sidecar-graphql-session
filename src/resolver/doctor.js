export default {
  Mutation: {},
  Query: {
    getDoctorList: async (
      _parent,
      { input = {} },
      { dataSources: { DoctorAPI } },
      _info,
    ) => {
      const doctors = await DoctorAPI.getDoctors(input)
      return doctors
    },
  },
  Doctor: {
    addresses: (parent, { input = {} }) => {
      if (input.isPrimary !== undefined) {
        return parent.addresses.filter(add => add.primary === input.isPrimary)
      } else {
        return parent.addresses
      }
    },
  },
}
