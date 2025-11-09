<script>
  export let recommendation = {
    id: null,
    nombre: '',
    score: 0,
    origenes: []
  };
  
  export let onEnroll = null;

  // Colores según el score (mayor score = más importante)
  function getScoreColor(score) {
    if (score >= 15) {
      return {
        primary: '#10b981',
        light: '#d1fae5',
        border: '#10b981'
      };
    } else if (score >= 10) {
      return {
        primary: '#f59e0b',
        light: '#fef3c7',
        border: '#f59e0b'
      };
    } else {
      return {
        primary: '#64748b',
        light: '#f1f5f9',
        border: '#cbd5e1'
      };
    }
  }

  // Etiquetas para los orígenes
  const origenLabels = {
    'prerrequisito': { label: 'Prerrequisito', color: '#3b82f6' },
    'semestre': { label: 'Semestre', color: '#8b5cf6' },
    'area_interes': { label: 'Área de Interés', color: '#f59e0b' },
    'complementario': { label: 'Complementario', color: '#64748b' }
  };

  $: scoreColor = getScoreColor(recommendation.score);
  $: sortedOrigenes = [...recommendation.origenes].sort();
</script>

<div class="recommendation-card" style="border-color: {scoreColor.border};">
  <div class="card-header">
    <div class="course-info">
      <h3 class="course-name">{recommendation.nombre}</h3>
      <span class="course-id">#{recommendation.id}</span>
    </div>
    <div class="score-badge" style="background: {scoreColor.light}; color: {scoreColor.primary}; border-color: {scoreColor.border};">
      <span class="score-value">{recommendation.score}</span>
    </div>
  </div>

  <div class="score-bar-container">
    <div class="score-bar" style="background: {scoreColor.light};">
      <div 
        class="score-bar-fill" 
        style="background: linear-gradient(90deg, {scoreColor.primary} 0%, {scoreColor.primary}88 100%); width: {Math.min((recommendation.score / 20) * 100, 100)}%;"
      ></div>
    </div>
    <span class="score-label">Prioridad: {recommendation.score}/20</span>
  </div>

  <div class="origenes-section">
    <p class="origenes-title">Recomendado por:</p>
    <div class="origenes-tags">
      {#each sortedOrigenes as origen}
        {@const origenInfo = origenLabels[origen] || { label: origen, color: '#64748b' }}
        <span class="origen-tag" style="background: {origenInfo.color}15; color: {origenInfo.color}; border-color: {origenInfo.color}40;">
          <span class="origen-label">{origenInfo.label}</span>
        </span>
      {/each}
    </div>
  </div>

  <button 
    class="enroll-button" 
    style="background: linear-gradient(135deg, {scoreColor.primary} 0%, {scoreColor.primary}dd 100%);"
    on:click={() => onEnroll && onEnroll(recommendation.id, recommendation.nombre)}
  >
    Inscribirse
  </button>
</div>

<style>
  .recommendation-card {
    background: #FEFEFE;
    border: 2px solid;
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .recommendation-card:hover {
    box-shadow: 0 8px 24px rgba(254, 229, 0, 0.15);
    transform: translateY(-4px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .course-info {
    flex: 1;
  }

  .course-name {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 4px 0;
    line-height: 1.4;
  }

  .course-id {
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
    background: #FFF9E6;
    padding: 2px 8px;
    border-radius: 6px;
  }

  .score-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 2px solid;
    font-weight: 700;
    font-size: 16px;
    white-space: nowrap;
  }

  .score-value {
    font-size: 18px;
  }

  .score-bar-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .score-bar {
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .score-bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .score-label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
  }

  .origenes-section {
    padding-top: 8px;
    border-top: 1px solid #e2e8f0;
  }

  .origenes-title {
    font-size: 13px;
    font-weight: 600;
    color: #475569;
    margin: 0 0 10px 0;
  }

  .origenes-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .origen-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 8px;
    border: 1px solid;
    font-size: 12px;
    font-weight: 500;
  }

  .origen-label {
    font-size: 11px;
  }

  .enroll-button {
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 4px;
  }

  .enroll-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .enroll-button:active {
    transform: translateY(0);
  }
</style>

