import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { PageTransition } from './components/PageTransition';
import { GamePage } from './pages/GamePage';
import { HallOfFamePage } from './pages/HallOfFamePage';
import { ResultsPage } from './pages/ResultsPage';
import { StartPage } from './pages/StartPage';
import { RequireGameActive, RequireNoGame } from './route-wrappers';
import { paths } from './routes/paths';

export default function App() {
  const location = useLocation();

  return (
    <main
      className="
        bg-gradient-layout [scrollbar-gutter:stable] h-dvh overflow-y-auto 
        grid grid-cols-1 min-h-screen bg-bg text-text relative md:grid-cols-[110px_1fr] lg:grid-cols-[220px_1fr]
      "
    >
      <Navigation />
      <div className="relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path={paths.start}
              element={
                <PageTransition>
                  <RequireNoGame>
                    <StartPage />
                  </RequireNoGame>
                </PageTransition>
              }
            />
            <Route
              path={paths.game}
              element={
                <PageTransition>
                  <RequireGameActive>
                    <GamePage />
                  </RequireGameActive>
                </PageTransition>
              }
            />
            <Route
              path={paths.results}
              element={
                <PageTransition>
                  <ResultsPage />
                </PageTransition>
              }
            />
            <Route
              path={paths.hof}
              element={
                <PageTransition>
                  <HallOfFamePage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </main>
  );
}
