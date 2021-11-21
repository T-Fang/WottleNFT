import React, { useEffect, useState } from "react";

import { IonButton, IonSpinner } from "@ionic/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import wottleLogo from "../../../public/logo.png";
import { Status } from "../../features/wallet/walletSlice";
import useAuth from "../../hooks/useAuth";
import useWallet from "../../hooks/useWallet";
import { Main } from "../../templates/Main";
import { Wallet } from "../register";

interface FormData {
  password: string;
}

interface KeyboardEvent {
  key: string;
}

interface LoginData {
  wallet_id: string;
  password: string;
}

const Login = () => {
  const { isLoading, isLoggedIn, setLogin } = useAuth();
  const router = useRouter();
  const wallet = useWallet() as unknown as Wallet;
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitLoading(true);
    const loginData: LoginData = {
      wallet_id: wallet.state.address,
      password: data.password,
    };
    // console.log(loginApi);
    const response = await fetch("http://localhost:3080/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const res = await response.json();
      setLogin(res.accessToken);
      router.push("/");
    } else {
      setErrorMsg("No matching wallet ID/password combination");
    }
    setSubmitLoading(false);
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Main title="Login">
      <div className="flex flex-col items-center justify-center min-h-full bg-cover bg-background-seascape bg-primary-default">
        {isLoading ||
          (wallet.status === Status.Loading && <IonSpinner name="crescent" />)}
        {!isLoading &&
          (wallet.status === Status.NotEnabled ||
            wallet.status === Status.NoExtension) && (
            <p className="text-xl font-bold">
              Connect Nami Wallet first before logging in
            </p>
          )}
        {!isLoading && !isLoggedIn && wallet.status === Status.Enabled && (
          <div className="flex flex-col items-center p-10 bg-gray-200 border border-gray-500 border-solid rounded-md shadow-lg w-450 h-3/4">
            <Image
              src={wottleLogo}
              alt="WottleNFT logo"
              layout="fixed"
              height={150}
              width={150}
            />
            <p className="py-5 text-2xl font-bold">Sign in</p>
            <form
              className="w-full"
              onSubmit={handleSubmit(onSubmit)}
              id="loginForm"
            >
              <div>
                <p className="pl-2 font-bold">Connected wallet address</p>
                <p className="truncate">{wallet.state.address}</p>
              </div>
              <label className="pl-2 font-bold">
                Password
                <input
                  type="password"
                  className={`w-full px-3 py-2 my-2 border border-gray-400 border-solid rounded focus:outline-none focus:ring-2 ${
                    errors.password ? "ring-2 ring-red-500" : ""
                  }`}
                  placeholder="Enter password"
                  {...register("password", { required: true })}
                  onKeyDown={(e) => handleEnterKey(e)}
                />
              </label>
              <p className="text-sm text-right">
                <a>Forgot password?</a>
              </p>
              {errorMsg && (
                <p className="text-sm text-center text-red-500">{errorMsg}</p>
              )}
              <div className="flex justify-center py-5">
                {submitLoading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <IonButton
                    className="w-40 h-10 text-lg font-bold"
                    type="submit"
                  >
                    Sign in
                  </IonButton>
                )}
              </div>
            </form>
            <p>
              Not a member?{" "}
              <Link href="/register">
                <a className="font-bold underline hover:text-blue-600">
                  Create an account now!
                </a>
              </Link>
            </p>
          </div>
        )}
      </div>
    </Main>
  );
};
export default Login;
