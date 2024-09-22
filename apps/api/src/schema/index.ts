import builder from 'src/builder';

import 'src/schema/Scalars';
import 'src/schema/Filters';
import 'src/schema/Error';
import 'src/schema/Artist';
import 'src/schema/Event';
import 'src/schema/EventArtist';
import 'src/schema/User';
import 'src/schema/UserEvent';
import 'src/schema/Venue';

export const schema = builder.toSchema();
