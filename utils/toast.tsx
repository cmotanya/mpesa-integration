import toast, { Toaster } from "react-hot-toast";

export const AppToast = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{
      duration: 1500,
      style: { fontSize: "0.8rem", borderRadius: "10px" },
      success: {
        style: {
          background: "#2a9d8f",
          color: "#fff",
          borderWidth: "2px",
          borderColor: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#2a9d8f",
        },
      },
      error: {
        style: {
          background: "#ff4b4b",
          borderWidth: "2px",
          borderColor: "#e7000b",
          color: "#e7000b",
        },
        iconTheme: {
          primary: "#e7000b",
          secondary: "#fff",
        },
      },
    }}
  />
);

export { toast };
