
// auth
export const SIGNIN = '/signin'
export const REGISTER = '/register'
// events
export const EVENTS = '/events'
export const EVENTS_ID = (id) => `/events/${id}`
// guests
export const EVENTS_EVENTID_GUESTS = (eventId) =>`/events/${eventId}/guests`
export const EVENTS_EVENTID_GUESTS_ID = (eventId,id) => `/events/${eventId}/guests/${id}`
// tasks
export const EVENTS_EVENTID_TASKS = (eventId) =>`/events/${eventId}/tasks`
export const EVENTS_EVENTID_TASKS_ID = (eventId,id) => `/events/${eventId}/tasks/${id}`
// securityMeasures
export const SECURITYMEASURES = '/securitymeasures'
export const SECURITYMEASURES_ID = (id) => `/securitymeasures/${id}`
// event securityMeasures
export const EVENTS_EVENTID_SECURITYMEASURES = (eventId,id) => `/events/${eventId}/securitymeasures`
export const EVENTS_EVENTID_SECURITYMEASURES_ID = (eventId,id) => `/events/${eventId}/securitymeasures/${id}`
// category
export const CATEGORIES = '/categories'
export const CATEGORIES_ID = (id) => `/categories/${id}`
// users
export const USERS = '/users'
export const USERS_ID = (id) => `/users/${id}`
export const USERS_BY_TOKEN = '/users/by-token'
export const USERS_ID_CLEAN = (id) =>`/users/${id}/clean`
