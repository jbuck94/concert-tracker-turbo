import builder from 'src/builder';

export * from '@/src/schema/Scalars';
export * from '@/src/schema/Filters';
export * from '@/src/schema/Error';
export * from '@/src/schema/Artist';
export * from '@/src/schema/Event';
export * from '@/src/schema/EventArtist';
export * from '@/src/schema/Scalars';
export * from '@/src/schema/User';
export * from '@/src/schema/UserEvent';
export * from '@/src/schema/Venue';

export const schema = builder.toSchema();
