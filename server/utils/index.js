const {Session} = require('@/models')

const initSession = async (userId) => {
  const token = await Session.generateToken();
  const csrfToken = await Session.generateToken();
  const session = new Session({ token, csrfToken, userId });
  await session.save();
  return session;
};

const error = (res,title='',detail='',errorMessage='',status='') => {
  title = (!title)? "Something is not right":title
  detail = (!detail)? "Something went wrong during this process":detail
  status = (!status)? 400:status
  return res.status(status).json({
      errors: [
          {
              title: title,
              detail: detail,
              errorMessage: errorMessage
          }
      ]
  })
}

module.exports = { initSession,error };
