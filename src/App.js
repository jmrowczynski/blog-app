import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routing from './routing';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { QueryParamProvider } from 'use-query-params';
import { useAppContext } from './context/app.context';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SnackbarProvider } from 'notistack';
import { NetworkService } from './services/api/axios';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';
import { globalStyles } from './globalStyles';

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 10 } }, // 10s
});

const inputGlobalStyles = <GlobalStyles styles={globalStyles} />;

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
    NetworkService.setupInterceptors({
        appContext: useAppContext(),
        navigate: useNavigate(),
        location: useLocation(),
    });

    return (
        <QueryClientProvider client={queryClient}>
            <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                    <CssBaseline />
                    {inputGlobalStyles}
                    <Routing />
                </SnackbarProvider>
            </QueryParamProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
