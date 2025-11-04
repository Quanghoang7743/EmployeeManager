# 🎯 Employee Management System
## 📁 Cấu trúc thư mục

```
employee/
├── src/
│   ├── assets/          
│   ├── components/     
│   │   ├── dialogs/     
│   │   ├── loading/     
│   │   ├── navbar/      
│   │   └── pagination/  
│   ├── layouts/         
│   ├── router/          
│   ├── user/            
│   │   ├── page.tsx    
│   │   ├── list-user.tsx 
│   │   └── statsCard.tsx 
│   ├── zustand-store/  
│   │   ├── api-user-state.ts    
│   │   ├── add-user-state.ts    
│   │   ├── filter-state.ts      
│   │   └── pagination-state.ts 
│   ├── lib/
│   │   └── db.json      
│   ├── App.tsx          
│   └── main.tsx        
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Cách khởi chạy dự án

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Quanghoang7743/EmployeeManager.git
cd employee
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start JSON Server (Backend)**
```bash
npm run server
# or
yarn server
```
---

Made with ❤️ using React + TypeScript + Vite
