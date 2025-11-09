<script>
  import { onMount } from 'svelte';
  import { getUserId } from './storage.js';
  import { getStudentContext } from './api.js';
  import CourseCard from './CourseCard.svelte';

  let studentData = null;
  let loading = false;
  let error = null;
  let studentId = null;

  async function loadStudentInfo() {
    const userId = getUserId();
    
    if (!userId) {
      error = 'No se ha configurado un ID de usuario. Por favor, ve a Profile y configura tu ID.';
      studentData = null;
      loading = false;
      return;
    }

    // Si el userId no ha cambiado y ya tenemos datos, no recargar
    if (studentId === userId && studentData) {
      return;
    }

    studentId = userId;
    loading = true;
    error = null;
    studentData = null;

    try {
      const data = await getStudentContext(userId);
      studentData = data;
    } catch (err) {
      error = err.message;
      console.error('Error loading student info:', err);
      studentData = null;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadStudentInfo();
    
    // Recargar cuando cambie el userId en localStorage (cada vez que se monta)
    // También se puede recargar manualmente con el botón
  });
</script>

<div class="student-info-container">
  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Cargando información del estudiante...</p>
    </div>
  {:else if error}
    <div class="error-state">
      <h3>Error al cargar información</h3>
      <p>{error}</p>
      <button class="retry-button" on:click={loadStudentInfo}>
        Reintentar
      </button>
    </div>
  {:else if studentData}
    <div class="student-header">
      <div class="student-id-section">
        <h2 class="student-title">Información del Estudiante</h2>
        <div class="student-meta">
          <span class="meta-item">
            <strong>ID:</strong> {studentData.estudiante_id}
          </span>
          <span class="meta-item">
            <strong>Semestre:</strong> {studentData.semestre_id}
          </span>
        </div>
      </div>
      <button class="refresh-button" on:click={loadStudentInfo} title="Actualizar">
      </button>
    </div>

    <div class="courses-sections">
      <div class="courses-section">
        <h3 class="section-title">
          Cursos Cursados
          <span class="course-count">({studentData.cursos_cursados?.length || 0})</span>
        </h3>
        {#if studentData.cursos_cursados && studentData.cursos_cursados.length > 0}
          <div class="courses-grid">
            {#each studentData.cursos_cursados as course}
              <CourseCard {course} />
            {/each}
          </div>
        {:else}
          <div class="empty-state">
            <p>No hay cursos cursados registrados</p>
          </div>
        {/if}
      </div>

      <div class="courses-section">
        <h3 class="section-title">
          Cursos de Interés
          <span class="course-count">({studentData.cursos_interes?.length || 0})</span>
        </h3>
        {#if studentData.cursos_interes && studentData.cursos_interes.length > 0}
          <div class="courses-grid">
            {#each studentData.cursos_interes as course}
              <CourseCard {course} />
            {/each}
          </div>
        {:else}
          <div class="empty-state">
            <p>No hay cursos de interés registrados</p>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="empty-state">
      <p>No hay información disponible</p>
    </div>
  {/if}
</div>

<style>
  .student-info-container {
    width: 100%;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 32px;
    text-align: center;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading-state p {
    color: #64748b;
    font-size: 16px;
    margin: 0;
  }

  .error-state {
    text-align: center;
    padding: 48px 32px;
    background: #fef2f2;
    border: 2px solid #fecaca;
    border-radius: 12px;
  }

  .error-state h3 {
    font-size: 20px;
    font-weight: 600;
    color: #dc2626;
    margin: 0 0 12px 0;
  }

  .error-state p {
    color: #991b1b;
    margin: 0 0 24px 0;
    line-height: 1.6;
  }

  .retry-button {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    background: #dc2626;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .retry-button:hover {
    background: #b91c1c;
    transform: translateY(-2px);
  }

  .student-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 2px solid #e2e8f0;
  }

  .student-title {
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 16px 0;
  }

  .student-meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .meta-item {
    font-size: 14px;
    color: #64748b;
  }

  .meta-item strong {
    color: #1e293b;
    margin-right: 8px;
  }

  .refresh-button {
    width: 40px;
    height: 40px;
    border: none;
    background: #f1f5f9;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    position: relative;
  }

  .refresh-button::before {
    content: '';
    width: 18px;
    height: 18px;
    border: 2px solid #64748b;
    border-top-color: transparent;
    border-right-color: transparent;
    border-radius: 50%;
    transform: rotate(-45deg);
  }

  .refresh-button::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid #64748b;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    top: 2px;
    right: 7px;
    transform: rotate(45deg);
  }

  .refresh-button:hover {
    background: #e2e8f0;
  }

  .refresh-button:hover::before {
    border-color: #1e293b;
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(135deg);
  }

  .refresh-button:hover::after {
    border-left-color: #1e293b;
  }

  .courses-sections {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .courses-section {
    background: #f8fafc;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e2e8f0;
  }

  .section-title {
    font-size: 22px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .course-count {
    font-size: 16px;
    font-weight: 500;
    color: #64748b;
    margin-left: 4px;
  }

  .courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .empty-state {
    text-align: center;
    padding: 32px;
    color: #94a3b8;
    font-size: 14px;
    background: #ffffff;
    border-radius: 8px;
    border: 2px dashed #e2e8f0;
  }
</style>

