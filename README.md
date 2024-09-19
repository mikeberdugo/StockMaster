# Desarrollador Full Stack

## Sistema Básico de Gestión de Inventario

### Contexto

Amazon, líder en comercio electrónico, requiere un sistema eficiente de facturación que también actualice las existencias del inventario posterior a una venta. Además, se desea contar con un reporte estadístico de las ventas. Esta prueba simula una versión simplificada de dicho sistema.

### Descripción del Problema

Desarrollar un sistema básico de gestión de inventario que incluya:

1. **Gestión de Productos**: Permitir el registro y actualización de productos.
2. **Control de Inventario**: Manejar las existencias de productos en bodegas.
3. **Ventas Simples**: Registrar ventas y actualizar el inventario dependiendo de los productos manejados en cada bodega.

### Requisitos Técnicos

#### Base de Datos

- Utilizar **PostgreSQL** preferiblemente o cualquier otra base de datos.
- Diseñar un esquema simple para productos, inventario y ventas.

#### Backend (Django)

- Desarrollar una API RESTful básica.
- Implementar autenticación simple (puede ser token-based).
- Utilizar el ORM de Django para interactuar con PostgreSQL.

#### Frontend (React)

- Crear una interfaz de usuario simple con las vistas necesarias para la operación.

### Criterios de Evaluación

1. **Diseño de la Base de Datos (PostgreSQL)**
   - Normalización y estructura de tablas.
   - Uso efectivo de índices y constraints.
   - Implementación de procedimientos almacenados para operaciones complejas.

2. **Uso de Servicios (API Django)**
   - Diseño RESTful y documentación de endpoints.
   - Implementación de autenticación y autorización (Opcional).
   - Manejo robusto de errores y logging.

3. **Estructuración del Proyecto Django**
   - Organización de apps, modelos y vistas.
   - Configuración para entornos de desarrollo y producción.
   - Implementación de tests unitarios y de integración.

4. **Estructuración del Proyecto React**
   - Componentización y reutilización de código.
   - Manejo eficiente del estado con hooks.
   - Implementación de rutas y navegación.

5. **Manejo de Transacciones**
   - Diseño e implementación de procedimientos almacenados en PostgreSQL.
   - Garantía de atomicidad en operaciones críticas (ej. actualización de inventario).
   - Validación de datos y manejo de errores.

6. **Uso del ORM de Django**
   - Mapeo correcto de modelos a tablas de PostgreSQL.
   - Optimización de consultas para operaciones a gran escala.
   - Manejo adecuado de relaciones complejas entre entidades.

7. **Rendimiento y Escalabilidad**
   - Optimización de consultas para grandes volúmenes de datos.
   - Implementación de caché para mejorar tiempos de respuesta.
   - Diseño pensado en la escalabilidad horizontal.

### Entrega

- Código fuente del proyecto Django (Incluir los procedimientos o funciones de PostgreSQL) y React.
- Un breve video donde se grabe la pantalla y se muestre el proyecto funcionando.

### Instrucciones para la Ejecución

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
