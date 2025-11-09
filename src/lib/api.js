/**
 * Servicios API para la aplicación
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * Obtiene la información del contexto del estudiante
 * @param {string} studentId - ID del estudiante
 * @returns {Promise<Object>} Información del estudiante
 */
export async function getStudentContext(studentId) {
  if (!studentId) {
    throw new Error('Student ID is required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/contexto/${studentId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Estudiante no encontrado');
      }
      throw new Error(`Error al obtener información del estudiante: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('No se pudo conectar al servidor. Verifica que el servidor esté corriendo en http://localhost:8000');
    }
    throw error;
  }
}

/**
 * Obtiene las recomendaciones de cursos para un estudiante
 * @param {string} studentId - ID del estudiante
 * @returns {Promise<Object>} Recomendaciones de cursos
 */
export async function getRecommendations(studentId) {
  if (!studentId) {
    throw new Error('Student ID is required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/recomendar/${studentId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Estudiante no encontrado');
      }
      throw new Error(`Error al obtener recomendaciones: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('No se pudo conectar al servidor. Verifica que el servidor esté corriendo en http://localhost:8000');
    }
    throw error;
  }
}

