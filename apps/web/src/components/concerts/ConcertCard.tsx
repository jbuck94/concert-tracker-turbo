import NextLink from 'next/link';

import { MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import { EventFragment } from 'apollo/generated-types';
import CustomPopover from 'src/components/custom-popover/CustomPopover';
import Iconify from 'src/components/iconify/Iconify';
import Image from 'src/components/image/Image';
import usePopover from 'src/hooks/usePopover';
import { fDate } from 'src/utils/formatTime';

type Props = {
  event: EventFragment;
  onView: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function ConcertCard({
  event,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const popover = usePopover();

  const name = event.name;

  const images = event.artists.edges.flatMap(
    (artist) => artist?.node.artist.image
  );

  const artists = event.artists.edges.map((artist) => artist?.node.artist.name);

  const destination = `${event.venue.name} (${event.venue.city}, ${event.venue.state})`;

  const [coverImage, ...rest] = images;

  return (
    <>
      <Card>
        <Stack
          spacing={0.5}
          direction="row"
          sx={{
            p: (theme) => theme.spacing(1, 1, 0, 1),
          }}
        >
          {coverImage && (
            // <CardActionArea href={PATH_DASHBOARD.root}>
            <Stack flexGrow={1} sx={{ position: 'relative' }}>
              <Image
                alt={coverImage}
                src={coverImage}
                ratio="16/9"
                sx={{ borderRadius: 1, height: 1, width: 1 }}
              />
            </Stack>
            // </CardActionArea>
          )}
          {/* <Stack spacing={0.5}>
            {rest.map(
              (image, index) =>
                image &&
                index <= 2 && (
                  <Image
                    alt={image}
                    src={image}
                    ratio="1/1"
                    sx={{ borderRadius: 1, width: 80 }}
                  />
                )
            )}
          </Stack> */}
        </Stack>

        <ListItemText
          sx={{
            p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
          }}
          // primary={`Posted date: ${fDateTime(createdAt)}`}
          secondary={
            <Link component={NextLink} href={'TODO:'} color="inherit">
              {name}
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

          {[
            {
              label: artists.join(', '),
              icon: (
                <Iconify
                  icon="solar:users-group-rounded-bold"
                  sx={{ color: 'primary.main' }}
                />
              ),
            },
            {
              label: fDate(event.date),
              icon: (
                <Iconify
                  icon="solar:clock-circle-bold"
                  sx={{ color: 'info.main' }}
                />
              ),
            },
            {
              label: destination,
              icon: (
                <Iconify
                  icon="mingcute:location-fill"
                  sx={{ color: 'error.main' }}
                />
              ),
            },
          ].map((item) => (
            <Stack
              key={item.label}
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2' }}
            >
              {item.icon}
              {item.label}
            </Stack>
          ))}
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
