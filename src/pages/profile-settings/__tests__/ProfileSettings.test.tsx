import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import apiClient from '../../../services/http-common.service';
import { AuthProvider } from '../../../context/AuthContext';
import { ModalProvider } from '../../../context/ModalContext';
import { ToastContainer } from 'react-toastify';
import { LoaderFlagProvider } from '../../../context/Loadercontext';
import { MemoryRouter } from 'react-router-dom';
import ProfileSettings from '../ProfileSettings';
import { render, waitFor } from '@testing-library/react';

const mockedApi = apiClient as jest.Mocked<typeof apiClient>;

function renderPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <ToastContainer autoClose={1000} />
          <LoaderFlagProvider>
            <MemoryRouter initialEntries={['/settings']}>
              <ProfileSettings />
            </MemoryRouter>
          </LoaderFlagProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

test('Renders the Profile page', async () => {
  mockedApi.get.mockResolvedValue({
    data: {
      id: '1786258116300',
      name: 'Mayank Gupta',
      phone: '9910929381',
      email: 'test@ad.com',
      department: 'Engineering',
      designation: 'Sr. Software Engineer',
      empId: 'B/2345',
      jdate: '2026-07-13',
      wmode: 'Hybrid',
      location: 'Bengaluru Karnataka',
      image: 'data:image/jpeg;base64,/9j/4sdfsfsfdsfsdfdsfsd',
    },
  });
  const { container } = render(renderPage());

  await waitFor(() => {
    expect(container.querySelector('#phone')).toBeTruthy();
  });
});
