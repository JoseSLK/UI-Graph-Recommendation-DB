<script>
  export let selectedMenuItem = 'dashboard';
  export let onMenuItemClick;

  const menuItems = [
    { id: 'dashboard', label: 'Resumen', icon: '' },
    { id: 'registration', label: 'Inscripción', icon: '' },
    { id: 'management', label: 'Gestión', icon: '' },
    { id: 'profile', label: 'Perfil', icon: '' }
  ];

  function handleClick(itemId) {
    selectedMenuItem = itemId;
    if (onMenuItemClick) {
      onMenuItemClick(itemId);
    }
  }
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <h2 class="logo">UPTC - GRAPH</h2>
  </div>
  
  <nav class="sidebar-nav">
    {#each menuItems as item}
      <button
        class="nav-item"
        class:active={selectedMenuItem === item.id}
        on:click={() => handleClick(item.id)}
      >
        {#if item.icon}
          <span class="nav-icon">{item.icon}</span>
        {/if}
        <span class="nav-label">{item.label}</span>
      </button>
    {/each}
  </nav>
</aside>

<style>
  .sidebar {
    width: 260px;
    height: 100vh;
    background: #FEFEFE;
    color: #1e293b;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
    border-right: 1px solid #F5F5F5;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
  }

  .sidebar-header {
    padding: 24px 20px;
    border-bottom: 1px solid #F5F5F5;
  }

  .logo {
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(135deg, #272722 0%, #000000 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .sidebar-nav {
    flex: 1;
    padding: 20px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .nav-item {
    width: 100%;
    padding: 14px 16px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: #64748b;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.2s ease;
    text-align: left;
  }

  .nav-item:hover {
    background: #FFF9E6;
    color: #1e293b;
    transform: translateX(4px);
  }

  .nav-item.active {
    background: linear-gradient(135deg, #FEE500 0%, #FDD835 100%);
    color: #1e293b;
    box-shadow: 0 4px 12px rgba(254, 229, 0, 0.3);
    font-weight: 600;
  }

  .nav-icon {
    font-size: 20px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-label {
    flex: 1;
  }
</style>

