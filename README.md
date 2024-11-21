# Movie List Application 🎬

This is a **Next.js** application for managing a list of movies. It includes features for user authentication and CRUD operations.

---

## **Features**

### **Authentication**
- **Login**: Secure login functionality.
- **Register**: Create a new user account.

### **Movie Management**
- **Create**: Add new movies with an image, name, and release year.
- **Read**: View all movies in the list.
- **Update**: Edit movie details.
- **Delete**: Remove movies from the list.

---

## **Requirements**
- **Node.js**: Version `20.0.0` or higher.
- **npm**: Version `6.x` or higher.

---

## **Installation Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/technostacksgit/movie-demo
   cd movie-demo
Install Dependencies
```bash
npm install
```
Note: If you encounter issues, use:

```bash
npm install --legacy-peer-deps
```
Start the Development Server

```bash
npm run dev
```
Open the Application Open your browser and navigate to:

```bash
http://localhost:3000
```

## **Scope of the Project**
- Authentication
- Login: Secure login with error handling.
- Register: Create a new account with form validation.
- Movie Management
- Create: Add movies with the following fields:
- Image: Upload or provide a URL.
- Name: Movie title.
- Release Year: Year of release.
- Read: View all movies in a user-friendly interface.
- Update: Edit movie details easily.
- Delete: Remove movies from the list.

## **Project Structure**

```bash
project-directory/
├── components/        # Reusable UI components
├── pages/             # Next.js pages
│   ├── api/           # API routes for server-side logic
│   ├── auth/          # Login and Register pages
│   └── movies/        # CRUD functionality for movies
├── public/            # Static files
├── styles/            # CSS modules
└── README.md          # Documentation
```

## **Technologies Used**
- Next.js: Framework for server-side rendering and client-side rendering.
- React: Frontend library for building user interfaces.
- Node.js: Backend runtime.
- CSS Modules: Scoped styling.
- MongoDB: Database for storing user and movie data.
- JWT: Secure token-based authentication.
- Contributing

## **Fork the repository.**

Create a new branch:
```
git checkout -b feature-name
```
Make your changes and commit:
```
git commit -m "Description of changes"
```
Push to your branch:
```
git push origin feature-name
```
Submit a pull request.

## **License**
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
- For any inquiries or feedback, feel free to reach out to:

- Email: hussain@technostacks.com
- GitHub: technostacksgit
