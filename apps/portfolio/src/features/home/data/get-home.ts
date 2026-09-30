import { sdk } from "@/sdk";
import { sanitizeHome } from "./sanitize-home";

export const getHome = async () => {
  const home = await sdk.findGlobal({
    slug: "home",
    depth: 1,
  });

  return sanitizeHome(home);
};
