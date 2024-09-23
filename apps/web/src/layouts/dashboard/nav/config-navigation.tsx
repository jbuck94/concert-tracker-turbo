import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlaceIcon from '@mui/icons-material/Place';

import { UserRole } from 'apollo/generated-types';
import { PATH_DASHBOARD } from 'src/routes/paths';

export const getNavConfig = (role: UserRole | undefined) => {
  const menuItems = [
    {
      subheader: 'General',
      items: [
        {
          title: 'My Concerts',
          path: PATH_DASHBOARD.user.concerts,
          icon: <GroupTwoToneIcon />,
        },
      ],
    },
  ];

  if (role === UserRole.Admin) {
    menuItems.push({
      subheader: 'Admin',
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
    });
  }

  return menuItems;
};
