const bcrypt = require('bcryptjs');
const {User,Session} = require('@/models')
// const { authenticate } = require('../middleware/authenticate');
// const { csrfCheck } = require('../middleware/csrfCheck');
const { initSession, error } = require('@/utils');
const {userSchema_login,userSchema_register} = require('@/validations/users.validations')


module.exports = {
    register: async (req, res) => {
        try {
          console.log('pakistan',req.body)
          const { email, password } = req.body;
          const result = userSchema_register.validateAsync(req.body)
          const user = new User({ email, password });
          const persistedUser = await user.save();
          const userId = persistedUser._id;
      
          const session = await initSession(userId);
      
          res.status(201)
          .json({
            title: 'User Registration Successful',
            detail: 'Successfully registered new user',
            token: session.token,
          });
        } catch (err) {
          error(res,'Registration Error','Something went wrong during registration process.',err,400)
        }
    },
    login: async (req, res) => {
        try {
          const { email, password } = req.body;
          const result = await userSchema_login.validateAsync(req.body)
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error();
          }
          const userId = user._id;
      
          const passwordValidated = await bcrypt.compare(password, user.password);
          if (!passwordValidated) {
            throw new Error();
          }
      
          const session = await initSession(userId);
      
          res.json({
              title: 'Login Successful',
              detail: 'Successfully validated user credentials',
              token: session.token,
          });
        } catch (err) {
          error(res,'Invalid Credentials','Check email and password combination.',err,401)
        }
    },
    show: async (req, res) => {
        try {
          const { userId } = req.session;
          const user = await User.findById({ _id: userId }, { email: 1, _id: 0 });
      
          res.json({
            title: 'Authentication successful',
            detail: 'Successfully authenticated user',
            user,
          });
        } catch (err) {
          error(res,'Unauthorized','Not authorized to access this route',err,401)
        }
    },
    destroy: async (req, res) => {
        try {
          const { userId } = req.session;
          const { password } = req.body;
          if (typeof password !== 'string') {
            throw new Error();
          }
          const user = await User.findById({ _id: userId });
      
          const passwordValidated = await bcrypt.compare(password, user.password);
          if (!passwordValidated) {
            throw new Error();
          }
      
          await Session.expireAllTokensForUser(userId);
          res.clearCookie('token');
          await User.findByIdAndDelete({ _id: userId });
          res.json({
            title: 'Account Deleted',
            detail: 'Account with credentials provided has been successfuly deleted',
          });
        } catch (err) {
          error(res,'Invalid Credentials','Check email and password combination.',err,401)
        }
    },
    logout: async (req, res) => {
        try {
          const { session } = req;
          await session.expireToken(session.token);
          res.clearCookie('token');
      
          res.json({
            title: 'Logout Successful',
            detail: 'Successfuly expired login session',
          });
        } catch (err) {
          error(res,'Logout Failed','Something went wrong during the logout process.',err,400)
        }
    }
}
