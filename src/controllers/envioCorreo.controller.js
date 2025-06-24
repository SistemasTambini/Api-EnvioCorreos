const { crearEnvioCorreo, procesarEnvioCorreo, procesarEnvioPorGrupo } = require('../services/envioCorreoService');

exports.crear = async (req, res) => {
  try {
    const { asunto, contenido, plantilla_id, tipo_envio, destinatarios } = req.body;

    const envio = await crearEnvioCorreo({
      asunto,
      contenido,
      plantilla_id,
      tipo_envio,
      destinatarios
    });

    res.status(201).json({ id: envio.id, message: 'Envío registrado correctamente' });
  } catch (error) {
    console.error('❌ Error al crear envío:', error);
    res.status(500).json({ error: 'Error al registrar el envío' });
  }
};

exports.enviar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await procesarEnvioCorreo(id);

    res.json({
      message: 'Correos enviados',
      enviados: result.enviados,
      total: result.total,
      fallidos: result.fallidos,
      errores: result.errores
    });
  } catch (error) {
    console.error('❌ Error al enviar correos:', error);
    res.status(500).json({ error: 'Error al enviar correos' });
  }
};

exports.enviarPorGrupo = async (req, res) => {
  try {
    const { tipoId } = req.params;
    const { asunto, contenido, plantilla_id, cc } = req.body;

    const resultado = await procesarEnvioPorGrupo({
      tipo_id: tipoId,
      asunto,
      contenido,
      plantilla_id,
      cc
    });

    res.json({
      message: 'Envío por grupo procesado',
      resumen: {
        total_registros: resultado.total_obtenidos,
        correos_validos: resultado.validos,
        enviados: resultado.enviados,
        fallidos: resultado.fallidos,
        ignorados_por_error: resultado.invalidos,
        errores: resultado.errores
      }
    });
  } catch (error) {
    console.error('❌ Error al enviar por grupo:', error);
    res.status(500).json({ error: error.message || 'Error al enviar correos por grupo' });
  }
};
