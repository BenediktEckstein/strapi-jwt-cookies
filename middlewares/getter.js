'use strict'

const { isFromFrontend, joinJwt } = require('../utils')
const { COOKIE_NAME, payloadOpts } = require('../config')

module.exports = (config, { strapi }) => {
  return async ({ request, cookies }, next) => {
    if (request.url.startsWith('/api') && !request.headers.authorization) {
      const jwt = cookies.get('token')
      // const headersAndSignature = cookies.get('token.sig')

      // reconstruct the jwt from the cookies
      console.log('jwt', jwt);
      if (jwt) {
        // const jwt = joinJwt(payload, headersAndSignature)
        request.headers.authorization = `Bearer ${jwt}`
      }

      await next()

      // renew 'COOKIE_NAME.PAYLOAD' expire time.
      // if (payload && !request.url.startsWith('/api/auth/logout')) {
      //   cookies.set(COOKIE_NAME.PAYLOAD, payload, payloadOpts)
      // }
    } else {
      console.log('not from frontend', request.url, request.headers.authorization);
      await next()
    }
  }
}
