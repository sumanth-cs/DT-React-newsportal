import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext"; // Import Context API

const formSchema = z.object({
  email: z.string().min({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser, signIn, loading, error } = useUser(); // Use Context API

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // async function onSubmit(values) {
  //   const success = await signIn(values); // Call signIn from context

  //   if (success) {
  //     toast({ title: "Sign in Successful!" });
  //     navigate("/");
  //   } else {
  //     toast({ title: "Sign in failed! Please try again." });
  //   }
  // // }
  const onSubmit = async (values) => {
    try {
      await signIn(values.email, values.password);
      toast("Sign in Successful!");
      navigate("/");
    } catch (error) {
      toast("Sign in failed! Please try again.");
    }
  };

  // const onSubmit = async (values) => {
  //   try {
  //     await signIn(values.email, values.password);
  //     toast("Sign in Successful!");
  //   } catch (error) {
  //     toast("Sign in failed! Please try again.");
  //   }
  // };

  // // Add useEffect to navigate after currentUser updates
  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/");
  //   }
  // }, [currentUser, navigate]);

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl sm:max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to={"/"}
            className="font-bold text-3xl sm:text-4xl flex flex-wrap"
          >
            <h1 className="text-slate-700 font-heading text-6xl">Dharm</h1>
            <h1 className="text-slate-900 font-heading text-6xl">Tantra</h1>
          </Link>

          <p className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-5 sm:pt-12">
            Sign in to your account.
          </p>

          <p className="text-slate-500 text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-2">
            Welcome to DharmTantra, Please provide your details
          </p>
        </div>

        {/* right */}
        <div className="flex-1 p-6 rounded-lg shadow-lg bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
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
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-darkYellow text-darkBrown hover:text-white w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </form>
          </Form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>

            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          {error && <p className="mt-5 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
