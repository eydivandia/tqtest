'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      router.push('/login')
      return
    }
    
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])
  
  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }
  
  const containerStyle = {
    minHeight: '100vh',
    background: '#f5f5f5',
    padding: '20px'
  }
  
  const headerStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
  
  const cardStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  }
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  }
  
  const statCardStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }
  
  const buttonStyle = {
    padding: '8px 16px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
  
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2>داشبورد مدیریت</h2>
          {user && <p>خوش آمدید، {user.fullName}</p>}
        </div>
        <button onClick={handleLogout} style={buttonStyle}>
          خروج
        </button>
      </div>
      
      <div style={gridStyle}>
        <div style={statCardStyle}>
          <h3>پروژه‌های فعال</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>5</p>
        </div>
        <div style={statCardStyle}>
          <h3>اکیپ‌های کاری</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4caf50' }}>12</p>
        </div>
        <div style={statCardStyle}>
          <h3>صورت وضعیت‌های در انتظار</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff9800' }}>8</p>
        </div>
        <div style={statCardStyle}>
          <h3>هشدارهای سیستم</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#f44336' }}>3</p>
        </div>
      </div>
      
      <div style={cardStyle}>
        <h3>قابلیت‌های سیستم</h3>
        <ul style={{ lineHeight: '2' }}>
          <li>✅ مدیریت پروژه‌ها با ساختار WBS</li>
          <li>✅ کنترل موجودی مصالح</li>
          <li>✅ صورت وضعیت اکیپ‌های اجرایی</li>
          <li>✅ گزارشات جامع مدیریتی</li>
          <li>✅ سیستم هشدار هوشمند</li>
          <li>✅ بروزرسانی لحظه‌ای (Real-time)</li>
        </ul>
      </div>
    </div>
  )
}
