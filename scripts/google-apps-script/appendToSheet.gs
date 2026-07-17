/**
 * Apps Script Web App to receive RSVP POSTs and append to a Google Sheet.
 *
 * Setup:
 * 1. Crear una hoja de cálculo en Google Sheets.
 * 2. Copiar el ID de la hoja (parte en la URL entre /d/ y /edit).
 * 3. Reemplazar SHEET_ID y SHEET_NAME abajo.
 * 4. Publicar -> Implementar como aplicación web -> Ejecutar la aplicación como: "Yo (propietario)" -> Acceso: "Cualquiera, incluso anónimo" (o según tus necesidades).
 * 5. Usar la URL pública en `GOOGLE_APPS_SCRIPT_URL`.
 *
 * Espera recibir JSON POST con campos:
 * { name, email, phone, rsvp, guestsCount, meal, note, timestamp }
 */

const SHEET_ID = 'REPLACE_WITH_SHEET_ID';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const content = e.postData && e.postData.contents ? e.postData.contents : null;
    if (!content) return buildResponse(400, { error: 'No payload' });

    const data = JSON.parse(content);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    const row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.rsvp || '',
      data.guestsCount || '',
      data.meal || '',
      data.note || ''
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
