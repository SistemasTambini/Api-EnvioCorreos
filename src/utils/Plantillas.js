function plantillaCumpleTipo1(nombre, apellido) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Feliz Cumpleaños</title>
      <style>
        body {
          margin: 0;
          background-color: #1a2433;
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border-radius: 10px;
          padding: 30px 25px;
          text-align: center;
          box-shadow: 0 0 12px rgba(0,0,0,0.08);
        }
        .header-logo {
          width: 120px;
          margin-bottom: 25px;
        }
        .titulo {
          color: #e6b645;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .contenido {
          color: #333;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 15px;
        }
        .footer {
          font-size: 11px;
          color: #999;
          border-top: 1px solid #ddd;
          padding-top: 15px;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img
          class="header-logo"
          src="https://api-encuesta-7920396be181.herokuapp.com/assets/tambini/logo_tambini.jpg"
          alt="Logo Notaría Tambini"
        />
        <div class="titulo">🎉 ¡Feliz cumpleaños ${nombre} ${apellido}! 🎉</div>
        <div class="contenido">
          Desde la <strong>Notaría Tambini</strong> te deseamos un día lleno de alegría y buenos momentos.
        </div>
        <div class="contenido">
          ¡Gracias por ser parte de nuestro equipo! 🎂
        </div>
        <div class="footer">
          Este es un mensaje automático, por favor no responder.
        </div>
      </div>
    </body>
    </html>
  `;
}

function plantillaCumpleTipo2(nombre, apellido) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Feliz Cumpleaños</title>
      <style>
        body {
          margin: 0;
          background-color: #1a2433;
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        .container {
          max-width: 650px;
          margin: auto;
          background: #ffffff;
          border-radius: 10px;
          padding: 30px 25px;
          text-align: center;
          box-shadow: 0 0 12px rgba(0,0,0,0.08);
        }
        .titulo {
          color: #e6b645;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .contenido {
          color: #333;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 15px;
        }
        .tarjeta {
          width: 100%;
          max-width: 600px;
          border-radius: 12px;
          margin-top: 20px;
        }
        .footer {
          font-size: 11px;
          color: #999;
          border-top: 1px solid #ddd;
          padding-top: 15px;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="titulo">🎉 ¡Feliz cumpleaños ${nombre} ${apellido}! 🎉</div>
        <div class="contenido">
          Desde la <strong>Notaría Tambini</strong> te deseamos un día lleno de alegría y buenos momentos.
        </div>
        <div class="contenido">
          ¡Gracias por ser parte de nuestro equipo! 🎂
        </div>
        <img
          class="tarjeta"
          src="https://www.notariatambini.com/wp-content/uploads/2025/Cumple/ManuelVillegas.jpeg"
          alt="Tarjeta de cumpleaños Notaría Tambini"
        />
        <div class="footer">
          Este es un mensaje automático, por favor no responder.
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = { plantillaCumpleTipo1, plantillaCumpleTipo2 };