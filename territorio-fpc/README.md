# Territorio FPC — App móvil (React Native + Expo)

App funcional que consume tu API de Express (`/login`, `/register`, `/ciudades`, `/equipos`).

## 1. Crear el proyecto base

```bash
npx create-expo-app@latest territorio-fpc
cd territorio-fpc
```

Borra el `App.js` que viene por defecto y **copia todos los archivos de este
paquete** dentro de la carpeta del proyecto (respetando las carpetas
`screens/`, `api/`, `context/`, `navigation/`, `components/`, y los archivos
`App.js`, `config.js`, `theme.js`, `package.json`, `app.json`,
`babel.config.js`).

## 2. Instalar dependencias

```bash
npm install
npx expo install --fix
```

El segundo comando ajusta automáticamente las versiones de las librerías
nativas a las que son compatibles con tu SDK de Expo instalado (por si
alguna versión del `package.json` queda desactualizada).

## 3. Configurar la URL del backend

Abre `config.js` y pon la **IP local de tu computador** (no `localhost`):

```js
export const API_URL = 'http://TU_IP_LOCAL:3000';
```

Windows: `ipconfig` · Mac/Linux: `ifconfig` — busca la IP de tu red WiFi.
Si usas el emulador de Android, puedes usar `http://10.0.2.2:3000`.

## 4. Levantar el backend

```bash
node server.js
```

Asegúrate de que esté corriendo en el puerto 3000 y que las tablas
`users`, `ciudades` y `equipos` ya existan en tu base de datos.

## 5. Correr la app

```bash
npx expo start
```

Escanea el QR con **Expo Go** desde tu celular (en la misma red WiFi que tu
PC), o presiona `a` para abrir el emulador de Android.

---

## ⚠️ Cosas que adapté/asumí de tu backend

1. **Header de autenticación**: mando el token como
   `Authorization: Bearer <token>`. No vi el contenido de tu
   `authMiddleware.js`, así que si tu middleware espera el token de otra
   forma (por ejemplo sin el prefijo `Bearer`), ajusta esa línea en
   `api/client.js`.

2. **Sin imágenes**: tus tablas `equipos` y `ciudades` no tienen columna
   para guardar una foto/logo, así que en vez de imágenes reales muestro
   círculos con las iniciales del nombre. Si agregas una columna `imagen`
   (URL) en la base de datos y la sirves como estática desde Express, te
   puedo conectar eso fácilmente.

3. **Equipo necesita una ciudad existente**: como `equipos.id_ciudad`
   apunta a `ciudades.id`, el formulario de "Agregar equipo" usa un
   selector (`Picker`) con las ciudades ya creadas, en vez de un campo de
   texto libre como en tu mockup. Por eso hay que crear al menos una
   ciudad antes de poder crear un equipo.

4. **No hay "Primera A / Primera B"**: tu tabla `equipos` no tiene una
   columna de categoría/liga, así que quité ese filtro del mockup. Si
   agregas esa columna al backend, agrego el filtro fácilmente en
   `EquiposListScreen.js`.

5. **Pantalla pública (sin login)**: como todas tus rutas `/equipos` y
   `/ciudades` están protegidas con el middleware `auth`, no se puede
   mostrar nada sin haber iniciado sesión. Por eso la app arranca
   directo en Login/Register, en vez de una "home" pública con equipos
   visibles (eso sí calzaría con el comportamiento real de tu API).

6. **Errores del servidor**: como tus endpoints regresan
   `{ error: '...' }`, los muestro tal cual en un `Alert`. Si cambias los
   mensajes en el backend, se reflejan automáticamente en la app.

## Estructura del proyecto

```
territorio-fpc/
├── App.js
├── config.js              ← URL del backend
├── theme.js                ← colores del diseño
├── babel.config.js
├── package.json
├── app.json
├── api/
│   └── client.js           ← axios + interceptor JWT
├── context/
│   └── AuthContext.js      ← login/register/logout, persistencia
├── navigation/
│   └── AppNavigator.js     ← Auth Stack / Bottom Tabs
├── components/
│   ├── InputField.js
│   ├── PrimaryButton.js
│   └── InitialsCircle.js
└── screens/
    ├── LoginScreen.js
    ├── RegisterScreen.js
    ├── DashboardScreen.js
    ├── EquiposListScreen.js
    ├── EquipoDetailScreen.js
    ├── EquipoFormScreen.js
    ├── CiudadesListScreen.js
    ├── CiudadDetailScreen.js
    └── CiudadFormScreen.js
```
