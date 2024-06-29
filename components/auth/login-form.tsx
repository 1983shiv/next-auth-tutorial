"use client"

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form"
import { LoginSchema } from "@schemas"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { FormError } from "@components/form-error"
import { FormSuccess } from "@components/form-success"
import { Login } from "@actions/login"
import { useState, useTransition } from "react"

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSucces] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // if you don't want to use server actions,you can do axios.post)()
    // axios.post("/your-api", values)
      // .then()
      // .then()
      setError("")
      setSucces("")

      startTransition(() => {
        Login(values)
          .then((data) => {
            setError(data?.error)
            setSucces(data?.success)
          })
          .catch(function(error) { // use function keyword
            console.log("error", error);
          });
      })
    
  };

  return (
    <CardWrapper 
        headerLabel="Welcome Back"
        backButtonHref="/register"
        backButtonLabel="Don't have an account?"
        showSocial >
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6">
                <div className="space-y-4">
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
                  Login
                </Button>
            </form>
          </Form>
    </CardWrapper>
  )
}

export default LoginForm