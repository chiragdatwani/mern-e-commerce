import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Chirag Datwani',
        email: 'chirag@mail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Dimple Datwani',
        email: 'dimple@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users;