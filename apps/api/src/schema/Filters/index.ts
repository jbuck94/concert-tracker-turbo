import builder from '@/src/builder';

export const StringFilter = builder.prismaFilter('String', {
  ops: ['contains', 'equals', 'startsWith', 'not'],
});

export const IDFilter = builder.prismaFilter('Int', {
  ops: ['equals', 'not', 'in', 'notIn'],
});

export const DateTimeFilter = builder.prismaFilter('DateTime', {
  ops: ['equals', 'gt', 'gte', 'lt', 'lte'],
});

export const FloatFilter = builder.prismaFilter('Float', {
  ops: ['equals', 'gt', 'gte', 'lt', 'lte'],
});
