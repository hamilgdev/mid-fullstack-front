# 📖 BookReader

Una aplicación web de lectura de libros desarrollada en React con funcionalidades de autenticación, catálogo de libros y métricas de lectura.

Permite a los usuarios autenticarse, navegar por un catálogo de libros y leer contenido página por página, mientras registra métricas detalladas del tiempo de lectura. La aplicación utiliza una arquitectura moderna con React, TypeScript y una API simulada con json-server.

![BookReader](/assets/og.png)

## ✨ Funcionalidades

### 🔐 Autenticación de Usuario

- Sistema de login básico con almacenamiento local
- Identificación única de usuarios
- Persistencia de sesión entre peseñas
- Validación de acceso de usuarios

### 📚 Catálogo de Libros

- API simulada con json-server
- Listado de libros con información completa:
  - Título del libro
  - Autor
  - Contenido dividido por páginas
  - Identificador único
- Interfaz para selección de libros
- Visualización de detalles: título, autor y descripción

### 📖 Lector de Texto

- Vista de lectura página por página
- Navegación entre páginas con botones:
  - "Siguiente página"
  - "Página anterior"
- Interfaz intuitiva y responsiva
- Experiencia de lectura optimizada

### 📊 Métricas de Lectura

- Registro de tiempo por página (en milisegundos)
- Cálculo de tiempo total de lectura por libro
- Estadísticas de tiempo promedio por página
- Reporte final de métricas al completar la lectura

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Panda CSS
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **API Mock**: json-server
- **Testing**: Vitest + React Testing Library

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd mid-fullstack-front

# Instalar dependencias
pnpm install

# Instalar json-server globalmente (si no está instalado)
npm install -g json-server
```

### Configuración del Mock Server

```bash
# Iniciar json-server con el archivo db.json
json-server --watch db.json --port 3001
```

### Ejecución del Proyecto

```bash
# Modo desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview del build
pnpm preview
```

## 📱 Características Técnicas

### Responsive Design

- Adaptable a dispositivos móviles y de escritorio
- Diseño mobile-first
- Interfaz optimizada para diferentes tamaños de pantalla

### Arquitectura del Proyecto

```text
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de interfaz
│   ├── layouts/        # Layouts de la aplicación
│   └── sections/       # Secciones específicas
├── contexts/           # Context API para manejo de estado
├── hooks/              # Custom hooks
├── pages/              # Páginas de la aplicación
├── services/           # Servicios y adapters para API
├── interfaces/         # Definiciones de TypeScript
└── config/             # Configuraciones
```

### Estado y Gestión de Datos

- Context API para manejo de estado global
- Custom hooks para lógica reutilizable
- Persistencia en localStorage
- Gestión de estado de autenticación y lectura

## 🎯 Consideraciones de la Solución

### Escalabilidad

- Arquitectura modular y componentes reutilizables
- Separación clara de responsabilidades
- Fácil extensión para nuevas funcionalidades

### Performance

- Optimización de renders con React hooks
- Lazy loading de componentes
- Gestión eficiente del estado con Context API con separación de responsabilidades

### Experiencia de Usuario

- Diseño intuitivo y accesible
- Feedback visual en todas las interacciones
- Cargadores visuales para operaciones asíncronas

### Mantenibilidad

- Código tipado con TypeScript
- Estructura de carpetas organizada
- Componentes documentados y testeables

## 🧪 Testing

```bash
# Ejecutar tests
pnpm test

# Tests en modo watch
pnpm test:watch

# Coverage
pnpm test:coverage
```

## 📚 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm preview` - Preview del build de producción
- `pnpm test` - Ejecuta los tests
- `pnpm lint` - Ejecuta el linter
- `pnpm prepare` - Genera styled-system
