#!/bin/bash

echo "🚀 نصب سیستم مدیریت پروژه..."

# بررسی Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker نصب نیست. لطفاً ابتدا Docker را نصب کنید."
    exit 1
fi

# بررسی Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose نصب نیست. لطفاً ابتدا Docker Compose را نصب کنید."
    exit 1
fi

# ایجاد .env از نمونه
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ فایل .env ایجاد شد. لطفاً آن را ویرایش کنید."
fi

# راه‌اندازی سیستم
echo "🏗️ ساخت و اجرای کانتینرها..."
docker-compose up -d --build

echo "⏳ انتظار برای آماده شدن سرویس‌ها..."
sleep 10

# بررسی وضعیت
docker-compose ps

echo ""
echo "✅ نصب کامل شد!"
echo ""
echo "🌐 دسترسی به سیستم:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "🔑 اطلاعات ورود:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "📚 دستورات مفید:"
echo "   docker-compose logs -f    # مشاهده لاگ‌ها"
echo "   docker-compose restart     # ری‌استارت"
echo "   docker-compose down        # توقف سیستم"
