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

/**
 * Obtiene la lista de cursos disponibles
 * @returns {Promise<Object>} Lista de cursos
 */
export async function getCursos() {
  try {
    const response = await fetch(`${API_BASE_URL}/cursos`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener cursos: ${response.status}`);
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
 * Obtiene la lista de semestres disponibles
 * @returns {Promise<Object>} Lista de semestres
 */
export async function getSemestres() {
  try {
    const response = await fetch(`${API_BASE_URL}/semestres`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener semestres: ${response.status}`);
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
 * Agrega un curso cursado a un estudiante
 * @param {number|string} studentId - ID del estudiante
 * @param {number|string} cursoId - ID del curso
 * @returns {Promise<Object>} Respuesta de la operación
 */
export async function agregarCursoEstudiante(studentId, cursoId) {
  if (!studentId || !cursoId) {
    throw new Error('Student ID y Curso ID son requeridos');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/estudiante/${studentId}/curso/${cursoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.details || `Error al agregar curso: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('No se pudo conectar al servidor. Verifica que el servidor esté corriendo en http://localhost:8000');
    }
    throw error;
  }
}

/**
 * Agrega un curso a los intereses de un estudiante
 * @param {number|string} studentId - ID del estudiante
 * @param {number|string} cursoId - ID del curso
 * @returns {Promise<Object>} Respuesta de la operación
 */
export async function agregarInteresEstudiante(studentId, cursoId) {
  if (!studentId || !cursoId) {
    throw new Error('Student ID y Curso ID son requeridos');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/estudiante/${studentId}/interes/${cursoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.details || `Error al agregar interés: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('No se pudo conectar al servidor. Verifica que el servidor esté corriendo en http://localhost:8000');
    }
    throw error;
  }
}

/**
 * Cambia el semestre de un estudiante
 * @param {number|string} studentId - ID del estudiante
 * @param {number|string} semestreId - ID del semestre
 * @returns {Promise<Object>} Respuesta de la operación
 */
export async function cambiarSemestreEstudiante(studentId, semestreId) {
  if (!studentId || !semestreId) {
    throw new Error('Student ID y Semestre ID son requeridos');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/estudiante/${studentId}/semestre/${semestreId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.details || `Error al cambiar semestre: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('No se pudo conectar al servidor. Verifica que el servidor esté corriendo en http://localhost:8000');
    }
    throw error;
  }
}

