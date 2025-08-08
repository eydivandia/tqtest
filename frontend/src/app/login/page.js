'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/dashboard')
      } else {
        setMessage(data.error || 'خطا در ورود')
      }
    } catch (error) {
      setMessage('خطا در اتصال به سرور')
    } finally {
      setLoading(false)
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  }

  const boxStyle = {
    background: 'white',
    borderRadius: '10px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    maxWidth: '400px',
    width: '100%'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '5px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box'
  }

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: loading ? '#ccc' : '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background 0.3s'
  }

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>سیستم مدیریت پروژه</h1>
        <h3 style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>شرکت طاق گستران غرب</h3>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>نام کاربری</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              style={inputStyle}
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label>رمز عبور</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              style={inputStyle}
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'در حال ورود...' : 'ورود به سیستم'}
          </button>
        </form>
        
        {message && (
          <p style={{ textAlign: 'center', color: '#f44336', marginTop: '20px' }}>
            {message}
          </p>
        )}
        
        <div style={{ marginTop: '30px', padding: '15px', background: '#f5f5f5', borderRadius: '5px' }}>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>اطلاعات ورود پیش‌فرض:</strong>
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>نام کاربری: admin</p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>رمز عبور: admin123</p>
        </div>
      </div>
    </div>
  )
}
