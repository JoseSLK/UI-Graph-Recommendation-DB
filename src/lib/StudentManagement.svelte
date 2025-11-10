<script>
  import { onMount } from 'svelte';
  import { getUserId } from './storage.js';
  import {
    getCursos,
    getSemestres,
    agregarCursoEstudiante,
    agregarInteresEstudiante,
    cambiarSemestreEstudiante
  } from './api.js';

  let cursos = [];
  let semestres = [];
  let selectedCursoId = '';
  let selectedInteresId = '';
  let selectedSemestreId = '';
  let loadingCursos = false;
  let loadingSemestres = false;
  let loadingAgregarCurso = false;
  let loadingAgregarInteres = false;
  let loadingCambiarSemestre = false;
  let message = '';
  let messageType = ''; // 'success' or 'error'
  let studentId = null;

  onMount(() => {
    loadCursos();
    loadSemestres();
    studentId = getUserId();
  });

  async function loadCursos() {
    loadingCursos = true;
    message = '';
    try {
      const response = await getCursos();
      if (response.success && response.cursos) {
        cursos = response.cursos;
      } else {
        message = 'Error al cargar cursos';
        messageType = 'error';
      }
    } catch (error) {
      message = error.message;
      messageType = 'error';
    } finally {
      loadingCursos = false;
    }
  }

  async function loadSemestres() {
    loadingSemestres = true;
    message = '';
    try {
      const response = await getSemestres();
      if (response.success && response.semestres) {
        semestres = response.semestres;
      } else {
        message = 'Error al cargar semestres';
        messageType = 'error';
      }
    } catch (error) {
      message = error.message;
      messageType = 'error';
    } finally {
      loadingSemestres = false;
    }
  }

  async function handleAgregarCurso() {
    if (!studentId) {
      message = 'No se ha configurado un ID de usuario. Por favor, ve a Perfil y configura tu ID.';
      messageType = 'error';
      return;
    }

    if (!selectedCursoId) {
      message = 'Por favor selecciona un curso';
      messageType = 'error';
      return;
    }

    loadingAgregarCurso = true;
    message = '';
    try {
      const response = await agregarCursoEstudiante(studentId, selectedCursoId);
      if (response.success) {
        message = response.message || 'Curso agregado exitosamente';
        messageType = 'success';
        selectedCursoId = '';
      }
    } catch (error) {
      message = error.message;
      messageType = 'error';
    } finally {
      loadingAgregarCurso = false;
    }
  }

  async function handleAgregarInteres() {
    if (!studentId) {
      message = 'No se ha configurado un ID de usuario. Por favor, ve a Perfil y configura tu ID.';
      messageType = 'error';
      return;
    }

    if (!selectedInteresId) {
      message = 'Por favor selecciona un curso';
      messageType = 'error';
      return;
    }

    loadingAgregarInteres = true;
    message = '';
    try {
      const response = await agregarInteresEstudiante(studentId, selectedInteresId);
      if (response.success) {
        message = response.message || 'Curso agregado a intereses exitosamente';
        messageType = 'success';
        selectedInteresId = '';
      }
    } catch (error) {
      message = error.message;
      messageType = 'error';
    } finally {
      loadingAgregarInteres = false;
    }
  }

  async function handleCambiarSemestre() {
    if (!studentId) {
      message = 'No se ha configurado un ID de usuario. Por favor, ve a Perfil y configura tu ID.';
      messageType = 'error';
      return;
    }

    if (!selectedSemestreId) {
      message = 'Por favor selecciona un semestre';
      messageType = 'error';
      return;
    }

    loadingCambiarSemestre = true;
    message = '';
    try {
      const response = await cambiarSemestreEstudiante(studentId, selectedSemestreId);
      if (response.success) {
        message = response.message || 'Semestre actualizado exitosamente';
        messageType = 'success';
      }
    } catch (error) {
      message = error.message;
      messageType = 'error';
    } finally {
      loadingCambiarSemestre = false;
    }
  }

  function hideMessage() {
    message = '';
    messageType = '';
  }
</script>

<div class="student-management">
  {#if message}
    <div class="message" class:success={messageType === 'success'} class:error={messageType === 'error'}>
      <span>{message}</span>
      <button class="close-btn" on:click={hideMessage}>×</button>
    </div>
  {/if}

  <div class="management-section">
    <h3 class="section-title">Agregar Curso Cursado</h3>
    <div class="form-group">
      <label for="curso-select" class="label">Seleccionar Curso</label>
      <select
        id="curso-select"
        class="select"
        bind:value={selectedCursoId}
        disabled={loadingCursos || loadingAgregarCurso}
      >
        <option value="">-- Selecciona un curso --</option>
        {#each cursos as curso}
          <option value={curso.id}>{curso.nombre}</option>
        {/each}
      </select>
      {#if loadingCursos}
        <span class="loading-text">Cargando cursos...</span>
      {/if}
    </div>
    <button
      class="btn btn-primary"
      on:click={handleAgregarCurso}
      disabled={loadingAgregarCurso || !selectedCursoId}
    >
      {loadingAgregarCurso ? 'Agregando...' : 'Agregar Curso'}
    </button>
  </div>

  <div class="management-section">
    <h3 class="section-title">Agregar Curso a Intereses</h3>
    <div class="form-group">
      <label for="interes-select" class="label">Seleccionar Curso</label>
      <select
        id="interes-select"
        class="select"
        bind:value={selectedInteresId}
        disabled={loadingCursos || loadingAgregarInteres}
      >
        <option value="">-- Selecciona un curso --</option>
        {#each cursos as curso}
          <option value={curso.id}>{curso.nombre}</option>
        {/each}
      </select>
      {#if loadingCursos}
        <span class="loading-text">Cargando cursos...</span>
      {/if}
    </div>
    <button
      class="btn btn-primary"
      on:click={handleAgregarInteres}
      disabled={loadingAgregarInteres || !selectedInteresId}
    >
      {loadingAgregarInteres ? 'Agregando...' : 'Agregar a Intereses'}
    </button>
  </div>

  <div class="management-section">
    <h3 class="section-title">Cambiar Semestre</h3>
    <div class="form-group">
      <label for="semestre-select" class="label">Seleccionar Semestre</label>
      <select
        id="semestre-select"
        class="select"
        bind:value={selectedSemestreId}
        disabled={loadingSemestres || loadingCambiarSemestre}
      >
        <option value="">-- Selecciona un semestre --</option>
        {#each semestres as semestre}
          <option value={semestre.id}>Semestre {semestre.numero}</option>
        {/each}
      </select>
      {#if loadingSemestres}
        <span class="loading-text">Cargando semestres...</span>
      {/if}
    </div>
    <button
      class="btn btn-primary"
      on:click={handleCambiarSemestre}
      disabled={loadingCambiarSemestre || !selectedSemestreId}
    >
      {loadingCambiarSemestre ? 'Cambiando...' : 'Cambiar Semestre'}
    </button>
  </div>
</div>

<style>
  .student-management {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .message {
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: slideIn 0.3s ease;
  }

  .message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: inherit;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .close-btn:hover {
    opacity: 0.7;
  }

  .management-section {
    background: #FEFEFE;
    border: 1px solid #F5F5F5;
    border-radius: 10px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 20px 0;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #64748b;
    margin-bottom: 8px;
  }

  .select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    font-size: 15px;
    color: #1e293b;
    background: #FEFEFE;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .select:hover:not(:disabled) {
    border-color: #FEE500;
  }

  .select:focus {
    outline: none;
    border-color: #FEE500;
    box-shadow: 0 0 0 3px rgba(254, 229, 0, 0.1);
  }

  .select:disabled {
    background: #F5F5F5;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .loading-text {
    display: block;
    font-size: 13px;
    color: #64748b;
    margin-top: 8px;
  }

  .btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #FEE500 0%, #FDD835 100%);
    color: #1e293b;
    box-shadow: 0 2px 8px rgba(254, 229, 0, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(254, 229, 0, 0.4);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

