const GOOGLE_APPLICATION_CREDENTIALS: any =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const validateAuthorization = async (ctx: any, next: any) => {
  const token: string = ctx.request.headers.authorization;

  if (!token) {
    ctx.throw(401);
  }
  return await admin
    .auth()
    .verifyIdToken(token.slice(7))
    .then((decodedToken: any) => {
      ctx.state.uid = decodedToken.uid;
      return next();
    })
    .catch((error: any) => {
      console.log(error);
      return ctx.throw(401);
    });
};

export default validateAuthorization;
