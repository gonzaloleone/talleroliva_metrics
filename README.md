# Taller Oliva Metrics

Sistema de tracking de métricas y visitas para aplicaciones web. Permite registrar y analizar visitas a diferentes páginas con información de IP y timestamps.

## Características

- Registro automático de visitas con URL completa e IP
- Creación automática de páginas base cuando se detecta una nueva URL
- API REST para registrar y consultar visitas
- Estadísticas agregadas de visitas por página
- Base de datos SQLite (no requiere servidor de BD externo)

## Requisitos

- Node.js v14 o superior
- npm

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/gonzaloleone/talleroliva_metrics.git
cd talleroliva_metrics
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (opcional):
Crear archivo `.env` con:
```
PORT=3000
```

4. Inicializar la base de datos:
```bash
npm run init-db
```

## Uso

Iniciar el servidor:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## API Endpoints

### Registrar Visita
**POST** `/api/visitas`

Body:
```json
{
  "url_complet": "example.com/page",
  "ip_address": "192.168.1.1"
}
```

Respuesta:
```json
{
  "id": 1,
  "timestamp": "2025-08-29T11:08:34.782Z",
  "url_complet": "example.com/page",
  "ip_address": "192.168.1.1",
  "page_id": 1
}
```

### Obtener Todas las Visitas
**GET** `/api/visitas`

Respuesta:
```json
[
  {
    "id": 1,
    "timestamp": "2025-08-29T11:08:34.782Z",
    "url_complet": "example.com/page",
    "ip_address": "192.168.1.1",
    "page_id": 1,
    "Page": {
      "url_base": "example.com",
      "description": null
    }
  }
]
```

### Obtener Estadísticas
**GET** `/api/estadisticas`

Respuesta:
```json
{
  "totalVisitas": 10,
  "totalPaginas": 3,
  "visitasPorPagina": [
    {
      "id": 1,
      "url_base": "example.com",
      "description": "Página principal"
    }
  ]
}
```

## Base de Datos

El proyecto utiliza SQLite con las siguientes tablas:

### Tabla `pages`
- `id`: Identificador único
- `description`: Descripción opcional de la página
- `url_base`: URL base única (ej: "example.com")

### Tabla `visitas`
- `id`: Identificador único
- `timestamp`: Fecha y hora de la visita
- `url_complet`: URL completa visitada
- `ip_address`: Dirección IP del visitante
- `page_id`: Referencia a la página base

## Scripts Disponibles

- `npm start`: Inicia el servidor
- `npm run init-db`: Inicializa/reinicia la base de datos
- `npm test`: Ejecuta pruebas (por configurar)

## Tecnologías

- **Express.js**: Framework web
- **Sequelize**: ORM para manejo de base de datos
- **SQLite**: Base de datos embebida
- **dotenv**: Manejo de variables de entorno

## Estructura del Proyecto

```
talleroliva_metrics/
├── config/
│   └── database.js       # Configuración de Sequelize/SQLite
├── controllers/
│   └── visitaController.js # Lógica de negocio
├── models/
│   ├── Page.js           # Modelo de páginas
│   ├── Visita.js         # Modelo de visitas
│   └── index.js          # Configuración de relaciones
├── routes/
│   └── visitaRoutes.js   # Definición de rutas API
├── index.js              # Punto de entrada
├── init-db.js            # Script de inicialización
├── database.sqlite       # Base de datos (generada)
└── package.json
```

## Licencia

ISC