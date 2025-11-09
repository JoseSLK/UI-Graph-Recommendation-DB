<script>
  export let currentPage = 'Dashboard';
</script>

<header class="header">
  <div class="header-content">
    <h1 class="page-title">{currentPage}</h1>
    <div class="header-actions">
      <button class="action-btn" title="Notificaciones"></button>
      <button class="action-btn" title="Configuración"></button>
      <div class="user-profile">
        <div class="avatar">JD</div>
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    height: 70px;
    background: #FEFEFE;
    border-bottom: 1px solid #F5F5F5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    position: fixed;
    top: 0;
    right: 0;
    left: 260px;
    z-index: 100;
    display: flex;
    align-items: center;
  }

  .header-content {
    width: 100%;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .action-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: #FFF9E6;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    font-size: 18px;
    position: relative;
  }

  .action-btn:first-of-type::before {
    content: '';
    width: 18px;
    height: 18px;
    border: 2px solid #64748b;
    border-radius: 50%;
    display: block;
  }

  .action-btn:first-of-type::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: #64748b;
    border-radius: 50%;
    top: 11px;
    left: 50%;
    transform: translateX(-50%);
  }

  .action-btn:last-of-type::before {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid #64748b;
    border-top: 3px solid #64748b;
    border-right: 3px solid #64748b;
    border-radius: 2px;
  }

  .action-btn:hover {
    background: #FEE500;
    transform: scale(1.05);
  }

  .action-btn:hover::before,
  .action-btn:hover::after {
    border-color: #1e293b;
    background-color: #1e293b;
  }

  .action-btn:last-of-type:hover::before {
    border-top-color: #1e293b;
    border-right-color: #1e293b;
  }

  .user-profile {
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FEE500 0%, #FDD835 100%);
    color: #1e293b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .avatar:hover {
    transform: scale(1.1);
  }
</style>

