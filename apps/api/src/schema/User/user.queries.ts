import builder from '@/src/builder';

builder.queryFields((t) => ({
  user: t.prismaField({
    type: 'User',
    args: {
      userId: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, args, context) => {
      const user = await context.db.user.findUnique({
        ...query,
        where: { id: args.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },
  }),
  users: t.prismaConnection({
    type: 'User',
    cursor: 'id',
    resolve: (query, _parent, _args, context) =>
      context.db.user.findMany(query),
  }),
}));

builder.queryFields((t) => ({
  me: t.prismaField({
    nullable: true,
    type: 'User',
    resolve: async (query, _parent, _args, context) => {
      if (!context?.user?.id) {
        return null;
      }

      const user = await context.db.user.findUnique({
        ...query,
        where: { id: context.user.id },
      });

      return user;
    },
  }),
}));
