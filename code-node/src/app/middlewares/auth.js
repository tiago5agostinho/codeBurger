import Jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default (request, response, next) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ error: 'token not provied' })
  }

  const token = authToken.split(' ')[1]

  try {
    Jwt.verify(token, authConfig.secret, function (err, decoded) {
      if (err) {
        throw new Error()
      }
      request.userId = decoded.id
      request.userName = decoded.name

      return next()
    })
  } catch (err) {
    return response.status(401).json({ error: 'token is invalid' })
  }
}
