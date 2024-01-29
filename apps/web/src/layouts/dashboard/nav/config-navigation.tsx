import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlaceIcon from '@mui/icons-material/Place';
import { PATH_DASHBOARD } from 'src/routes/paths';

const navConfig = [
  {
    subheader: 'general',
    items: [
      {
        title: 'artists',
        path: PATH_DASHBOARD.artist.root,
        icon: <MusicNoteIcon />,
      },
      {
        title: 'concerts',
        path: PATH_DASHBOARD.concert.root,
        icon: <GroupTwoToneIcon />,
      },
      {
        title: 'venues',
        path: PATH_DASHBOARD.venue.root,
        icon: <PlaceIcon />,
      },
    ],
  },
];

export default navConfig;
