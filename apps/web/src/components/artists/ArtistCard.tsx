import NextLink from 'next/link';

import { Chip } from '@mui/material';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import { ArtistFragment } from 'apollo/generated-types';
import CustomPopover from 'src/components/custom-popover/CustomPopover';
import Iconify from 'src/components/iconify/Iconify';
import Image from 'src/components/image/Image';
import usePopover from 'src/hooks/usePopover';

type Props = {
  artist: ArtistFragment;
  onView: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function ArtistCard({
  artist,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const popover = usePopover();

  return (
    <>
      <Card>
        {artist.image && (
          <Stack
            spacing={0.5}
            direction="row"
            sx={{
              p: (theme) => theme.spacing(1, 1, 0, 1),
            }}
          >
            <Stack flexGrow={1} sx={{ position: 'relative' }}>
              <Image
                ratio="16/9"
                alt={artist.image}
                src={artist.image}
                sx={{ borderRadius: 1, height: 1, width: 1 }}
              />
            </Stack>
          </Stack>
        )}

        <ListItemText
          sx={{
            p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
          }}
          secondary={
            <Link component={NextLink} href={'TODO:'} color="inherit">
              {artist.name}
            </Link>
          }
          primaryTypographyProps={{
            typography: 'caption',
            color: 'text.disabled',
          }}
          secondaryTypographyProps={{
            mt: 1,
            noWrap: true,
            component: 'span',
            color: 'text.primary',
            typography: 'subtitle1',
          }}
        />

        <Stack
          spacing={1.5}
          sx={{
            position: 'relative',
            p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
          }}
        >
          {/* <IconButton
            onClick={popover.onOpen}
            sx={{ position: 'absolute', bottom: 20, right: 8 }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}

          <Stack spacing={1} direction="row" alignItems="center">
            {artist.genres.slice(0, 2).map((genre) => (
              <Chip
                key={genre}
                label={`#${genre.replaceAll(' ', '-')}`}
                size="small"
                onClick={() => {}}
              />
            ))}
          </Stack>
        </Stack>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
