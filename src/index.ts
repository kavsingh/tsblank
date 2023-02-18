import App from "~/app";

const appRoot = document.getElementById("app-root");

if (!appRoot) throw new Error("Could not find root element #app-root");

App(appRoot);
