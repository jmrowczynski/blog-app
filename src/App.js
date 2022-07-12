import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routing from './routing';
import {
    BrowserRouter as Router,
    useNavigate,
    useLocation,
} from 'react-router-dom';
import { useMemo } from 'react';
import { QueryParamProvider } from 'use-query-params';

const queryClient = new QueryClient();

const RouteAdapter = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const adaptedHistory = useMemo(
        () => ({
            replace(location) {
                navigate(location, { replace: true, state: location.state });
            },
            push(location) {
                navigate(location, { replace: false, state: location.state });
            },
        }),
        [navigate]
    );
    return children({ history: adaptedHistory, location });
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                    <Routing />
                </QueryParamProvider>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
