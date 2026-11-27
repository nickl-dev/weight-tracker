export interface User {
  email: string;
  avatarUrl?: string;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`/api/auth/${path}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong");
  return data.user;
}

export const api = {
  me: () => request<User>("GET", "me"),
  login: (email: string, password: string) =>
    request<User>("POST", "login", { email, password }),
  register: (email: string, password: string) =>
    request<User>("POST", "register", { email, password }),
  logout: () => request<{ ok: true }>("POST", "logout")
};
