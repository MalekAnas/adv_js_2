import { API_EVENTS, dispatcher } from "../utils/apiEvents";

export const apiCall = async (url, method = 'GET') => {

  // let data = params ? params.stringify() : {};
  try{
    const response = await fetch(url, {
      method,
      mode: 'cors',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify(data)
    })
    
    return response.json();
  }
  catch(apiError) {
    dispatcher.emit(API_EVENTS.ERROR, apiError);
    console.error(apiError);
    return undefined;
  }
};
