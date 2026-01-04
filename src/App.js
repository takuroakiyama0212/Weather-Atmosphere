import { QueryClient, QueryClientProvider }
from '@tanstack/react-query';
import Home from './Pages/Home';
import Layout from './Pages/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider
client={queryClient}>
      <Layout>
        <Home />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;