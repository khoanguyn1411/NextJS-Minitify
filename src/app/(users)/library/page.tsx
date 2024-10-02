import { validateRequest } from "@/shared/services/authService";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return <h1>User musics page!</h1>;
  }
}
