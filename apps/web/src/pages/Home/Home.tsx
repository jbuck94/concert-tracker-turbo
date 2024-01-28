import { useListArtistsQuery } from 'apollo-hooks';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Button } from 'ui';

Home.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Home() {
  const { data, error, loading } = useListArtistsQuery();
  console.log({ data, error, loading });

  return (
    <div>
      <h1>Web</h1>
      <Button>Beep</Button>
    </div>
  );
}

export default Home;
