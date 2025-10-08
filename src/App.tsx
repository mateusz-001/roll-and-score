import { Route, Routes } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { GamePage } from './pages/GamePage';
import { HallOfFamePage } from './pages/HallOfFamePage';
import { ResultsPage } from './pages/ResultsPage';
import { StartPage } from './pages/StartPage';
import { paths } from './routes/paths';

export default function App() {
  return (
    <main className="grid grid-cols-1 min-h-screen bg-bg text-text relative md:grid-cols-[110px_1fr] lg:grid-cols-[220px_1fr]">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Routes>
          <Route path={paths.start} element={<StartPage />} />
          <Route path={paths.game} element={<GamePage />} />
          <Route path={paths.results} element={<ResultsPage />} />
          <Route path={paths.hof} element={<HallOfFamePage />} />
        </Routes>
      </div>
    </main>
  );
}
