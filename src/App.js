import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routing from './routing';
import { BrowserRouter as Router } from 'react-router-dom';
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routing />
            </Router>
        </QueryClientProvider>
    );
}

export default App;
