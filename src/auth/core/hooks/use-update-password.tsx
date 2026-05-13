import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../_requests';
import type { IUpdatePasswordForm } from '../_models';


const useUpdatePassword = () => {
    const { mutate: updatePasswordMutate, isError, error, isPending, isSuccess } = useMutation({ mutationFn: (body: IUpdatePasswordForm) => changePassword(body) });

    return { updatePasswordMutate, isError, error, isPending, isSuccess };
};

export default useUpdatePassword;