"use client"

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form"
import { RegisterSchema } from "@schemas"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { FormError } from "@components/form-error"
import { FormSuccess } from "@components/form-success"
import { Register } from "@actions/register"
import { useState, useTransition } from "react"

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSucces] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // if you don't want to use server actions,you can do axios.post)()
    // axios.post("/your-api", values)
      // .then()
      // .then()
      setError("")
      setSucces("")

      startTransition(() => {
        Register(values)
          .then((data) => {
            setError(data.error)
            setSucces(data.success)
          });
      })
    
  };

  return (
    <CardWrapper 
        headerLabel="Create an account"
        backButtonHref="/login"
        backButtonLabel="Already have an account?"
        showSocial >
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6">
                <div className="space-y-4">
                  <FormField 
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            disabled={isPending}
                            placeholder="Shiv Srivastava"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}  
                  />
                  <FormField 
                    control={form.control}
                    name="email"
                    render={({field}) => (
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
                  <FormField 
                    control={form.control}
                    name="password"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}  
                  />
                </div>
                {/* {error && <FormError message="Something Went Wrong!" /> }
                {success && <FormSuccess message="Email sent successfully." />} */}
                <FormError message={error} />
                <FormSuccess message= {success} />
                <Button type="submit" className="w-full" disabled={isPending}>
                  Register
                </Button>
            </form>
          </Form>
    </CardWrapper>
  )
}

export default RegisterForm