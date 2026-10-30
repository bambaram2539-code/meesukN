MESOOK REGISTRATION — FIXED VERSION
====================================
ชุดนี้แก้ปัญหา "Failed to fetch" โดยหน้าเว็บส่ง POST ไป Apps Script แบบ no-cors
และสร้างเลขลงทะเบียนจากหน้าเว็บก่อนส่ง

ไฟล์:
- index.html : อัปโหลด GitHub/Vercel
- Code.gs    : วางใน Google Apps Script
- vercel.json
- README.txt

Apps Script URL ที่ฝังไว้:
https://script.google.com/macros/s/AKfycbyxDkYTUqhfoQZBWtZI1XUjRg-bQ6a-IyA7eWgIdqfr1VFLYlk52iQx6n9zLLDDaTiE/exec

ขั้นตอนติดตั้ง:
1) เปิด Google Sheet > Extensions > Apps Script
2) แทน Code.gs เดิมด้วย Code.gs ในชุดนี้ แล้ว Save
3) Deploy > Manage deployments > Edit
4) Version = New version
5) Execute as = Me
6) Who has access = Anyone
7) Deploy และอนุญาตสิทธิ์
8) ถ้า Google ให้ URL /exec ใหม่ ต้องแก้ APPS_SCRIPT_URL ใน index.html ให้ตรง URL ใหม่
9) GitHub: แทน index.html และ vercel.json ที่ root repository แล้ว Commit
10) รอ Vercel Deployment เป็น Ready
11) ทดสอบกรอกข้อมูล แล้วตรวจชีต Registrations

ทดสอบ Backend:
เปิด URL /exec ใน Private/Incognito
ควรเห็น: MESOOK registration API is running
ถ้าขอ Login Google ให้กลับไปตรวจ Who has access = Anyone

สำคัญ:
โหมด no-cors ทำให้หน้าเว็บส่งข้อมูลข้ามโดเมนได้โดยไม่ติด CORS
แต่เบราว์เซอร์ไม่สามารถอ่าน JSON ตอบกลับจาก Apps Script ได้
ดังนั้นควรตรวจ Google Sheet หลังทดสอบครั้งแรกเพื่อยืนยันว่า Deployment ถูกต้อง
