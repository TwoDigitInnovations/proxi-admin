import "@/styles/globals.css";
import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "@/components/loader";
import { useRouter } from "next/router";
import Layout from "@/components/layouts";

export const userContext = createContext();
export const Context = createContext();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [initial, setInitial] = useState({});
  const [open, setOpen] = useState(false);
  const [toasts, setToast] = useState({
    type: "",
    message: "",
  });


  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    setToast(toasts);
    if (!!toasts.message) {
      setTimeout(() => {
        setToast({ type: "", message: "" });
      }, 5000);
    }
  }, [toasts]);

  useEffect(() => {
    if (router.route !== "/privacy" && router.route !== "/term") {
      getUserDetail();
    }
  }, []);

  const getUserDetail = () => {
    const user = localStorage.getItem("userDetail");
    console.log("drfdtftfyfgyhftgytgfygf", user);
    if (user) {
      setUser(JSON.parse(user));
      // if (JSON.parse(user)?.id === "6450e9bef4d2cc08c2ec0431") {
      //   router.push("/festaevent");
      // } else {
      // router.push("/");
      // }
    } else {
      if (router.route !== "/login" && router.route !== "/signup") {
        router.push("/login");
      }
    }
  };

  return (
    <userContext.Provider value={[user, setUser]}>
      <Context.Provider value={[initial, setInitial]}>
        <ToastContainer />
        <Loader open={open} />

        <Layout loader={setOpen} toaster={(t) => toast(t.message)}>
          <Loader open={open} />
          <Component
            {...pageProps}
            loader={setOpen}
            toaster={(t) => toast(t.message)}
            organization={initial}
            user={user} />
        </Layout>

      </Context.Provider>
    </userContext.Provider>
  );
  // <Component {...pageProps} />;
}
