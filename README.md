# zenfy-website Backend

The **Zenfy-website Backend** is a robust RESTful API built with Node.js and Express.js that serves as the backend for the [Zenfy platform](https://zenfy.net). It handles user authentication, article and event management, admin functionalities, and contact form submissions. The backend connects to a MongoDB database for data storage and uses Cloudinary for image uploads.

## Zenfy Website Live

**Live Demo:** [Zenfy Website Demo](https://zenfy.net/)

## Tech Stack

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **Cloudinary** for media storage
- **Nodemailer** for email services
- **JWT + bcrypt** for authentication
- **Helmet, Rate Limit, CORS** for security

## Folder Structure

```
server/
├── index.js
├── controllers/
│   ├── admin.controller.js
│   ├── article.controller.js
│   ├── event.controller.js
│   ├── auth.controller.js
│   ├── contact.controller.js
│   └── verifyEmail.controller.js
├── middlewares/
│   ├── admin.middleware.js
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── superAdmin.middleware.js
├── models/
│   ├── admin.model.js
│   ├── article.model.js
│   └── event.model.js
├── routes/
│   ├── auth.route.js
│   ├── contact.route.js
│   ├── health.route.js
│   ├── upload.route.js
│   ├── admin.route.js
│   ├── article.route.js
│   └── event.route.js
├── services/
│   └── sendEmail.js
├── utils/
│   └── hashPassword.js
└── config/
    ├── env.js
    ├── cloudinaryConfig.js
    └── db.js
```

## 👨‍💻 Author

**Eng. Abdelaziz Mohamed**

- [LinkedIn](https://www.linkedin.com/in/abdelaziz)
- [GitHub](https://github.com/Abdelaziz-Mohammed)
