import SvgColor from 'src/components/svg-color/SvgColor';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import { PATH_DASHBOARD } from 'src/routes/paths';

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  // GENERAL
  {
    subheader: 'general',
    items: [
      {
        title: 'app',
        path: PATH_DASHBOARD.general.app,
        icon: <GroupTwoToneIcon />,
      },
    ],
  },
];

export default navConfig;
