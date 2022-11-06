import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/app.context';
import { useSinglePostQuery } from '../services/api/hooks/useSinglePostQuery';

export const useCanEditPost = ({ enable }: { enable?: boolean }) => {
    const { slug } = useParams();
    const { user, isAdmin } = useAppContext();
    const isEnabled = !!slug && enable;
    const { data: post, isLoading } = useSinglePostQuery(slug || '', {
        enabled: isEnabled,
    });

    const userId = user && user.id;

    if (!isLoading && userId && post && isEnabled) {
        return {
            canEdit: post?.data.user.id === userId || isAdmin,
            isLoading,
        };
    }

    return { canEdit: undefined, isLoading };
};
