import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import SignInPage from '@/pages/auth/sign-in/sign-in-page';

// Studio
import StudioHomePage from '@/pages/studio/home/studio-home-page';
import BookDetailsPage from '@/pages/studio/book-details/book-details-page';

const BookReaderPageLazy = lazy(
  () =>
    import(
      /*  webpackChunkName: "book-reader-page"*/
      '@/pages/studio/book-reader/book-reader-page'
    )
);

import { ProtectedRoute } from '@/components/ui/protected-route';

import AuthLayout from '@/components/layouts/auth/auth-layout';
import StudioLayout from '@/components/layouts/studio/studio-layout';

export const AppNavigation = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/auth'
            element={
              <ProtectedRoute requireAuth={false}>
                <AuthLayout />
              </ProtectedRoute>
            }
          >
            <Route path='sign-in' element={<SignInPage />} />
            <Route index element={<Navigate to='sign-in' replace />} />
          </Route>

          <Route
            path='/studio'
            element={
              <ProtectedRoute requireAuth={false}>
                <StudioLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudioHomePage />} />
            <Route path='book-details/:slug' element={<BookDetailsPage />} />
            <Route path='book-reader/:slug' element={<BookReaderPageLazy />} />
          </Route>

          <Route path='/' element={<Navigate to='/auth/sign-in' replace />} />
          <Route path='*' element={<Navigate to='/auth/sign-in' replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
