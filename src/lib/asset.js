/** Resolves a file in /public against Vite's base URL, so the site works at "/" or a sub-path. */
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
