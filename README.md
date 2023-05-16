# Servidor web para el reconocimiento de personal de la empresa "Market Plaza Lucy"

Esta sistema nos permite tener el backend de la aplicación móvil que se encarga de reconocer a los empleados de la empresa "Market Plaza Lucy". El sistema se encarga de recibir las imágenes de los empleados y las compara con las imágenes de los empleados registrados en la base de datos. Si el empleado es reconocido, el sistema devuelve el empleado reconocido y el nivel de confianza que tiene el sistema de que el empleado es quien dice ser. Para tal fin se utilizaron las siguientes tecnologías:

- AWS Rekognition
- AWS s3
- MondoDB
- Node.js

## Requisitos para correr la aplicación

- Tener instalado [Node.js](https://nodejs.org/es/) en su versión 18 o superior.
- Tener instalado [Git](https://git-scm.com/) en su versión 2.32.0 o superior.
- Tener instalado [MongoDB](https://www.mongodb.com/try/download/community) en su versión 5.0.2 o superior.
- Tener una cuenta en [AWS](https://aws.amazon.com/es/) y tener creadas las credenciales de acceso.
- Tener un bucket en [AWS s3](https://aws.amazon.com/es/s3/) y tener creadas las credenciales de acceso.

## Instalación

1. Clonar el repositorio en su máquina local.

```bash
git clone git@github.com:carlosCACB333/lucyRekognitionServer.git
```

2. Instalar las dependencias del proyecto.

```bash
npm install
```

3. Crear un archivo .env en la raíz del proyecto y agregar las siguientes variables de entorno.

```bash
AWS_ACCESS_KEY_ID = 'xxxxxxxxxxxxxxxxxxxx'
AWS_SECRET_ACCESS_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
MONGO_URL = 'mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority'
BUCKET_NAME = 'recog-data-ia'
AWS_REGION = 'us-east-1'
```

4. Iniciar el servidor de desarrollo.

```bash
npm run dev
```
