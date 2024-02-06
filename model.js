import { authorize } from './auth.js'
import { google } from 'googleapis'

export async function readSpreadsheet(spreadsheetId, range) {
  const auth = await authorize()
  const service = google.sheets({version: 'v4', auth});

  const result = await service.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return result.data.values
}

export async function updateSpreadsheet(spreadsheetId, range, valueInputOption, _values) {
  const auth = await authorize()
  const service = google.sheets({version: 'v4', auth})

  const data = [
    {
      range,
      values: _values,
    },
  ]

  var resource = {
      valueInputOption,
      data,
  };
    const result = service.spreadsheets.values.batchUpdate({spreadsheetId, resource});

    return result
}

