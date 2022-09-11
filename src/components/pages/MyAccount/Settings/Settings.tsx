import EditUserForm from '../../../organisms/EditUserForm/EditUserForm';
import { useAppContext } from '../../../../context/app.context';

const Settings = () => {
    const { user } = useAppContext();

    return <EditUserForm user={user} />;
};

export default Settings;
