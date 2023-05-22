import { lazy, Suspense } from "react"

const Loadable = (Component) => (props) =>
(
    <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
    </Suspense>
)

export const LoginPage = Loadable(lazy(() => import("src/pages/LoginPage")))

export const DashboardApp = Loadable(lazy(() => import("src/pages/Dashboard/app")))