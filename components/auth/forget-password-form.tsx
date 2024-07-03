'use client';

import { CardWrapper } from './card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@components/ui/form';
import { ResetSchema } from '@schemas';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { FormError } from '@components/form-error';
import { FormSuccess } from '@components/form-success';
import { forgetPassword } from '@actions/forget-password';
import { useState, useTransition } from 'react';

const ForgetPasswordForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSucces] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError('');
        setSucces('');
        console.log(values);
        startTransition(() => {
            forgetPassword(values)
                .then((data) => {
                    setError(data?.error);
                    setSucces(data?.success);
                })
                .catch(function (error) {
                    console.log('error from login-form.tsx', error);
                });
        });
    };

    return (
        <CardWrapper
            headerLabel="Forget Password"
            backButtonHref="/login"
            backButtonLabel="Back to login?"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="shiv.srivastava@gmail.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Send password reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default ForgetPasswordForm;
