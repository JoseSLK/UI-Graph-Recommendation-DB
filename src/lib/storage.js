/**
 * Utilidades para gestionar el almacenamiento del ID de usuario
 */

const STORAGE_KEY = 'user_id';

/**
 * Obtiene el ID de usuario guardado en localStorage
 * @returns {string|null} El ID de usuario o null si no existe
 */
export function getUserId() {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(STORAGE_KEY);
}

/**
 * Guarda el ID de usuario en localStorage
 * @param {string} userId - El ID de usuario a guardar
 */
export function setUserId(userId) {
  if (typeof window === 'undefined') {
    return;
  }
  if (userId && userId.trim()) {
    localStorage.setItem(STORAGE_KEY, userId.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Elimina el ID de usuario de localStorage
 */
export function removeUserId() {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Verifica si existe un ID de usuario guardado
 * @returns {boolean}
 */
export function hasUserId() {
  return getUserId() !== null;
}

