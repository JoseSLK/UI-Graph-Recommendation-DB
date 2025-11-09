<script>
  import Sidebar from './Sidebar.svelte';
  import Header from './Header.svelte';
  import MainContent from './MainContent.svelte';
  
  let selectedPage = 'dashboard';
  
  const pageTitles = {
    dashboard: 'Dashboard',
    registration: 'Inscripción',
    analytics: 'Analytics',
    reports: 'Reports',
    settings: 'Settings',
    profile: 'Profile'
  };
  
  function handleMenuClick(pageId) {
    selectedPage = pageId;
  }
  
  $: currentTitle = pageTitles[selectedPage] || 'Dashboard';
</script>

<div class="layout">
  <Sidebar selectedMenuItem={selectedPage} onMenuItemClick={handleMenuClick} />
  <Header currentPage={currentTitle} />
  <MainContent currentPage={selectedPage} />
</div>

<style>
  .layout {
    width: 100%;
    min-height: 100vh;
    background: #FEFEFE;
  }
</style>

