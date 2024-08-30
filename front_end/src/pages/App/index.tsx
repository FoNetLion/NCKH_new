import React, {Suspense, FC} from 'react'
import MainLayout from './subcomponents/MainLayout'
import ErrorBoundary from './subcomponents/ErrorBoundary'
import { Route, Routes } from 'react-router-dom'
import publicRoutes from '../../routes/route.public'
import authRoutes from '../../routes/route.auth'

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        {publicRoutes.map(({ path, element }) => {
          const Element: FC = element;
          return (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={null}>
                  <Element />
                </Suspense>
              }
            />
          );
        })}
        <Route element={<MainLayout />}>
          {authRoutes.map(({ path, element }) => {
            const Element: FC = element;
            return (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={null}>
                    <Element />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App