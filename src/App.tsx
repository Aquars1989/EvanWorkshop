import "./App.css";
import React, { useState } from "react";
import TopBar from "./pages/TopBar";
import { Outlet } from "react-router-dom";
import GuestProvider from "./provider/guest-provider";
import { IntlProvider } from "react-intl";
import en from "./i18n/en";
import zh from "./i18n/zh";

function App() {
  const [locale, setLocale] = useState(navigator.language);
  let messages;

  if (locale.includes("zh")) {
    messages = zh;
  } else {
    messages = en;
  }

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      defaultLocale="en"
      messages={messages}
    >
      <GuestProvider>
        <TopBar locale={locale} setLocale={setLocale} />
        <main className="bg-gray-300">
          <div
            id="myCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <Outlet />
          </div>
        </main>
      </GuestProvider>
    </IntlProvider>
  );
}

export default App;
