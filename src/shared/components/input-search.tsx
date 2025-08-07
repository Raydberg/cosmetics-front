import { Fragment } from "react/jsx-runtime"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


const formSchema = z.object({
    input: z.string().optional()
})

export const InputSearch = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <Fragment>

            <Form {...form} >
                <form onChange={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    htmlFor="default-search"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only 
                            dark:text-white">
                                    Buscar
                                </FormLabel>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <Search size={20} />
                                    </div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="search" id="default-search" className="
                    block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
                    rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Buscar productos..." required />
                                    </FormControl>
                                    {/* <FormMessage  /> */}
                                    <Button type="submit"
                                        className="
                        text-white absolute end-2.5 bottom-2.5
                         bg-blue-700 hover:bg-blue-800 
                         focus:ring-4 focus:outline-none 
                         focus:ring-blue-300 font-medium 
                         rounded-lg text-sm px-4 py-2 dark:bg-blue-600 
                         dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Buscar
                                    </Button>
                                </div>

                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            {/* <form onChange={handleSearch} className="max-w-md mx-auto">
                <Label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</Label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Search size={20} />
                    </div>
                    <Input
                     type="search" id="default-search" className="
                    block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
                    rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar productos..." required />
                    <Button type="submit"
                        className="
                        text-white absolute end-2.5 bottom-2.5
                         bg-blue-700 hover:bg-blue-800 
                         focus:ring-4 focus:outline-none 
                         focus:ring-blue-300 font-medium 
                         rounded-lg text-sm px-4 py-2 dark:bg-blue-600 
                         dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Buscar
                    </Button>
                </div>
            </form> */}
        </Fragment>
    )
}
