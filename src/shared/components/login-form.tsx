import { cn } from "@/core/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { LockKeyhole } from "lucide-react";
import type { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import {  z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
const formSchema = z.object({
    email: z.email(),
    password: z.string()
})
export const LoginForm = ({ className, ...props }: ComponentProps<"div">) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="place-items-center">
                    <LockKeyhole size={45} />
                    <CardTitle >Acceso Administrativo</CardTitle>
                    <CardDescription className="text-center">
                        Ingresa tus credenciales dadas por el administrador para acceder al panel de administración
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">

                                <FormField control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="Ingrese su contraseña" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full">
                                        Ingresar
                                    </Button>
                                    <Link to={"/"}>
                                        Regresar
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
