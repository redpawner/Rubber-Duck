import Koa from 'koa';
const GOOGLE_APPLICATION_CREDENTIALS: string = process.env
  .GOOGLE_APPLICATION_CREDENTIALS as string;
const serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const validateAuthorization = async (ctx: Koa.Context, next: Function) => {
  const token: string | undefined = ctx.request.headers.authorization;

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
    .catch((error: Error) => {
      console.log(error);
      return ctx.throw(401);
    });
};

export default validateAuthorization;
