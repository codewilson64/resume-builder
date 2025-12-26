import { polarClient } from "@polar-sh/better-auth";
import { createAuthClient } from "better-auth/client";

// All Polar plugins, etc. should be attached to BetterAuth server
export const authClient = createAuthClient({ 
    plugins: [polarClient()], 
    baseURL: "http://localhost:3000"
  }); 