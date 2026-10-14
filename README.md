# جویریہ کے ناول — Vercel پر لگانے کے مراحل

## فولڈر میں کیا ہے
- index.html : پوری ویب سائٹ (سارے ناول اسی میں ہیں)
- favicon.svg : ٹیب کا چھوٹا نشان
- robots.txt, sitemap.xml : گوگل کے لیے (ڈومین ملنے کے بعد YOUR-SITE.vercel.app کی جگہ اپنا پتہ لکھیں)
- vercel.json : ویب سائٹ کی ہلکی سی سیٹنگ

## پہلے اپنے فون یا کمپیوٹر پر دیکھیں
index.html پر ڈبل کلک کریں، براؤزر میں کھل جائے گی۔

## آپ کی اپنی معلومات
index.html کے آخر میں `var SITE={...}` ہے۔ وہاں whatsapp، supportText اور creditNote لکھ سکتی ہیں۔ خالی چھوڑیں تو وہ حصہ نظر نہیں آئے گا۔

## Vercel پر لگانا (GitHub کے ساتھ)
1. github.com پر مفت اکاؤنٹ بنائیں۔
2. New repository بنائیں (نام: javeria-novels) اور اس فولڈر کی ساری فائلیں Upload کر دیں۔
3. vercel.com پر GitHub سے لاگ ان کریں۔
4. Add New > Project > اپنی javeria-novels repository چنیں > Deploy۔
5. ایک منٹ میں لنک مل جائے گا، جیسے javeria-novels.vercel.app۔

## گوگل پر لانا
1. اپنا لنک مل جائے تو sitemap.xml اور robots.txt میں YOUR-SITE.vercel.app کی جگہ اپنا پتہ لکھ دیں اور دوبارہ Upload کریں۔
2. search.google.com/search-console پر اپنا لنک شامل کریں۔
3. وہاں sitemap.xml جمع کروا دیں۔
