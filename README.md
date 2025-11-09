# UI Graph Recommendation

Sistema de recomendación de cursos para estudiantes basado en análisis de grafos. La aplicación proporciona recomendaciones personalizadas de materias basadas en el perfil académico del estudiante, sus cursos cursados, áreas de interés y patrones de otros estudiantes similares.

## 🎨 Características

- **Recomendaciones personalizadas**: Sistema de recomendación basado en análisis de grafos que sugiere cursos según el perfil académico
- **Interfaz moderna**: Diseño inspirado en Kakao Corp con colores cálidos y bordes redondeados
- **Gestión de perfil**: Configuración y gestión del ID de usuario
- **Visualización de datos**: Tarjetas informativas para cursos cursados, cursos de interés y recomendaciones
- **Sistema de scoring**: Priorización de recomendaciones mediante un sistema de puntuación (score)

## 🛠️ Tecnologías

- **Svelte 5**: Framework reactivo para la interfaz de usuario
- **Vite**: Herramienta de construcción y desarrollo
- **Pretendard**: Fuente tipográfica coreana moderna (inspirada en Kakao Corp)
- **API REST**: Integración con backend para obtención de datos

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne automáticamente).

### 3. Construir para producción

```bash
npm run build
```

### 4. Preview de la construcción de producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── lib/
│   ├── api.js              # Servicios de API para obtener datos
│   ├── storage.js          # Gestión de localStorage
│   ├── Layout.svelte       # Layout principal de la aplicación
│   ├── Sidebar.svelte      # Barra lateral de navegación
│   ├── Header.svelte       # Cabecera de la aplicación
│   ├── MainContent.svelte  # Contenedor principal de contenido
│   ├── Profile.svelte      # Componente de perfil de usuario
│   ├── StudentInfo.svelte  # Información del estudiante
│   ├── CourseCard.svelte   # Tarjeta de curso
│   ├── RecommendationCard.svelte  # Tarjeta de recomendación
│   └── CourseRegistration.svelte  # Página de inscripción
├── App.svelte              # Componente raíz
├── main.js                 # Punto de entrada
└── app.css                 # Estilos globales
```

## 🎯 Uso

1. **Configurar ID de usuario**: Ve a la sección "Perfil" y configura tu ID de usuario
2. **Ver información**: En "Resumen" puedes ver tus cursos cursados y cursos de interés
3. **Obtener recomendaciones**: En "Inscripción" encontrarás recomendaciones personalizadas basadas en tu perfil
4. **Sistema de scoring**: Las recomendaciones se ordenan por prioridad (score), donde un score más alto indica mayor relevancia

## 📝 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la construcción de producción

## 🔧 Configuración

### Variables de API

Asegúrate de configurar correctamente la URL del backend en `src/lib/api.js` para que la aplicación pueda obtener los datos necesarios.

### LocalStorage

La aplicación utiliza localStorage para almacenar el ID de usuario configurado en la sección de perfil.

## 📄 Licencia

Este proyecto es privado.