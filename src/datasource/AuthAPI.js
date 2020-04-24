const { RESTDataSource } = require('apollo-datasource-rest')

class AuthAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://dev-api.sidecarhealth.com/auth/v1'
  }

  async login(email, password) {
    const loginResult = await this.get(
      `login?type=password`,
      {},
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString(
            'base64',
          )}`,
        },
      },
    )
    console.log(loginResult)

    return loginResult
  }
}

export default AuthAPI
