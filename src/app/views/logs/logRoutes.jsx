import { lazy } from "react";
import Loadable from "app/components/Loadable";

const SubmitForm = Loadable(lazy(() => import("./forms/SubmitForm")));
const LogHistoryTable = Loadable(lazy(() => import("./history/LogHistoryTable")));
const FeedbackTable = Loadable(lazy(() => import("./feedback/FeedbackTable")));

const logRoutes = [
  { path: "/logs/submit-form", element: <SubmitForm /> },
  { path: "/logs/log-history-table", element: <LogHistoryTable /> },
  { path: "/logs/feedback-table", element: <FeedbackTable /> }
];

export default logRoutes;
