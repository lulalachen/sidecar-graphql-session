export default {
  Query: {
    getDoctor: (parent, { uuid }, { dataSources }, info) => {
      return dataSources.DoctorAPI.findDoctorByUuid(uuid);
    },
    getDoctorList: (
      parent,
      { input: { name, priceFairness } },
      { dataSources },
      info
    ) => {
      const doctors = dataSources.DoctorAPI.getDoctors();
      return doctors.filter(
        (doc) =>
          (!!name ? doc.name.includes(name) : true) &&
          (!!priceFairness ? doc.priceFairness === priceFairness : true)
      );
    },
    getBookmarkedDoctors: (parent, args, { dataSources }, info) => {
      return dataSources.DoctorAPI.getBookmarkedDoctors();
    },
  },
  Mutation: {
    bookmarkDoctor: (parent, { uuid }, { dataSources }, info) => {
      const doctor = dataSources.DoctorAPI.findDoctorByUuid(uuid);
      const bookmarks = dataSources.DoctorAPI.bookmarkDoctor(doctor);
      return bookmarks;
    },
  },
};
