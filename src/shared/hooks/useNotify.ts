import { toast, type ToastContent, type ToastOptions } from "react-toastify";

export function useNotify<T>(content: ToastContent<T>, props: ToastOptions<T>) {
  const notify = () => toast(content, props);
  return { notify };
}
