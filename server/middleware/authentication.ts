import Koa from 'koa';
const GOOGLE_APPLICATION_CREDENTIALS = process.env
  .GOOGLE_APPLICATION_CREDENTIALS as string;

let parsedGoogleCreds = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);
parsedGoogleCreds = {
  ...parsedGoogleCreds,
  private_key: parsedGoogleCreds.private_key.replace(/\\n/g, '\n'),
};
// ^ may not need to replace if using a fresh private key

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(parsedGoogleCreds),
});

const validateAuthorization = async (ctx: Koa.Context, next: Function) => {
  const token = ctx.request.headers.authorization;

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
