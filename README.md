# 🛒 Sales Management System

Hệ thống quản lý bán hàng được xây dựng với Next.js và Firebase, 
hỗ trợ quản lý sản phẩm, khách hàng và đơn hàng theo thời gian thực.

## 🔗 Demo
👉https://sale-management-kzv6.vercel.app/login

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Hosting:** Vercel

## ✨ Tính năng
- 🔐 Đăng nhập / Đăng xuất bằng Email & Password
- 📊 Dashboard thống kê tổng quan (sản phẩm, khách hàng, đơn hàng)
- 📦 Quản lý sản phẩm: thêm, sửa, xóa, tìm kiếm
- 👥 Quản lý khách hàng: thêm, sửa, xóa
- 🧾 Quản lý đơn hàng: tạo và theo dõi đơn hàng
- ⚡ Dữ liệu đồng bộ realtime với Firestore

## 📸 Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5bb68423-688a-4638-8a9a-10af275f64bb" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6fe97f3d-35fd-4cd6-abce-7dffccd3e224" />


## 🚀 Cài đặt & Chạy local

### Yêu cầu
- Node.js 18+
- Firebase project

### Các bước cài đặt

1. Clone repo
\`\`\`bash
git clone https://github.com/nam-noluv/sale-management.git
cd sale-management/sales-management
\`\`\`

2. Cài dependencies
\`\`\`bash
npm install
\`\`\`

3. Tạo file `.env.local` và thêm Firebase config
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

4. Chạy development server
\`\`\`bash
npm run dev
\`\`\`

5. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

## 📁 Cấu trúc thư mục
\`\`\`
sales-management/
├── app/              # Next.js App Router
│   ├── dashboard/    # Trang dashboard
│   ├── products/     # Quản lý sản phẩm
│   ├── customers/    # Quản lý khách hàng
│   └── orders/       # Quản lý đơn hàng
├── components/       # Components tái sử dụng
├── firebase/         # Firebase config
└── context/          # React Context
\`\`\`

## 👤 Tác giả
**Tran Nam**
- GitHub: [@nam-noluv](https://github.com/nam-noluv)
