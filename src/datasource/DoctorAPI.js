const { RESTDataSource } = require('apollo-datasource-rest')

class DoctorAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://dev-api.sidecarhealth.com/doc/v2'
  }

  willSendRequest(request) {
    request.headers.set('token', this.context.token)
  }

  async getDoctors(input = {}) {
    const doctors = await this.get('/views/doctors', {
      memberUuid: input.memberUuid,
      ...input,
    })
    return doctors
  }
}

export default DoctorAPI
