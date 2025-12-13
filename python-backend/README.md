# Estructura del Backend (Python)

Este documento describe la estructura de carpetas y la arquitectura por capas utilizada en este proyecto backend.

## Estructura de Directorios

### Raíz
- **DB/**: Contiene scripts SQL para la inicialización y migración de la base de datos (ej. `DBWEAVER_mysql.sql`).
- **src/**: Directorio principal que contiene todo el código fuente del backend.
- **Dockerfile** & **docker-compose.yml**: Archivos para la contenerización y orquestación de servicios.
- **requirements.txt**: Lista de dependencias de Python.

### src/ (Código Fuente)

El código fuente sigue una arquitectura limpia (Clean Architecture) dividida en capas:

#### 1. api/ (Capa de Presentación)
Esta capa maneja las solicitudes HTTP y la comunicación con el cliente.
- **routes/**: Define los endpoints de la API y delega la lógica a la capa de servicios.
- **schemas/**: Contiene los esquemas de Pydantic para la validación de datos de entrada y salida (Request/Response DTOs).

#### 2. application/ (Capa de Aplicación)
Contiene la lógica de la aplicación y los casos de uso.
- **services/**: Implementa la lógica de negocio, orquestando las operaciones entre el dominio y la infraestructura.

#### 3. domain/ (Capa de Dominio)
Contiene la lógica del negocio.
- **user/**: Contiene entidades y definiciones relacionadas con el dominio de usuario.

#### 4. infrastructure/ (Capa de Infraestructura)
Maneja la persistencia de datos y la comunicación con servicios externos.
- **db/**: Configuración de la base de datos y sesiones.
- **repositories/**: Implementación del patrón repositorio para el acceso a datos (CRUD).

#### 5. core/ (Núcleo)
Contiene el punto de entrada de la aplicación FastAPI, y utilidades.
- **main.py**: Punto de entrada de la aplicación FastAPI.
- **security.py**: Implementación de JWT con jose para la creación de Tokens de sesión.

#### 6. tests/
Contiene las pruebas automatizadas (unitarias e integración) para asegurar la calidad del código.


## Clean Architecture

Este proyecto sigue los principios de Clean Architecture lo que implica una separación estricta de responsabilidades y un flujo de dependencias controlado.

### ¿Qué implica esta estructura?

1.  **Independencia de Frameworks**: La lógica de negocio (Dominio y Aplicación) no tiene dependencias externas. Esto permite cambiar herramientas externas con mínimo impacto en las reglas de negocio.
2.  **Regla de Dependencia**: Las dependencias solo apuntan "hacia adentro".
    *   `api` -> `application` -> `domain`
    *   `infrastructure` -> `application` / `domain`
    *   El `domain` no sabe nada de las capas exteriores.
3.  **Testeabilidad**: Al no tener una lógica monolítica, es mucho más fácil escribir pruebas unitarias para las reglas de negocio sin necesidad de mocks complejos o desplegar todo para hacer pruebas.


# Requisitos de ejecución  
- INSTALAR DOCKER  
- Tener internet  

## Crear y ejecutar la build  
**crea la build del proyecto**  
docker compose build  

  
**Lanza el proyecto**  
docker compose up  
  
**La dirección de ejecución es localhost:8000**  
  

## Cerrar el entorno de desarrollo  
**Cerrado normal**  
docker compose down  

**Cerrado eliminando la información de la DB**  
docker compose down -v  
 
**entrar al container de la DB**  
docker exec -it mysql-dev bash  
mysql -u root -p  

contraseña: rootp *se cambia en deployment*  
  
use users_DB;  
show tables;  