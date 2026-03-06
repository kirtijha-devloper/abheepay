/**
 * Centralized storage utility for Abheepay.
 * This ensures that impersonated sessions (stored in sessionStorage) 
 * take priority over global logins (stored in localStorage), 
 * enabling independent browser tabs.
 */

const storage = {
  /**
   * Get an item, checking session storage first (for the specific tab),
   * then falling back to local storage (global login).
   */
  get: (key) => {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
  },

  /**
   * Set an item. By default, it sets to localStorage unless 'isSession' is true.
   */
  set: (key, value, isSession = false) => {
    if (isSession) {
      sessionStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  },

  /**
   * Remove an item from both.
   */
  remove: (key) => {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  },

  /**
   * Clear all (used for logout).
   */
  clear: () => {
    sessionStorage.clear();
    localStorage.clear();
  }
};

export default storage;
