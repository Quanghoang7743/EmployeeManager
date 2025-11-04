# 🎯 Employee Management System

A modern, feature-rich employee management system built with React, TypeScript, and Material-UI. This application provides a comprehensive solution for managing employee data with advanced filtering, CRUD operations, and a beautiful dark-themed UI.

## ✨ Features

### 📊 Dashboard & Statistics
- **Real-time Statistics Cards**: Display total users, active users, and new users
- **Dynamic Data**: Stats update automatically based on filtered results
- **Loading States**: Smooth loading indicators for better UX

### 👥 User Management
- **Complete CRUD Operations**:
  - ✅ Create new employees with detailed information
  - ✅ Edit existing employee data
  - ✅ Delete employees with confirmation
  - ✅ View employee list with pagination

### 🔍 Search & Filter
- **Multi-field Search**:
  - Search by Name (partial match, case-insensitive)
  - Search by Email (partial match, case-insensitive)
  - Filter by Department (dropdown selection)
- **Real-time Filtering**: Results update as you type
- **Combined Filters**: Use multiple filters simultaneously

### 📄 Pagination
- **Client-side Pagination**: Fast and responsive
- **Customizable Rows per Page**: 10, 25, 50, 100 options
- **Navigation Controls**: Previous/Next page buttons
- **Item Count Display**: Shows current range (e.g., "1-10 of 50")

### 🎨 Modern UI/UX
- **Dark Theme**: Professional dark-themed interface
- **Material-UI Components**: Consistent, modern design
- **Responsive Layout**: Works on all screen sizes
- **Interactive Elements**: Hover effects, smooth transitions
- **Toast Notifications**: Success/error feedback for all actions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with Hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Material-UI (MUI)** - Component library
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **DayJS** - Date manipulation
- **React Toastify** - Notification system

### Backend/API
- **JSON Server** - Mock REST API for development

## 📁 Project Structure

```
employee/
├── src/
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # Reusable components
│   │   ├── dialogs/     # Dialog components (Add/Edit User)
│   │   ├── loading/     # Loading spinner component
│   │   ├── navbar/      # Navigation component
│   │   └── pagination/  # Pagination component
│   ├── layouts/         # Layout components
│   ├── router/          # Route configuration
│   ├── user/            # User-related pages
│   │   ├── page.tsx     # Main user page
│   │   ├── list-user.tsx # User list component
│   │   └── statsCard.tsx # Statistics cards
│   ├── zustand-store/   # State management
│   │   ├── api-user-state.ts    # User API & data
│   │   ├── add-user-state.ts    # Dialog state
│   │   ├── filter-state.ts      # Filter state
│   │   └── pagination-state.ts  # Pagination state
│   ├── lib/
│   │   └── db.json      # JSON Server database
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

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
This will start the JSON Server on `http://localhost:3000`

4. **Start Development Server (Frontend)**
```bash
npm run dev
# or
yarn dev
```
This will start Vite dev server on `http://localhost:5173`

5. **Open your browser**
Navigate to `http://localhost:5173`

## 📝 Usage

### Adding a New Employee
1. Click the **"Add user"** button in the top-right corner
2. Fill in the employee details:
   - Name (required)
   - Email (required)
   - Phone
   - Department
   - Join Date
3. Click **"Save"** to create the employee

### Editing an Employee
1. Click the **Edit icon (✏️)** next to the employee you want to edit
2. The dialog will open with pre-filled data
3. Modify the desired fields
4. Click **"Update"** to save changes

### Deleting an Employee
1. Click the **Delete icon (🗑️)** next to the employee
2. Confirm the deletion in the popup
3. The employee will be removed from the list

### Filtering Employees
- **By Name**: Type in the "Search by name..." field
- **By Email**: Type in the "Search by email..." field
- **By Department**: Select a department from the dropdown
- Use multiple filters together for precise results

### Pagination
- Use the dropdown to change rows per page (10, 25, 50, 100)
- Click **"Previous"** or **"Next"** to navigate pages
- View current range in the format "1-10 of 50"

## 🔌 API Endpoints

The application uses JSON Server with the following endpoints:

### Get All Users
```
GET /users
Response: Array of user objects
```

### Get User by ID
```
GET /users/:id
Response: Single user object
```

### Create User
```
POST /users
Body: { name, email, phone, department, joinDate }
Response: Created user object
```

### Update User
```
PUT /users/:id
Body: { name, email, phone, department, joinDate }
Response: Updated user object
```

### Delete User
```
DELETE /users/:id
Response: Empty object
```

### Filter by Department
```
GET /users?department=IT
Response: Array of filtered users
```

## 🎨 UI Components

### Color Palette
- **Background**: `#0B1437` (Dark Blue)
- **Cards**: `#1a2847` (Medium Blue)
- **Borders**: `#2d3a5f` (Light Blue)
- **Primary**: `#a855f7` (Purple)
- **Text**: `#fff` (White), `#8b92b0` (Gray)
- **Hover**: `#9333ea` (Dark Purple)
- **Delete**: `#ef4444` (Red)

### Key Features
- Glass-morphism effects on dialogs
- Smooth hover transitions
- Consistent spacing and typography
- Accessibility-friendly design

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start JSON Server

### State Management

The app uses **Zustand** for state management with separate stores:

1. **User Store** (`api-user-state.ts`)
   - Manages user data and API calls
   - Handles CRUD operations
   - Implements filtering logic

2. **Filter Store** (`filter-state.ts`)
   - Manages search/filter state
   - Provides filter values and setters

3. **Pagination Store** (`pagination-state.ts`)
   - Controls pagination state
   - Handles page navigation

4. **Dialog Store** (`add-user-state.ts`)
   - Manages dialog open/close state
   - Controls ADD/EDIT modes

## 🔒 Data Schema

### User Object
```typescript
interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  joinDate: string; // Format: YYYY-MM-DD
}
```

### Departments
- IT
- Engineering
- Marketing
- Sales
- HR
- Finance
- Design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Quang Hoang**
- GitHub: [@Quanghoang7743](https://github.com/Quanghoang7743)

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- Zustand for simple state management
- JSON Server for easy API mocking
- React community for continuous support

---

Made with ❤️ using React + TypeScript + Vite
