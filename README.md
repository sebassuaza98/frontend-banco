# Fondosinversion

Este proyecto fue generado con Angular CLI versión 18.2.0.

## Ejecucion de dependencias 
Instalar las dependencias: Una vez se este en la carpeta del proyecto, ejecuta el siguiente comando:
`npm install`

## Servidor de desarrollo

Ejecuta  `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos de origen.

## Build

Ejecuta  `ng build` para compilar el proyecto. Los artefactos de compilación se almacenarán en el directorio  `dist/` directory.


#                          FLUJO CI/CD
Para ello se usará CodePipeline, que es un servicio de AWS para publicar software mediante entrega continua.

## 1.1 Crear un pipeline para el backend
- Entro en la consola de AWS CodePipeline.
- Hago click en Create canalizacion.
- Nombro el pipeline, por ejemplo: backend-banco-pipeline.
* Fuente de código:
* Selecciona GitHub.
- Autentifico la cuenta de GitHub, este caso seria mi repo `https://github.com/sebassuaza98`
- Selecciono el repositorio backend-banco y la rama principal (main).

## 2. Configuración de AWS CodeBuild
- Creación del Proyecto en CodeBuild: Accedo a la consola de AWS CodeBuild y creo un nuevo proyecto:
- Nombre del Proyecto: build-angular-app.
- Fuente de Código: Selecciono el repositorio de GitHub.
## Entorno de Construcción:
- Imagen: Elijo una imagen de construcción de AWS, como aws/codebuild/standard:6.0.
- Sistema Operativo: Selecciono Ubuntu.
-Variables de Entorno: Configuro las variables necesarias, como NODE_ENV=production.
Archivo Buildspec.

## 3.Despliegue a S3
* Configuración de AWS S3: Creo un bucket en S3 para almacenar los archivos estáticos de la aplicación:

- Nombre del bucket: mi-bucket-angular-app.
- Subida de Artefactos a S3: En la etapa de despliegue de CodePipeline, configuro la acción para subir  los archivos generados en dist/browser al bucket de S3.

* Acción de Despliegue: Selecciono S3 como proveedor de despliegue y configuro el bucket y el prefijo correspondientes.
* Configuración de Hosting Estático en S3
- Habilitación del Hosting Estático: Configuro el bucket de S3 para servir contenido estático y habilito el Hosting Estático en las propiedades del bucket.
- Políticas del Bucket: Aseguro que las políticas del bucket permiten el acceso público, si es necesario.