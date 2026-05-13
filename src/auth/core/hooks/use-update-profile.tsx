import { useMutation } from '@tanstack/react-query';
import { updateUserProfile } from '../_requests';
import type { IChangeProfile } from '../_models';


const useUpdateProfile = () => {
    const { mutate: updateProfileMutate, isPending } = useMutation({ mutationFn: (body: IChangeProfile) => updateUserProfile(body) });

    return { updateProfileMutate, isPending };
};

export default useUpdateProfile;