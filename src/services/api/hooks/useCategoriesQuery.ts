import { useQuery } from 'react-query';
import CategoriesApi from '../connections/CategoriesApi';

export const queryKey = 'categories';

export const useCategoriesQuery = () => {
    return useQuery([queryKey], () => CategoriesApi.getAll());
};
