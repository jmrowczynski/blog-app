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
import { useAppContext } from './context/app.context';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SnackbarProvider } from 'notistack';
import { NetworkService } from './services/api/axios';

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 10 } }, // 10s
});

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
    NetworkService.setupInterceptors(useAppContext());

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                        <Routing />
                    </SnackbarProvider>
                </QueryParamProvider>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
