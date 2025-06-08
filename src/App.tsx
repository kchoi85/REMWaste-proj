import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import SelectSkipPage from './pages/step-skip-options/SelectSkipPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <SelectSkipPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
