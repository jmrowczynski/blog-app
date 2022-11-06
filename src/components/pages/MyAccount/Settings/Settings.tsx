import EditUserForm from '../../../organisms/EditUserForm/EditUserForm';
import { useAppContext } from '../../../../context/app.context';

const Settings = () => {
    const { user } = useAppContext();

    if (!user) {
        return null;
    }

    return <EditUserForm user={user} />;
};

export default Settings;
