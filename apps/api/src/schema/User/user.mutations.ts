import builder from '@/src/builder';

builder.mutationFields((t) => ({
  signUp: t.prismaField({
    type: 'User',
    args: {
      email: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
      avatar: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, context) => {
      const user = await context.db.user.findFirst({
        ...query,
        where: {
          email: args.email,
        },
      });

      if (user) {
        return user;
      }

      const newUser = await context.db.user.create({
        data: args,
      });

      return newUser;
    },
  }),
}));
