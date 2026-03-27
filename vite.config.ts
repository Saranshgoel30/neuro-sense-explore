import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const deployTarget = process.env.DEPLOY_TARGET;
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const isGitHubPagesBuild = deployTarget === "github-pages" && Boolean(repositoryName);

  return {
    base: isGitHubPagesBuild ? `/${repositoryName}/` : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
