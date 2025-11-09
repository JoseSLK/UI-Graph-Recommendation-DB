<script>
  import Profile from './Profile.svelte';
  import StudentInfo from './StudentInfo.svelte';
  import CourseRegistration from './CourseRegistration.svelte';
  
  export let currentPage = 'dashboard';

  const pageContent = {
    dashboard: {
      title: 'Resumen',
      content: 'Información del estudiante y cursos cursados e intereses.'
    },
    registration: {
      title: 'Inscripción',
      content: 'Recomendaciones personalizadas de cursos basadas en tu perfil académico.'
    },
    profile: {
      title: 'Profile',
      content: 'Gestiona el ID de usuario para las peticiones de la aplicación.'
    }
  };

  $: currentContent = pageContent[currentPage] || pageContent.dashboard;
  $: isProfilePage = currentPage === 'profile';
  $: isDashboardPage = currentPage === 'dashboard';
  $: isRegistrationPage = currentPage === 'registration';
</script>

<main class="main-content">
  <div class="content-container">
    {#if isProfilePage}
      <div class="content-card">
        <h2 class="content-title">{currentContent.title}</h2>
        <p class="content-text">{currentContent.content}</p>
        <Profile />
      </div>
    {:else if isDashboardPage}
      <div class="content-card">
        <h2 class="content-title">{currentContent.title}</h2>
        <p class="content-text">{currentContent.content}</p>
        <StudentInfo />
      </div>
    {:else if isRegistrationPage}
      <div class="content-card">
        <h2 class="content-title">{currentContent.title}</h2>
        <p class="content-text">{currentContent.content}</p>
        <CourseRegistration />
      </div>
    {:else}
      <div class="content-card">
        <h2 class="content-title">{currentContent.title}</h2>
        <p class="content-text">{currentContent.content}</p>
        
        <div class="content-placeholder">
          <div class="placeholder-box">
            <p>Contenido dinámico basado en la selección del menú</p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  .main-content {
    margin-left: 260px;
    margin-top: 70px;
    min-height: calc(100vh - 70px);
    background: #FEFEFE;
    padding: 32px;
  }

  .content-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .content-card {
    background: #FEFEFE;
    border-radius: 10px;
    padding: 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #F5F5F5;
  }

  .content-title {
    font-size: 28px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 16px 0;
  }

  .content-text {
    font-size: 16px;
    color: #64748b;
    line-height: 1.6;
    margin: 0 0 32px 0;
  }

  .content-placeholder {
    margin-top: 24px;
  }

  .placeholder-box {
    background: linear-gradient(135deg, #FFF9E6 0%, rgba(254, 229, 0, 0.08) 100%);
    border: 2px dashed #FEE500;
    border-radius: 10px;
    padding: 64px 32px;
    text-align: center;
    color: #64748b;
  }

  .placeholder-box p {
    margin: 0;
    font-size: 16px;
  }
</style>

