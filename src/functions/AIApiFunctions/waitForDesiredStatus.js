
import { toast } from 'react-toastify';
import { checkRequestStatus } from './checkRequestStatus';

export const waitForDesiredStatus = async (hash, url) => {
  let statusData;
  let attempts = 0;
  const maxAttempts = 15;

  try {
    while (attempts < maxAttempts) {
      attempts++;
      try {
        statusData = await checkRequestStatus(hash, url);
        console.log("status data", statusData);

        if (statusData.jsonObject || statusData.gapFill) {
          console.log('Desired status received:', statusData);
          break;
        }
      } catch (error) {
        console.error('Error checking status:', error);
        toast.error(`Error: We had some difficulty with the AI corrections`)
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
    }


    if (attempts >= maxAttempts) {
      toast.error(`Error: We had some difficulty with the AI corrections`)
      console.log(`Maximum attempts reached (${maxAttempts}). Exiting.`);
    }

  } catch (error) {
    console.log(error);
  }

  return statusData;
};


