import NextLink from 'next/link';

import { MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import { VenueFragment } from 'apollo/generated-types';
import CustomPopover from 'src/components/custom-popover/CustomPopover';
import Iconify from 'src/components/iconify/Iconify';
import usePopover from 'src/hooks/usePopover';

type Props = {
  venue: VenueFragment;
  onView: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function VenueCard({ venue, onView, onEdit, onDelete }: Props) {
  const popover = usePopover();

  return (
    <>
      <Card>
        <ListItemText
          sx={{
            p: (theme) => theme.spacing(2, 2.5, 2, 2.5),
          }}
          secondary={
            <Link component={NextLink} href={'TODO:'} color="inherit">
              {venue.name}
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
              label: `${venue.city}, ${venue.state}`,
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
