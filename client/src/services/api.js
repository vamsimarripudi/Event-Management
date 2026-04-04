const BASE_URL = 'https://backend.vamsimarripudi.tech/api';

export const fetchWithAuth = (path) => {
  const token = localStorage.getItem('token');
  const options = {
    
    headers: {
      'Content-Type': 'application/json',   
        Authorization: `Bearer ${token}`,
    },

  }

  return fetch(BASE_URL + path, options);
  
};

export const getEvents = (query) => {
  if (query) {
    return fetchWithAuth(`/event/search?query=${encodeURIComponent(query)}`);
  }
  return fetchWithAuth('/event/events');
};

export const getEventById = (id) => fetchWithAuth(`/event/events/${id}`);

export const registerForEvent = (eventId) =>
  fetchWithAuth('/registration/register', {
    method: 'POST',
    body: JSON.stringify({ eventId }),
  });

export const cancelRegistration = (registrationId) =>
  fetchWithAuth('/registration/cancel', {
    method: 'POST',
    body: JSON.stringify({ registrationId }),
  });

export const getMyRegistrations = () => fetchWithAuth('/registration/my-events');

export const getUserDetails = () => {
  // placeholder - decode token or fetch user if endpoint exists
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};
