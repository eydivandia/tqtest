export const metadata = {
  title: 'سیستم مدیریت پروژه - طاق گستران غرب',
  description: 'سیستم جامع مدیریت پروژه‌های ساختمانی',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ margin: 0, fontFamily: 'Tahoma, Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
