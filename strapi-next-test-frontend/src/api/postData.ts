import AxiosHttpClient from '@/api/axios'

export const postSubscriber = async (email: string) => {
  try {
    const url = process.env['NEXT_PUBLIC_REACT_APP_CMS_ENDPOINT'] + '/api';
    const httpClient = new AxiosHttpClient(url);

    await httpClient.post('subscribers', {
      data: {
        email: email,
      }
    });
  } catch (error) {
  }
};
