import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { PostRoutes } from "../modules/post/post.route";
import { DonationsRoutes } from "../modules/donations/donations.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

export const router = Router();

const modulesRoute = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/posts",
    route: PostRoutes,
  },
  {
    path: "/donations",
    route: DonationsRoutes,
  },
  {
    path: "/payments",
    route: PaymentRoutes,
  },
];

modulesRoute.forEach((route) => {
  router.use(route.path, route.route);
});
