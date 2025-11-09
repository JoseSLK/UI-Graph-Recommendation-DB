<script>
  import { onMount } from 'svelte';
  import { getUserId } from './storage.js';
  import { getRecommendations } from './api.js';
  import RecommendationCard from './RecommendationCard.svelte';

  let recommendationsData = null;
  let loading = false;
  let error = null;
  let studentId = null;

  async function loadRecommendations() {
    const userId = getUserId();
    
    if (!userId) {
      error = 'No se ha configurado un ID de usuario. Por favor, ve a Profile y configura tu ID.';
      recommendationsData = null;
      loading = false;
      return;
    }

    // Si el userId no ha cambiado y ya tenemos datos, no recargar
    if (studentId === userId && recommendationsData) {
      return;
    }

    studentId = userId;
    loading = true;
    error = null;
    recommendationsData = null;

    try {
      const data = await getRecommendations(userId);
      recommendationsData = data;
      
      // Ordenar recomendaciones por score (mayor a menor)
      if (recommendationsData.recomendaciones) {
        recommendationsData.recomendaciones.sort((a, b) => b.score - a.score);
      }
    } catch (err) {
      error = err.message;
      console.error('Error loading recommendations:', err);
      recommendationsData = null;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadRecommendations();
  });

  function handleEnroll(courseId, courseName) {
    // Aquí se puede implementar la lógica de inscripción
    alert(`Inscripción a: ${courseName} (ID: ${courseId})\n\nEsta funcionalidad se implementará próximamente.`);
  }
</script>

<div class="registration-container">
  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Cargando recomendaciones...</p>
    </div>
  {:else if error}
    <div class="error-state">
      <h3>Error al cargar recomendaciones</h3>
      <p>{error}</p>
      <button class="retry-button" on:click={loadRecommendations}>
        Reintentar
      </button>
    </div>
  {:else if recommendationsData}
    <div class="registration-header">
      <div class="header-content">
        <h2 class="section-title">Inscripción de Materias</h2>
        <p class="section-description">
          Recomendaciones personalizadas basadas en tu perfil académico y el análisis de otros estudiantes.
        </p>
        <div class="header-meta">
          <span class="meta-item">
            <strong>Estudiante ID:</strong> {recommendationsData.estudiante_id}
          </span>
          <span class="meta-item">
            <strong>Recomendaciones:</strong> {recommendationsData.recomendaciones?.length || 0}
          </span>
        </div>
      </div>
      <button class="refresh-button" on:click={loadRecommendations} title="Actualizar recomendaciones">
      </button>
    </div>

    {#if recommendationsData.recomendaciones && recommendationsData.recomendaciones.length > 0}
      <div class="recommendations-grid">
        {#each recommendationsData.recomendaciones as recommendation}
          <RecommendationCard {recommendation} onEnroll={handleEnroll} />
        {/each}
      </div>

      <div class="info-section">
        <div class="info-card">
          <div class="info-content">
            <h4>¿Cómo funcionan las recomendaciones?</h4>
            <p>
              Las recomendaciones se generan usando algoritmos que analizan tu historial académico, 
              cursos cursados, áreas de interés y patrones de otros estudiantes similares. 
              El <strong>score</strong> indica la prioridad de la recomendación (mayor = más recomendado).
            </p>
          </div>
        </div>

        <div class="legend-section">
          <h4 class="legend-title">Leyenda de Prioridades</h4>
          <div class="legend-items">
            <div class="legend-item">
              <span class="legend-badge" style="background: #d1fae5; color: #10b981; border-color: #10b981;"></span>
              <span>Alta (15-20)</span>
            </div>
            <div class="legend-item">
              <span class="legend-badge" style="background: #fef3c7; color: #f59e0b; border-color: #f59e0b;"></span>
              <span>Media (10-14)</span>
            </div>
            <div class="legend-item">
              <span class="legend-badge" style="background: #f1f5f9; color: #64748b; border-color: #cbd5e1;"></span>
              <span>Baja (0-9)</span>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="empty-state">
        <h3>No hay recomendaciones disponibles</h3>
        <p>No se encontraron recomendaciones para tu perfil académico en este momento.</p>
      </div>
    {/if}
  {:else}
    <div class="empty-state">
      <p>No hay información disponible</p>
    </div>
  {/if}
</div>

<style>
  .registration-container {
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

  .registration-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 2px solid #e2e8f0;
    gap: 20px;
  }

  .header-content {
    flex: 1;
  }

  .section-title {
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 12px 0;
  }

  .section-description {
    font-size: 15px;
    color: #64748b;
    line-height: 1.6;
    margin: 0 0 16px 0;
  }

  .header-meta {
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
    width: 44px;
    height: 44px;
    border: none;
    background: #f1f5f9;
    border-radius: 10px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    position: relative;
  }

  .refresh-button::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 3px solid #64748b;
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
    border-left: 6px solid #64748b;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    top: 2px;
    right: 8px;
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

  .recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 32px;
  }

  .info-card {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border: 1px solid #bfdbfe;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .info-content h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1e40af;
    margin: 0 0 8px 0;
  }

  .info-content p {
    font-size: 14px;
    color: #1e40af;
    margin: 0;
    line-height: 1.6;
    opacity: 0.9;
  }

  .legend-section {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
  }

  .legend-title {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 16px 0;
  }

  .legend-items {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #64748b;
  }

  .legend-badge {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid;
  }

  .empty-state {
    text-align: center;
    padding: 64px 32px;
    background: #ffffff;
    border: 2px dashed #e2e8f0;
    border-radius: 12px;
  }

  .empty-state h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 8px 0;
  }

  .empty-state p {
    color: #64748b;
    margin: 0;
    font-size: 14px;
  }
</style>

