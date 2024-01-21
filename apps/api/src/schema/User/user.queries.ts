import builder from '@/src/builder';
import db from '@/src/db';

builder.queryFields((t) => ({
  user: t.prismaField({
    type: 'User',
    args: {
      userId: t.arg.int({ required: true }),
    },
    resolve: async (query, _, args) => {
      const user = await db.user.findUnique({
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
    resolve: (query) => db.user.findMany(query),
  }),
}));
