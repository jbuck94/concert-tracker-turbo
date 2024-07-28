import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { EventFragment } from 'apollo-hooks';
import { format } from 'date-fns';

type ConcertsTableProps = {
  events: EventFragment[];
};

export const ConcertsTable = ({ events }: ConcertsTableProps) => {
  const getArtistnNames = (event: EventFragment): string => {
    return event.artists.edges
      .map((edge) => edge?.node.artist.name)
      .sort()
      .join(', ');
  };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Artists</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events?.map((event) => (
            <TableRow hover key={event.id}>
              <TableCell>{getArtistnNames(event)}</TableCell>
              <TableCell>{event.venue.name}</TableCell>
              <TableCell>{format(event.date, 'MM/dd/yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
