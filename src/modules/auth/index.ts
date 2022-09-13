import { createModule } from "@app/core/modules";
import meRouter from "./routes/me.route";
import authRouter from "./routes/auth.route";

export default createModule({
  name: 'auth',
  routers: [
    meRouter,
    authRouter,
  ]
})