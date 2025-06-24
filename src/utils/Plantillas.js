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
          src="https://scontent.flim2-1.fna.fbcdn.net/v/t39.30808-6/409852642_304737085879464_3807841060855773250_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGQJBg6JfiCgn6ktt9x2Mr1kY2rqjX_Y7mRjauqNf9juVqFtBJOY4-JFu--kmAGCVKwBEfZJMag3SwOoSGmY44s&_nc_ohc=79t4qdGuVyoQ7kNvwFOj7Zx&_nc_oc=Adn2kOmVA_4B-17YvwQk907ICMX-iichiwd5QtG8DWlwDFzWTiQgbYJWSVjsicK0tGY&_nc_zt=23&_nc_ht=scontent.flim2-1.fna&_nc_gid=abI0lKPVo_w7aJVtU73TPA&oh=00_AfIfKyfO6BkKwdB15HOUm8oBJ7yN5zI4nacahh3liMLrvw&oe=684404F3"
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