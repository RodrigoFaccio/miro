import AccountPage from "@/features/account/pages/AccountPage";
import AcquirersPage from "@/features/acquirers/pages/AcquirersPage";
import AuthGuard from "@/features/auth/guards/AuthGuard";
import GuestGuard from "@/features/auth/guards/GuestGuard";
import AuthLayout from "@/features/auth/layouts/AuthLayout";
import RecoverPasswordLayout from "@/features/auth/layouts/RecoverPasswordLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import NewPasswordPage from "@/features/auth/pages/NewPasswordPage";
import RecoverPasswordPage from "@/features/auth/pages/RecoverPasswordPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import NotFoundPage from "@/features/common/components/layout/NotFoundPage";
import MainLayout from "@/features/common/layouts/MainLayout";
import { CompanySettingsProvider } from "@/features/companies/contexts/CompanySettingsContext";
import CompaniesPage from "@/features/companies/pages/CompaniesPage";
import DetailsCompaniesPage from "@/features/companies/pages/DetailsCompanies";
import CustomerDetailsPage from "@/features/customers/pages/CustomerDetailsPage";
import CustomersPage from "@/features/customers/pages/CustomersPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import BankingPage from "@/features/financial/pages/BankingPage";
import GatewayRequestsPage from "@/features/gateway-requests/pages/GatewayRequestsPage";
import { OnBoardProvider } from "@/features/onboard/contexts/OnBoardContext";
import OnBoardGuard from "@/features/onboard/guards/OnBoardGuard";
import SandboxPage from "@/features/sandbox/pages/SandboxPage";
import TransactionsPage from "@/features/transactions/pages/TransactionsPage";
import AnticipationsPage from "@/features/withdrawals/pages/AnticipationsPage";
import WithdrawalsPage from "@/features/withdrawals/pages/WithdrawalsPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <OnBoardProvider>
          <MainLayout>
            <OnBoardGuard />
          </MainLayout>
        </OnBoardProvider>
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "customers",
        children: [
          {
            path: "",
            element: <CustomersPage />,
          },
          {
            path: ":id",
            element: <CustomerDetailsPage />,
          },
        ],
      },
      {
        path: "transactions",
        children: [
          {
            path: "",
            element: (
              <CompanySettingsProvider>
                <TransactionsPage />
              </CompanySettingsProvider>
            ),
          },
        ],
      },
      {
        path: "companies",
        element: (
          <CompanySettingsProvider>
            <CompaniesPage />
          </CompanySettingsProvider>
        ),
      },
      {
        path: "/company/:id",
        element: <DetailsCompaniesPage />,
        children: [
          {
            path: "",
            element: <SandboxPage />,
          },
        ],
      },
      {
        path: "acquirers",
        children: [
          {
            path: "",
            element: <AcquirersPage />,
          },
        ],
      },
      {
        path: "withdrawals",
        children: [
          {
            path: "",
            element: (
              <CompanySettingsProvider>
                <WithdrawalsPage />
              </CompanySettingsProvider>
            ),
          },
        ],
      },
      {
        path: "anticipations",
        children: [
          {
            path: "",
            element: (
              <CompanySettingsProvider>
                <AnticipationsPage />
              </CompanySettingsProvider>
            ),
          },
        ],
      },
      {
        path: "gateway-requests",
        children: [
          {
            path: "",
            element: <GatewayRequestsPage />,
          },
        ],
      },
      {
        path: "banking",
        element: <BankingPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  //DetailsCompaniesPage
  {
    path: "/sandbox",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <SandboxPage />,
      },
    ],
  },
  
  {
    path: "/auth",
    element: <GuestGuard />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "",
        element: <RecoverPasswordLayout />,
        children: [
          {
            path: "recover-password",
            element: <RecoverPasswordPage />,
          },
          {
            path: "new-password",
            element: <NewPasswordPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
