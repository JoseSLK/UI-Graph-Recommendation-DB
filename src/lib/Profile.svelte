<script>
  import { onMount } from 'svelte';
  import { getUserId, setUserId } from './storage.js';

  let userId = '';
  let savedUserId = '';
  let showSuccess = false;

  onMount(() => {
    // Cargar el ID guardado desde localStorage
    const storedId = getUserId();
    if (storedId) {
      userId = storedId;
      savedUserId = storedId;
    }
  });

  function saveUserId() {
    if (userId.trim()) {
      setUserId(userId.trim());
      savedUserId = userId.trim();
      showSuccess = true;
      
      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        showSuccess = false;
      }, 3000);
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      saveUserId();
    }
  }
</script>

<div class="profile-container">
  <div class="profile-section">
    <h3 class="section-title">ID de Usuario</h3>
    <p class="section-description">
      Ingresa el ID del usuario que se utilizará en las peticiones de la aplicación.
    </p>

    <div class="input-group">
      <label for="userIdInput" class="input-label">ID de Usuario</label>
      <input
        id="userIdInput"
        type="text"
        class="user-input"
        placeholder="Ejemplo: user123"
        bind:value={userId}
        on:keypress={handleKeyPress}
      />
    </div>

    <button class="save-button" on:click={saveUserId} disabled={!userId.trim()}>
      Guardar
    </button>

    {#if showSuccess}
      <div class="success-message">
        <span class="success-icon">✓</span>
        <span>ID guardado correctamente en localStorage</span>
      </div>
    {/if}

    {#if savedUserId}
      <div class="saved-info">
        <p class="saved-label">ID actual guardado:</p>
        <p class="saved-value">{savedUserId}</p>
      </div>
    {/if}
  </div>

  <div class="info-section">
    <div class="info-card">
      <div class="info-content">
        <h4>Información</h4>
        <p>Este ID se almacena en localStorage y estará disponible para usar en peticiones a través de la aplicación.</p>
      </div>
    </div>
  </div>
</div>

<style>
  .profile-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .profile-section {
    background: #FEFEFE;
    border-radius: 10px;
    padding: 32px;
    border: 1px solid #F5F5F5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 8px 0;
  }

  .section-description {
    font-size: 14px;
    color: #64748b;
    margin: 0 0 24px 0;
    line-height: 1.6;
  }

  .input-group {
    margin-bottom: 24px;
  }

  .input-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }

  .user-input {
    width: 100%;
    padding: 12px 16px;
    font-size: 15px;
    border: 2px solid #F5F5F5;
    border-radius: 8px;
    background: #FEFEFE;
    color: #1e293b;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .user-input:focus {
    outline: none;
    border-color: #FEE500;
    box-shadow: 0 0 0 3px rgba(254, 229, 0, 0.15);
  }

  .user-input::placeholder {
    color: #94a3b8;
  }

  .save-button {
    padding: 12px 24px;
    font-size: 15px;
    font-weight: 600;
    color: #1e293b;
    background: linear-gradient(135deg, #FEE500 0%, #FDD835 100%);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(254, 229, 0, 0.3);
  }

  .save-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(254, 229, 0, 0.4);
  }

  .save-button:active:not(:disabled) {
    transform: translateY(0);
  }

  .save-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  .success-message {
    margin-top: 16px;
    padding: 12px 16px;
    background: #FFF9E6;
    border: 2px solid #FEE500;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #1e293b;
    font-size: 14px;
    animation: slideIn 0.3s ease;
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

  .success-icon {
    font-size: 18px;
    font-weight: bold;
  }

  .saved-info {
    margin-top: 24px;
    padding: 16px;
    background: #FFF9E6;
    border-radius: 8px;
    border: 1px solid #FEE500;
    border-left: 4px solid #FEE500;
  }

  .saved-label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    margin: 0 0 4px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .saved-value {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
    font-family: 'Courier New', monospace;
  }

  .info-section {
    margin-top: 8px;
  }

  .info-card {
    background: linear-gradient(135deg, #FFF9E6 0%, rgba(254, 229, 0, 0.08) 100%);
    border: 1px solid #FEE500;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .info-content h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 8px 0;
  }

  .info-content p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
    line-height: 1.6;
  }
</style>

