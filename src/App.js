import './App.css';
import { Button } from '@mui/material';
import MainTemplate from './templates/MainTemplate';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MainTemplate>
                <Button variant="contained">aaa</Button>
            </MainTemplate>
        </QueryClientProvider>
    );
}

export default App;
