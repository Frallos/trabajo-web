Solemne - FreeWorks - Panel de Control para Freelancers
Contexto y Problemática
Este proyecto tiene como objetivo desarrollar un portal de gestión de proyectos web para la startup FreeWorks, que conecta freelancers con clientes. El panel de control permitirá a los trabajadores autónomos gestionar sus proyectos, registrar avances y entregables, y consultar estadísticas, sirviendo como un Producto Mínimo Viable (MVP).

Requerimientos Funcionales
Listado de Proyectos: Visualizar proyectos activos, entregados y pendientes.
Gestión de Entregables:
Agregar entregables con fecha, descripción y archivos simulados.
Calcular el progreso del proyecto en porcentaje (entregables completados).
Estado del Proyecto: Visualizar el estado de cada proyecto (En progreso, Finalizado, Atrasado).
Comentarios del Cliente: Registrar y mostrar comentarios del cliente.
Cambio de Estado Manual: Permitir cambiar el estado de avance de un proyecto manualmente.
Tablero de Proyectos: Mostrar un resumen visual de todos los proyectos.
Filtros de Búsqueda: Filtrar proyectos por cliente, estado y prioridad.
Búsqueda Rápida: Buscar proyectos por nombre del proyecto o entregable.
Notificaciones: Mostrar notificaciones por entregas atrasadas.
Diseño Profesional: Estilizar el panel con un diseño profesional y claro.
Modularización y API REST: Modularizar la aplicación en componentes (proyecto, avance, dashboard) para que los datos sean guardados en la Base de Datos mediante una API REST (Node.js).
Requerimientos Generales
Alojamiento en Git: El proyecto debe estar alojado en un repositorio Git de Organización y mantener control de versiones.
.gitignore: Tener configurado el archivo .gitignore para excluir archivos innecesarios.
Ramas y Commits: Trabajar en ramas feature/* y realizar al menos 10 commits significativos.
README.md: Este archivo README.md con descripción del proyecto, cómo ejecutarlo localmente y vía Docker.
Dockerización: Crear un Dockerfile que compile y sirva la aplicación tanto para el backend como para el frontend, y un docker-compose.yml para orquestarlos.
Ejecución en Docker: Asegurar que el contenedor pueda ejecutarse sin errores en cualquier sistema con Docker instalado.
Software Necesario
Asegúrate de tener las siguientes herramientas instaladas en tu sistema:

Node.js: v22.15 (o una versión compatible)
Angular CLI: v19.2.12
Git: v2.49
IDE: Visual Studio Code (recomendado)
Docker Desktop: v28.0.4
Estructura del Proyecto
El proyecto está organizado en una carpeta principal solemneweb5 que contiene el frontend (Angular) y el backend (Node.js)

Instrucciones de Ejecución Local
Estas instrucciones te guiarán para ejecutar el frontend y el backend de forma local.

Clonar el Repositorio: Abre tu terminal (PowerShell) y clona el proyecto desde GitHub:

git clone [https://github.com/lucianolougpu/trabajodeappweb.git](https://github.com/lucianolougpu/trabajodeappweb.git)
Navegar al Directorio Principal: Dirígete a la carpeta raíz del proyecto clonado:

cd trabajodeappweb
(Si tu carpeta local se llama solemneweb5, usa cd solemneweb5)

Instalar Dependencias del Backend: Navega a la carpeta del backend e instala sus dependencias:

cd auth-backend-api
npm install
cd .. # Vuelve a la carpeta principal
Instalar Dependencias del Frontend: Navega a la carpeta del frontend e instala sus dependencias:

cd freeworks-dashboard
npm install
cd .. # Vuelve a la carpeta principal
Iniciar la Aplicación (Backend y Frontend Simultáneamente): Desde la carpeta raíz del proyecto (solemneweb5), ejecuta el siguiente comando para iniciar ambos servicios:

npm run dev
El backend se ejecutará en http://localhost:3000.
El frontend se ejecutará en http://localhost:4201 (o 4200, verifica tu configuración local).
Acceder a la Aplicación: Abre tu navegador web y ve a http://localhost:4201 (o el puerto que se indique en tu terminal).

Instrucciones de Git
El proyecto utiliza Git para el control de versiones. Sigue estas pautas:

Asegurar Git en tu PC: Verifica que Git esté instalado.

Configurar Git por primera vez (si aplica):

git config --global user.name "Tu Nombre"
git config --global user.email "tu.correo@uss.cl"
Flujo de Trabajo Básico:

Ir a la carpeta del proyecto: Siempre trabaja desde la raíz del proyecto (solemneweb5).

cd C:\Users\Desktop\solemneweb5
Sincronizar antes de empezar: Antes de realizar cambios, siempre actualiza tu rama local con los últimos cambios del repositorio remoto:

git pull origin main
Verificar el estado: Revisa qué archivos han sido modificados, añadidos o eliminados:

git status
Agregar cambios: Prepara los archivos para la confirmación. Usa . para todos los cambios en el directorio actual y subdirectorios (respetando .gitignore).

git add .
Hacer confirmación (commit): Guarda tus cambios en el historial local. Usa mensajes descriptivos.

git commit -m "feat: Descripción de los cambios realizados"
Subir cambios al repositorio remoto: Envía tus confirmaciones locales al repositorio en GitHub. Asegúrate de estar en la rama main.

git push origin main
Ramas feature/*: Se recomienda trabajar en ramas separadas para nuevas funcionalidades (feature/nombre-de-la-feature) y luego fusionarlas a main.

Instrucciones de Ejecución con Docker
Estas instrucciones te permitirán construir imágenes Docker para tu frontend y backend, y luego ejecutar ambos servicios en contenedores.

Tener Docker Desktop instalado y ejecutándose. Asegúrate de que la aplicación Docker Desktop esté activa en tu sistema.

Navegar al Directorio Principal del Proyecto: Abre tu terminal (PowerShell) y ve a la carpeta raíz del proyecto donde se encuentra docker-compose.yml:

cd C:\Users\nombre\Desktop\solemneweb5
Construir y Levantar los Servicios Docker: Este comando leerá docker-compose.yml, construirá las imágenes Docker para el frontend y backend (usando sus respectivos Dockerfiles) y luego iniciará los contenedores.

docker compose up --build
Acceder a la Aplicación: Una vez que los servicios estén en ejecución (observa los logs en tu terminal), abre tu navegador web y ve a:

http://localhost:4200
(El puerto 4200 es el puerto mapeado en docker-compose.yml para el frontend).

Detener los Contenedores (cuando termines): Para detener los servicios, presiona Ctrl + C en la terminal donde ejecutaste docker compose up. Si quieres detener y eliminar los contenedores, redes y volúmenes creados por Docker Compose:

docker compose down
