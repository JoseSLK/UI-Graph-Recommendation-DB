<script>
  export let course = {
    id: null,
    nombre: '',
    area: '',
    nivel: '',
    creditos: 0
  };

  const nivelColors = {
    'Básico': '#10b981',
    'Intermedio': '#f59e0b',
    'Avanzado': '#ef4444'
  };

  $: nivelColor = nivelColors[course.nivel] || '#64748b';
</script>

<div class="course-card">
  <div class="course-header">
    <h3 class="course-name">{course.nombre}</h3>
    <span class="course-id">#{course.id}</span>
  </div>
  
  <div class="course-details">
    <div class="course-field">
      <span class="field-label">Área:</span>
      <span class="field-value">{course.area}</span>
    </div>
    
    <div class="course-field">
      <span class="field-label">Nivel:</span>
      <span class="field-value level-badge" style="color: {nivelColor}">
        {course.nivel}
      </span>
    </div>
    
    <div class="course-field">
      <span class="field-label">Créditos:</span>
      <span class="field-value credits">{course.creditos}</span>
    </div>
  </div>
</div>

<style>
  .course-card {
    background: #FEFEFE;
    border: 2px solid #F5F5F5;
    border-radius: 10px;
    padding: 20px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .course-card:hover {
    border-color: #FEE500;
    box-shadow: 0 4px 16px rgba(254, 229, 0, 0.2);
    transform: translateY(-2px);
  }

  .course-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    gap: 12px;
  }

  .course-name {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
    flex: 1;
    line-height: 1.4;
  }

  .course-id {
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
    background: #FFF9E6;
    padding: 4px 8px;
    border-radius: 6px;
    white-space: nowrap;
  }

  .course-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .course-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #F5F5F5;
  }

  .course-field:last-child {
    border-bottom: none;
  }

  .field-label {
    font-size: 14px;
    font-weight: 500;
    color: #64748b;
  }

  .field-value {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
  }

  .level-badge {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .credits {
    background: linear-gradient(135deg, #FEE500 0%, #FDD835 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>

