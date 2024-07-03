'use client';

import { useCallback, useEffect, useState } from 'react';
import { CardWrapper } from './card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { userVerification } from '@actions/user-verification';
import { FormError } from '@components/form-error';
import { FormSuccess } from '@components/form-success';

const UserVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    //

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError('Missing Token');
        }
        console.log('userverificationtoken', token);
        userVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError('Something went wrong - user-verification-form');
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return (
        <CardWrapper
            headerLabel="Confirming your email"
            backButtonHref="/login"
            backButtonLabel="Back to login"
        >
            {!success && !error && (
                <div className="flex w-full items-center justify-center">
                    <BeatLoader />
                </div>
            )}

            <div className="mt-10 flex w-full items-center justify-center">
                <FormSuccess message={success} />
                {!success && <FormError message={error} />}
            </div>
        </CardWrapper>
    );
};

export default UserVerificationForm;
