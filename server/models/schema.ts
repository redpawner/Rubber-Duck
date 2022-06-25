import { Schema } from 'mongoose';
import { User, HelpReqSchema } from '../interfaces/interfaces';
import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import conn from './db';

const helpRequestSchema = new Schema<HelpReqSchema>({
  username: String,
  title: String,
  description: String,
  hr_languages: [String],
  time_created: Date,
});

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    user_languages: [
      {
        type: String,
        enum: {
          values: ['Javascript', 'Java', 'PHP', 'C#'],
          message: 'No language selected.',
        },
      },
    ],
    rating_total: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    needHelp: { type: Boolean, default: false },
    help_request: helpRequestSchema,
  },
  { timestamps: true }
);

const User: any = conn.model('User', userSchema);

const UserTC = composeMongoose(User, {});

schemaComposer.Query.addFields({
  userById: UserTC.mongooseResolvers.findById(),
  userByIds: UserTC.mongooseResolvers.findByIds(),
  userOne: UserTC.mongooseResolvers.findOne(),
  userMany: UserTC.mongooseResolvers.findMany(),
  // userDataLoader: UserTC.mongooseResolvers.dataLoader(),
  // userDataLoaderMany: UserTC.mongooseResolvers.dataLoaderMany(),
  // userByIdLean: UserTC.mongooseResolvers.findById({ lean: true }),
  // userByIdsLean: UserTC.mongooseResolvers.findByIds({ lean: true }),
  // userOneLean: UserTC.mongooseResolvers.findOne({ lean: true }),
  // userManyLean: UserTC.mongooseResolvers.findMany({ lean: true }),
  // userDataLoaderLean: UserTC.mongooseResolvers.dataLoader({ lean: true }),
  // userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderMany({
  //   lean: true,
  // }),
  userCount: UserTC.mongooseResolvers.count(),
  // userConnection: UserTC.mongooseResolvers.connection(),
  userPagination: UserTC.mongooseResolvers.pagination(),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.mongooseResolvers.createOne(),
  // userCreateMany: UserTC.mongooseResolvers.createMany(),
  userUpdateById: UserTC.mongooseResolvers.updateById(),
  userUpdateOne: UserTC.mongooseResolvers.updateOne(),
  userUpdateMany: UserTC.mongooseResolvers.updateMany(),
  userRemoveById: UserTC.mongooseResolvers.removeById(),
  userRemoveOne: UserTC.mongooseResolvers.removeOne(),
  userRemoveMany: UserTC.mongooseResolvers.removeMany(),
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;
