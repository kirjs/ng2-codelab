import {response} from './response';

export const Api = {
  fetch(searchString: string) {
    return new Promise((resolve) => {
      resolve(response);
    })
  }
};
