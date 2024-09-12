import { toast, type ToastContent, type ToastOptions } from "react-toastify";

export function useNotify() {
  const notify = <T>(content: ToastContent<T>, props: ToastOptions<T>) =>
    toast(content, { theme: "dark", hideProgressBar: true, ...props });
  return { notify };
}
