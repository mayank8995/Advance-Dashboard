import apiClient from '../../../services/http-common.service';

const mockedApi = apiClient as jest.Mocked<typeof apiClient>;

mockedApi.get.mockResolvedValue({
  token: 'efdgdfogfdogfdgfd.dgwegsgfg.gsdsgsds',
  user: {
    id: '1786258116300',
    name: 'Mayank Gupta',
  },
  message: 'Logged in successfully',
});
