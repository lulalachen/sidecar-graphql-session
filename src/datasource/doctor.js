import { DataSource } from 'apollo-datasource'

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

const bookmarkedDoctors = []

class DoctorAPI extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {
    this.context = config.context
  }

  getDoctors() {
    return doctors
  }

  findDoctorByUuid(uuid) {
    return doctors.find(doc => doc.uuid === uuid)
  }

  getBookmarkedDoctors() {
    return bookmarkedDoctors
  }

  bookmarkDoctor(doctor) {
    bookmarkedDoctors.push(doctor)
    return doctor
  }
}

export default DoctorAPI
