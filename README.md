# Plataforma autoevaluable - Matemáticas 3.º de secundaria

Aplicación web estática para el examen extraordinario de Matemáticas de 3.º de secundaria. Funciona con HTML, CSS y JavaScript puro, sin servidor, frameworks ni proceso de compilación.

## Archivos

- `index.html`: entrada principal de la plataforma.
- `styles.css`: diseño mobile-first, modo claro/oscuro y Venn adaptable.
- `app.js`: datos del examen, normalizadores, corrección, puntuación, localStorage, informe y envío.
- `config.example.js`: plantilla de configuración.
- `config.js`: configuración activa del endpoint de Formspree.
- `tests.html`: ejecutor manual de pruebas internas.
- `.nojekyll`: evita procesamiento de Jekyll en GitHub Pages.

## Ejecutar localmente

Puedes abrir `index.html` directamente en el navegador. Para probarlo con servidor local:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000/
```

Las pruebas internas están en:

```text
http://localhost:8000/tests.html
```

## Configurar Formspree

1. Crea una cuenta o inicia sesión en Formspree.
2. Crea un formulario nuevo y copia el endpoint, con formato parecido a `https://formspree.io/f/xxxxxxx`.
3. Abre `config.js`.
4. Coloca el endpoint en `FORMSPREE_ENDPOINT`.
5. En Formspree, autoriza el dominio de GitHub Pages que usarás, por ejemplo `usuario.github.io`.
6. Activa protección contra spam. La app ya envía un campo honeypot `_gotcha`; puedes complementar con CAPTCHA desde Formspree si lo deseas.

Si `FORMSPREE_ENDPOINT` queda vacío, la plataforma corrige el examen, muestra retroalimentación y permite descargar informes `.txt` y `.csv`, pero avisa que el envío al docente no está configurado.

## Publicar en GitHub Pages

1. Sube todos los archivos de esta carpeta a un repositorio de GitHub.
2. En el repositorio, entra a `Settings` > `Pages`.
3. En `Build and deployment`, elige `Deploy from a branch`.
4. Selecciona la rama principal y la carpeta raíz.
5. Guarda los cambios.
6. Cuando GitHub termine la publicación, abre la URL de Pages.

La plataforma usa rutas relativas, por lo que también funciona si el repositorio se publica como subruta.

## Cambiar puntuación o nota mínima

En `app.js`:

- Cambia la nota mínima en `PASSING_SCORE`.
- Cambia la distribución en `SCORE_CONFIG`.

La suma de las secciones debe ser exactamente 100. Si no suma 100, la app muestra un error visible de configuración.

Nota: el examen original solo trae impresos 20 puntos en la sección I y 10 puntos en la sección V. La distribución de 100 puntos usada aquí es una propuesta editable para autoevaluación.

## Seguridad y alcance

Esta es una aplicación estática: la clave del examen vive en JavaScript del cliente. Es adecuada para práctica, recuperación o evaluación de bajo riesgo. Para una evaluación segura de alto riesgo, la corrección debe hacerse en un backend controlado por el docente.

La app no recolecta IP, geolocalización ni datos innecesarios. Guarda borradores únicamente en `localStorage` del navegador del estudiante.

## Pruebas incluidas

`tests.html` comprueba:

- `x²` y `x^2`.
- Signo menos Unicode.
- Términos reordenados.
- Coeficiente 1 implícito.
- Diferencia entre `x<3` y `x≤3`.
- Campos vacíos.
- Respuestas numéricas con espacios o prefijo como `P(4)=`.
- Fallos de red simulados.
- Suma exacta de `SCORE_CONFIG`.

Antes de publicar, recorre un intento completo en móvil y escritorio: inicio, guardado, navegación, revisión, entrega, retroalimentación, descarga del informe y envío con Formspree configurado o simulado.
