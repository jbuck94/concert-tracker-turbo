// hooks
import CustomAvatar from 'src/components/custom-avatar/CustomAvatar';
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
import { CustomAvatarProps } from 'src/components/custom-avatar/types';

// import Avatar, { Props as AvatarProps } from './Avatar';

export default function MyAvatar({ ...other }: CustomAvatarProps) {
  const { user } = useAuth();

  return (
    <CustomAvatar
      src={user?.profileImage || ''}
      alt={user?.name || ''}
      color={
        user?.profileImage ? 'default' : createAvatar(user?.name || '').color
      }
      {...other}
    >
      {createAvatar(user?.name || '').name}
    </CustomAvatar>
  );
}
