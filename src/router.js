import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import BasicRoute from "./Component/root/BasicRoute";
import HomePage from "./Pages/HomePage/HomePage";
import AuthorHomePage from "./Pages/AuthorDashboard/AuthorHomePage/AuthorHomePage";
import PrivateRoute from "./Component/Shared/PrivateRoute/PrivateRoute";
import AddAdmin from "./Pages/TractChair/AddAdmin/AddAdmin";
import Services from "./Component/AuthorComponent/AuthorHistory/Services/Services";
import ImportantDates from "./Pages/ImportantDate/ImportantDates";
import Contact from "./Pages/Contact/Contact";
import LogIn from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import TractChairHomePage from "./Pages/TractChair/TractChairHomePage/TractChairHomePage";
import TractPrivateRoute from "./Component/Shared/TractPrivateRoute/TractPrivateRoute";
import TractRoot from "./Component/root/tractRoot";
import AdminPrivetRoute from "./Component/Shared/AdminPrivetRoute/AdminPrivetRoute";
import AdminOutlet from "./Component/root/AdminOutlet";
import AdminHomePage from "./Pages/AdminDashboard/AdminHomePage/AdminHomePage";
import ReviewerHomePage from "./Pages/ReviewerDashboard/ReviewerHomePage/ReviewerHomePage";
import ReviewerOutlet from "./Component/root/ReviewerOutlet";
import AddReviewer from "./Pages/TractChair/AddReviewer/AddReviewer";
import ReviewerPrivetRoute from "./Component/Shared/ReviewerPrivetRoute/ReviewerPrivetRoute";
import SubmitPaperForm from "./Pages/AuthorDashboard/SubmitPaperForm/SubmitPaperForm";
import AuthorInfoForSubmission from "./Component/AuthorComponent/AuthorSubmitForm/AuthorInfoForSubmission";
import RequestForReviewer from "./Pages/AuthorDashboard/RequestForReviewer/RequestForReviewer";
import AuthorOutlet from "./Component/root/AuthorOutlet";
import AddReview from "./Pages/ReviewerDashboard/AddReview/AddReview";
import ManageReviewer from "./Pages/TractChair/ManageRevieweer/ManageRevieweer";
import ManageAdmin from "./Pages/TractChair/ManageAdmin/ManageAdmin";
import CustomizeHomePage from "./Pages/AdminDashboard/CustomizeHomePage/CustomizeHomePage";
import UpdateConferenceDate from "./Pages/AdminDashboard/UpdateConferenceDate/UpdateConferenceDate";
import AssignPaperToReviewer from "./Pages/TractChair/AssignPaperToReviewer/AssignPaperToReviewer";
import ManageCommittee from "./Pages/TractChair/ManageCommittee/ManageCommittee";
import UpdateCommittee from "./Pages/TractChair/UpdateCommittee/CommitteeComponent";
import DisplayCommittee from "./Pages/DisplayCommittee/DisplayCommittee";
import ShowReview from "./Pages/ReviewerDashboard/ShowReview/ShowReview";
import SubmissionGuideline from "./Pages/SubmissionGuideline/SubmissionGuideline";
import AcceptedPaper from "./Pages/AcceptedPaper/AcceptedPaper";
import Registration from "./Pages/Registration/Registration";
import Speakers from "./Pages/Speakers/Speakers";
import AddSpeaker from "./Pages/TractChair/AddSpeaker/AddSpeaker";
import RemoveSpeaker from "./Pages/TractChair/RemoveSpeaker/RemoveSpeaker";
import RemoveCommittee from "./Pages/TractChair/RemoveCommitte/RemoveCommitte";
import UpdateSubmission from "./Pages/AdminDashboard/UpdateSubmission/UpdateSubmission";
import UpdatePaper from "./Pages/AdminDashboard/UpdatePaper/UpdatePaper";
import RegistrationFees from "./Pages/AdminDashboard/RegistrationFees/RegistrationFees";
import RegistrationProcess from "./Pages/AdminDashboard/RegistrationProcess/RegistrationProcess";
import ThankYou from "./Pages/ThankYou/ThankYou";
import UnapprovedReviewersList from "./Pages/AdminDashboard/UnapprovedReviewersList/UnapprovedReviewersList";
import ReviewersList from "./Pages/AdminDashboard/ReviewersList/ReviewersList";
import AddReviewerManually from "./Pages/AdminDashboard/AddReviewerManually/AddReviewer";
import NotFound from "./Pages/NotFound/NotFound";
import Unauthorized from "./Pages/Unauthorizeds/Unauthorized ";
import AdminLoginPage from "./Pages/AdminDashboard/AdminLoginPage/AdminLoginPage";
import RequestReviewers from "./Pages/AdminDashboard/RequestReviewers/RequestReviewers";
import CustomizeSubmissionDomain from "./Pages/AdminDashboard/CustomizeSubmissionDomain/CustomizeSubmissionDomain";
import ReviewerReviewPaper from "./Pages/ReviewerDashboard/ReviewerReviewPaper/ReviewerReviewPaper";
import AuthorShowReview from "./Pages/AuthorDashboard/AuthorShowReview/AuthorShowReview";

import AddVenue from "./Pages/AdminDashboard/AddVenue/AddVenue";
import RemoveVenue from "./Pages/AdminDashboard/RemoveVenue/RemoveVenue";
import AddAccomodation from "./Pages/AdminDashboard/AddAccomodation/AddAccomodation";
import RemoveAccomodation from "./Pages/AdminDashboard/RemoveAccomodation/RemoveAccomodation";
import AddTourist from "./Pages/AdminDashboard/AddTourist/AddTourist";
import RemoveTourist from "./Pages/AdminDashboard/RemoveTourist/RemoveTourist";
import VenueDetails from "./Pages/VenuDetails/VenuDetails";
import VenuAccomodation from "./Pages/VenuAccomodation/VenuAccomodation";
import TouristPlace from "./Pages/TouristPlace/TouristPlace";
import PaperDetails from "./Pages/AdminDashboard/PaperDetails/PaperDetails";
import AddSchedule from "./Pages/AdminDashboard/AddSchedule/AddSchedule";
import RemoveSchedule from "./Pages/AdminDashboard/RemoveSchedule/RemoveSchedule";
import Schedules from "./Pages/Schedules/Schedules";

const RouteJSX = (
  <Route path="/" element={<BasicRoute />}>
    <Route
      index
      element={<HomePage />}
      loader={async ({ request }) =>
        fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1`, {
          signal: request.signal,
        })
      }
    />
    <Route
      path="dates"
      element={<ImportantDates />}
      loader={async ({ request }) =>
        fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/get-date`, {
          signal: request.signal,
        })
      }
    />
    <Route path="admin-login-page" element={<AdminLoginPage />} />
    <Route path="contact" element={<Contact />} />
    <Route path="accepted-paper" element={<AcceptedPaper />} />
    <Route path="submission-guideline" element={<SubmissionGuideline />} />
    <Route path="registration" element={<Registration />} />
    <Route path="speakers" element={<Speakers />} />

    <Route path="venu-details" element={<VenueDetails />} />
    <Route path="venue-accomodations" element={<VenuAccomodation />} />
    <Route path="tourist-place" element={<TouristPlace />} />
    <Route path="schedules" element={<Schedules />} />

    <Route path="login" element={<LogIn />} />
    <Route path="sign-up" element={<SignUp />} />
    <Route path="thank-you" element={<ThankYou />} />
    <Route
      path="committee"
      element={<DisplayCommittee />}
      loader={async ({ request }) =>
        fetch(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/create-committee`,
          {
            signal: request.signal,
          }
        )
      }
    />
    <Route path="author" element={<AuthorOutlet />}>
      <Route
        index
        element={
          <PrivateRoute allowedRoles={["author"]}>
            <AuthorHomePage />
          </PrivateRoute>
        }
      />

      <Route
        path="reviewer-qualification"
        element={
          <PrivateRoute allowedRoles={["author"]}>
            <RequestForReviewer />
          </PrivateRoute>
        }
      // loader={async ({ request }) =>
      //   fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/reviewer`, {
      //     signal: request.signal,
      //   })
      // }
      />

      <Route path="submit-paper" element={<SubmitPaperForm />} />
      <Route path="author-form" element={<AuthorInfoForSubmission />} />
      <Route
        path="history"
        element={
          <PrivateRoute allowedRoles={["author"]}>
            <Services />
          </PrivateRoute>
        }
      />
      <Route
        path="show-review"
        element={
          <PrivateRoute allowedRoles={["author"]}>
            <AuthorShowReview />
          </PrivateRoute>
        }
      />
    </Route>

    <Route path="admin" element={<AdminOutlet />}>
      <Route
        path="dashboard"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminHomePage />
          </PrivateRoute>
        }
      />

      <Route
        path="paper-details/:paperId" // Note: No leading "/" for nested path
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <PaperDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="customize-homepage"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <CustomizeHomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="customize-date"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <UpdateConferenceDate />
          </PrivateRoute>
        }
      />
      <Route
        path="customize-submission"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <UpdateSubmission />
          </PrivateRoute>
        }
      />
      <Route
        path="customize-submission-domain"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <CustomizeSubmissionDomain />
          </PrivateRoute>
        }
      />
      <Route
        path="customize-paper"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <UpdatePaper />
          </PrivateRoute>
        }
      />

      <Route
        path="manage-committee"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <ManageCommittee />
          </PrivateRoute>
        }
      />
      <Route
        path="speaker"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AddSpeaker />
          </PrivateRoute>
        }
      />
      <Route
        path="remove/speaker"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <RemoveSpeaker />
          </PrivateRoute>
        }
      />
       <Route
        path="add-schedule"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AddSchedule />
          </PrivateRoute>
        }
      />

      <Route
        path="remove-schedule"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <RemoveSchedule />
          </PrivateRoute>
        }
      />
     
      <Route
        path="registration-fees"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <RegistrationFees />
          </PrivateRoute>
        }
      />
      <Route
        path="registration-process"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <RegistrationProcess />
          </PrivateRoute>
        }
      />
      <Route
        path="update-committee"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <UpdateCommittee />
          </PrivateRoute>
        }
        loader={async ({ request }) =>
          fetch(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/create-committee`,
            {
              signal: request.signal,
            }
          )
        }
      />

      <Route
        path="request-reviewer"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <RequestReviewers />
          </PrivateRoute>
        }
      />
      <Route
        path="remove-committee"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <RemoveCommittee />
          </PrivateRoute>
        }
        loader={async ({ request }) =>
          fetch(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/create-committee`,
            {
              signal: request.signal,
            }
          )
        }
      />
      <Route
        path="unapproved-reviewers-list"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <UnapprovedReviewersList />
          </PrivateRoute>
        }
      />
      <Route
        path="reviewers-list"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <ReviewersList />
          </PrivateRoute>
        }
      />
      <Route
        path="add-reviewer-manually"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AddReviewerManually />
          </PrivateRoute>
        }
      />
      <Route
        path="accept-reviewer"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <UnapprovedReviewersList />
          </PrivateRoute>
        }
      />
      <Route
        path="reviewer-list"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <ReviewersList />
          </PrivateRoute>
        }
      />
      {/* Venue route start here */}
      <Route
        path="add-venue"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AddVenue />
          </PrivateRoute>
        }
      />
      <Route
        path="remove-venue"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <RemoveVenue />
          </PrivateRoute>
        }
      />
      <Route
        path="add-accomodation"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AddAccomodation />
          </PrivateRoute>
        }
      />
      <Route
        path="remove-accomodation"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <RemoveAccomodation />
          </PrivateRoute>
        }
      />
      <Route
        path="add-tourist"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AddTourist />
          </PrivateRoute>
        }
      />
      <Route
        path="remove-tourist"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <RemoveTourist />
          </PrivateRoute>
        }
      />
    </Route>

    <Route path="reviewer" element={<ReviewerOutlet />}>
      <Route
        index
        element={
          <PrivateRoute allowedRoles={["reviewer"]}>
            <ReviewerHomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="review-papers"
        element={
          <PrivateRoute allowedRoles={["reviewer"]}>
            <ReviewerReviewPaper />
          </PrivateRoute>
        }
      />

      <Route
        path="submit-paper"
        element={
          <PrivateRoute allowedRoles={["reviewer"]}>
            <SubmitPaperForm />
          </PrivateRoute>
        }
      />
      <Route
        path="show-review"
        element={
          <PrivateRoute allowedRoles={["reviewer"]}>
            <ShowReview />
          </PrivateRoute>
        }
      />
      <Route
        path="add-review"
        element={
          <PrivateRoute allowedRoles={["reviewer"]}>
            <AddReview />
          </PrivateRoute>
        }
      />
    </Route>

    <Route path="tract-chair" element={<TractRoot />}>
      <Route
        index
        element={
          <PrivateRoute allowedRoles={["tract-chair"]}>
            <TractChairHomePage />
          </PrivateRoute>
        }
        loader={async ({ request }) =>
          fetch(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit?page=1`,
            {
              signal: request.signal,
            }
          )
        }
      />
      <Route
        path="manage-reviewer"
        element={
          <PrivateRoute allowedRoles={["tract-chair"]}>
            <ManageReviewer />
          </PrivateRoute>
        }
        loader={async ({ request }) =>
          fetch(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/reviewer/selected-reviewer-list`,
            {
              signal: request.signal,
            }
          )
        }
      />
      <Route
        path="assign-paper-to-reviewer"
        element={
          <PrivateRoute allowedRoles={["tract-chair"]}>
            <AssignPaperToReviewer />
          </PrivateRoute>
        }
        loader={async ({ request }) =>
          fetch(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/reviewer/selected-reviewer-list`,
            {
              signal: request.signal,
            }
          )
        }
      />
      <Route
        path="add-admin"
        element={
          <PrivateRoute allowedRoles={["tract-chair"]}>
            <AddAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="add-reviewer"
        element={
          <PrivateRoute allowedRoles={["tract-chair"]}>
            <AddReviewer />
          </PrivateRoute>
        }
      />
      <Route
        path="manage-admin"
        element={
          <PrivateRoute allowedRoles={["tract-chair"]}>
            <ManageAdmin />
          </PrivateRoute>
        }
        loader={async ({ request }) =>
          fetch(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/admin-list`,
            {
              signal: request.signal,
            }
          )
        }
      />
    </Route>

    <Route path="unauthorized" element={<Unauthorized />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);
const routes = createRoutesFromElements(RouteJSX);
const router = createBrowserRouter(routes);
export default router;
