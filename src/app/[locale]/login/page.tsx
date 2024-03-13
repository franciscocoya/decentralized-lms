"use client";

import React, { useState } from "react";
import BaseHeading from "@/components/heading/base-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import CustomFormMessage from "@/components/message/customformMessage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/service/authService";
import { useTranslations } from "next-intl";
import { capitalize } from "@/lib/string";

const LoginPage: React.FC = () => {
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [isLoginProcessing, setIsLoginProcessing] = useState(false);
  const form = useForm();
  
  const t = useTranslations("pages.login");
  const tC = useTranslations("components");
  const tM = useTranslations("messages");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin: SubmitHandler<FieldValues> = (data) => {
    setIsLoginProcessing(true);
    login(data.email, data.password)
    .catch((error) => {
      if (error) {
        setLoginErrorMsg("Invalid email or password");
      }
    })
    .then(() => {
      if (sessionStorage.getItem("accessToken") !== null) {
        window.location.href = `/es/profile`;
      }
    }).finally(() => {
      setIsLoginProcessing(false);
    });
  }
    

  return (
    <article className="h-full flex flex-col justify-center items-center gap-[20px]">
      <BaseHeading text={t("title")} />
      <Card className="w-[350px] border-none shadow-none flex flex-col gap-3">
        <Form {...form}>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <FormField
              control={form.control}
              name={tC("form.input.email")}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{capitalize(tC("form.input.email"))}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="ie. uoxxxx@uniovi.es"
                      {...register("email", { required: true })}
                    />
                  </FormControl>
                  {/* <FormDescription>Email</FormDescription> */}
                  {errors.email && (
                    <FormMessage>{String(errors.email.message)}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={tC("form.input.password")}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...register("password", { required: true })}
                    />
                  </FormControl>
                  {/* <FormDescription>Password</FormDescription> */}
                  {errors.password && (
                    <FormMessage>{String(errors.password.message)}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isLoginProcessing ? tM("loading") : tC("buttons.login")}
            </Button>
          </form>
        </Form>
        {loginErrorMsg && (
          <CustomFormMessage
            msg={loginErrorMsg}
            type="error"
            closeable={true}
          />
        )}
      </Card>
    </article>
  );
};

export default LoginPage;
