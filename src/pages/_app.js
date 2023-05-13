import "../styles/globals.css";
import { store } from "../reduxStore/store";
import { Provider } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
  }, [router]);

  useEffect(() => {
    // check if cart exists in local storage
    if (localStorage.getItem("cart")) {
      // get cart from local storage
      const cart = JSON.parse(localStorage.getItem("cart"));
      // set cart in redux store
      store.dispatch({
        type: "cartslice/setCartFromLocalStorage",
        payload: cart,
      });
    }
  }, []);

  const tawkMessengerRef = useRef();

  return (
    <SessionProvider>
      <Provider store={store}>
        <main>
          <TawkMessengerReact
            propertyId={process.env.NEXT_PUBLIC_PROPERTYID}
            widgetId={process.env.NEXT_PUBLIC_WIDGETID}
            ref={tawkMessengerRef}
          />
          {loading ? <Loader /> : <Component {...pageProps} />}
        </main>
      </Provider>
    </SessionProvider>
  );
}
