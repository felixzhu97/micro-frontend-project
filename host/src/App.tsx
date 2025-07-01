import React, { useEffect, Suspense, startTransition } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useThemeStore } from "./stores/useThemeStore";
import Button from "./components/shared/Button";
import Card from "./components/shared/Card";
import LanguageSwitcher from "./components/shared/LanguageSwitcher";
import ChatInterface from "./components/shared/ChatInterface";
import { performanceMonitor } from "./utils/performance";
import LoadingSpinner from "./components/shared/LoadingSpinner";

const RemoteButton = React.lazy(() => import("remote/Button"));
const RemoteTodoList = React.lazy(() => import("remote/TodoList"));
const RemoteCounter = React.lazy(() => import("remote/Counter"));
const RemoteChatAssistant = React.lazy(() => import("remote/ChatAssistant"));

const AppContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const HeaderControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Navigation = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  list-style: none;
  padding: 0;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}22`};
  }
`;

const LoadingFallback = () => (
  <Card variant="outlined">
    <LoadingSpinner />
  </Card>
);

const App: React.FC = () => {
  const { toggleTheme } = useThemeStore();
  const { t } = useTranslation();

  useEffect(() => {
    // 监控组件加载性能
    performanceMonitor.startMark("AppMount");
    return () => {
      performanceMonitor.endMark("AppMount");
    };
  }, []);

  const handleThemeToggle = () => {
    startTransition(() => {
      performanceMonitor.startMark("ThemeToggle");
      toggleTheme();
      performanceMonitor.endMark("ThemeToggle");
    });
  };

  return (
    <Router>
      <AppContainer>
        <Header>
          <h1>{t("app.title")}</h1>
          <HeaderControls>
            <LanguageSwitcher />
            <Button variant="secondary" onClick={handleThemeToggle}>
              {t("app.theme.toggle")}
            </Button>
          </HeaderControls>
        </Header>

        <Navigation>
          <NavList>
            <li>
              <NavLink to="/">{t("app.nav.home")}</NavLink>
            </li>
            <li>
              <NavLink to="/chat">{t("app.nav.chat")}</NavLink>
            </li>
            <li>
              <NavLink to="/todo">{t("app.nav.todo")}</NavLink>
            </li>
            <li>
              <NavLink to="/counter">{t("app.nav.counter")}</NavLink>
            </li>
            <li>
              <NavLink to="/remote-chat">{t("app.nav.remoteChat")}</NavLink>
            </li>
          </NavList>
        </Navigation>

        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Card title={t("app.welcome")}>
                    <RemoteButton />
                  </Card>
                </Suspense>
              }
            />
            <Route
              path="/chat"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Card title={t("chat.title")}>
                    <ChatInterface />
                  </Card>
                </Suspense>
              }
            />
            <Route
              path="/todo"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Card title={t("todo.title")}>
                    <RemoteTodoList />
                  </Card>
                </Suspense>
              }
            />
            <Route
              path="/counter"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Card title={t("counter.title")}>
                    <RemoteCounter />
                  </Card>
                </Suspense>
              }
            />
            <Route
              path="/remote-chat"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Card title={t("remoteChat.title")}>
                    <RemoteChatAssistant />
                  </Card>
                </Suspense>
              }
            />
          </Routes>
        </Suspense>
      </AppContainer>
    </Router>
  );
};

export default App;
