import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

App.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function App() {
  const { replace } = useRouter();

  useEffect(() => {
    replace(PATH_DASHBOARD.user.concerts);
  }, [replace]);
}

export default App;
