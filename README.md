## Folder Structure

```
server/
├── package.json
├── package-lock.json
├── .env
├── .gitignore
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
