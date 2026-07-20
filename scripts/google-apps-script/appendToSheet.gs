/**
 * Apps Script Web App to receive RSVP POSTs and append to a Google Sheet.
 *
 * Setup:
 * 1. En la planilla, ve a Extensiones -> Apps Script y pega este archivo completo.
 * 2. Publicar -> Implementar como aplicación web -> Ejecutar como: "Yo" ->
 *    Acceso: "Cualquiera".
 * 3. Copia la URL de la aplicación web y úsala como `GOOGLE_APPS_SCRIPT_URL`.
 *
 * Espera recibir JSON POST con campos:
 * { fullName, spouseName, attendance, dietaryRestrictions, message, timestamp }
 */

const SHEET_ID = '1uQTN1qhvf-qXzqp9gmMBSEKC5EtWOLbaBVhb5OMxuGg';
const SHEET_NAME = 'Confirmaciones';
const HEADERS = ['Fecha de envío', 'Nombre completo', 'Nombre de marido/señora', 'Asistencia', 'Restricciones alimentarias', 'Mensaje para los novios'];

function doPost(e) {
  try {
    const content = e.postData && e.postData.contents ? e.postData.contents : null;
    if (!content) return buildResponse(400, { error: 'No payload' });

    const data = JSON.parse(content);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    const row = [
      data.timestamp || new Date().toISOString(),
      data.fullName || '',
      data.spouseName || '',
      data.attendance === 'yes' ? 'Sí, asistiré' : 'No podré asistir',
      data.dietaryRestrictions || '',
      data.message || ''
    ];

    sheet.appendRow(row);

    return buildResponse(200, { ok: true });
  } catch (err) {
    return buildResponse(500, { error: String(err) });
  }
}

function buildResponse(status, obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
