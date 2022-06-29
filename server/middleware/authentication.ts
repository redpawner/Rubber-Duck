import serviceAccount from '../service-account-file.json';

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//type of ctx

const validateAuthorization = async (ctx: any, next: any) => {
  // if (ctx.request.url.includes('graphql')) {
  //   console.log('authorisation is disabled');
  //   return next();
  // }
  const token: string = ctx.request.headers.authorization;
  // const uid: string = ctx.request.body.variables.uid;

  // console.log(token);
  // console.log(ctx.request.body);
  // console.log(ctx.request.body.variables);

  // comment/uncomment below to disable/enable authorization >>

  // <<

  if (!token) {
    ctx.throw(401);
  }
  return await admin
    .auth()
    .verifyIdToken(token.slice(7))
    .then((decodedToken: any) => {
      // console.log(decodedToken.uid);
      // const fbuid = decodedToken.uid;
      // console.log('fbuid: ' + fbuid);
      // console.log('uid: ' + uid);
      // if (fbuid == uid) {
      //   console.log('succesfully authorized');
      ctx.state.uid = decodedToken.uid;
      // console.log(decodedToken.uid);
      // console.log(ctx.state.uid);
      return next();
      // } else {
      //   console.log('tokens do not match');
      //   ctx.throw(401);
      // }
    })
    .catch((error: any) => {
      console.log(error);
      return ctx.throw(401);
    });
};

export default validateAuthorization;
