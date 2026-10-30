const SHEET_NAME = 'Registrations';
const HEADERS = ['เวลา','เลขทะเบียน','ชื่อ-นามสกุล','เบอร์โทร','หน่วยงาน','ผู้ติดตาม','หมายเหตุ'];

function doGet() {
  return ContentService
    .createTextOutput('MESOOK registration API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('ไม่พบ Google Sheet ที่ผูกกับ Apps Script');

  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);

  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const raw = e && e.postData ? e.postData.contents : '';
    if (!raw) throw new Error('ไม่พบข้อมูลที่ส่งมา');

    const data = JSON.parse(raw);
    const fullName = String(data.fullName || '').trim();
    if (!fullName) throw new Error('กรุณากรอกชื่อ-นามสกุล');

    const regNo = String(data.regNo || '').trim() ||
      ('MS-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyMMdd-HHmmss'));

    lock.waitLock(10000);
    const sh = getSheet_();
    sh.appendRow([
      new Date(),
      regNo,
      fullName,
      String(data.phone || '').trim(),
      String(data.organization || '').trim(),
      Number(data.guests || 0),
      String(data.note || '').trim()
    ]);
    SpreadsheetApp.flush();

    return json_({ok:true, regNo:regNo, name:fullName});
  } catch (err) {
    return json_({ok:false, message:String(err && err.message ? err.message : err)});
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
