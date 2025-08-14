# 🎓 Student Feedback Portal

A web-based portal for gathering and analyzing student feedback on courses and instructors. Easily submit feedback, view summaries, and enhance educational experiences.
[Deployed Link](https://student-feedback-portal-kappa.vercel.app/)

---

## 🚀 Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Setup & Installation](#setup--installation)  
4. [Usage](#usage)  
5. [Project Structure](#project-structure)  
6. [Contributing](#contributing)  
7. [License](#license)

---

## Features

- 🔹 Students can submit feedback for specific courses  
- 🔹 View aggregated feedback statistics (e.g., average ratings)  
- 🔹 Secure authentication for students  

---

## Tech Stack

- **Backend**: Node.js, Express  
- **Frontend**: (e.g., React , Vite, Tailwind)  
- **Database**: (e.g., MongoDB)  
- **Authentication**: JWT  

---

## Setup & Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/Shantanu-121/Student_Feedback_Portal.git
   cd Student_Feedback_Portal
   ```

2. Install dependencies:  
   ```bash
   npm install          # for frontend
   cd server && npm install 
   ```

3. Configure environment variables:  
   Create a `.env` in the root directory with:
   ```env
   PORT=5000
   MONGO_URI=your_database_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Run the project:  
   ```bash
   npm run dev           
   cd server && npm run dev  
   ```

5. Visit: `http://localhost:5000` (or frontend on : "anything that is shown by Vite")

---

## Usage

### Student

- Register or log in  
- Choose a course  
- Submit feedback via form  
- Optionally edit your existing feedback

### Administrator

- Add courses   

---

## Project Structure

```text
Student_Feedback_Portal/
├── public/            # React (or other) frontend
├── src/
├── server/ (or root)
│   ├── models/        # Mongoose or ORM models
│   ├── routes/        # Express endpoints
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth and validation
│   └── app.js         # Entry point
├── .env.example       # Sample env file
├── package.json
└── README.md          # You are here
```

---

## Contributing

Contributions are welcome! Here's how to help:

1. Fork the repo  
2. Create a new branch:  
   ```bash
   git checkout -b feature/YourFeature
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add awesome feature"
   ```  
4. Push branch:  
   ```bash
   git push origin feature/YourFeature
   ```  
5. Open a Pull Request

Please follow code style conventions and include tests for new features.

---

## License

Distributed under the MIT License. See `LICENSE` for details.

---

## Contact

- **Shantanu** – [@Shantanu-121](https://github.com/Shantanu-121) – singhshantanu121@gmail.com  
- Repository URL: [https://github.com/Shantanu-121/Student_Feedback_Portal](https://github.com/Shantanu-121/Student_Feedback_Portal)

---
