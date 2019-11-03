import { IGraphQLResolversType } from "../base/Root";

const resolvers: IGraphQLResolversType = {
  getItemDefinition(resolverArgs, itemDefinition) {
    return {
      id: resolverArgs.args.token,
    };
  },
};

export default resolvers;
