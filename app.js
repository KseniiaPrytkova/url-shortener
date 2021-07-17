// как создаем базовые приложения на express - для начала мы его подключаем. В node.js
// чтоб подключать пакеты есть глобальная функция require
const express = require('express')
const config = require('config')
// чтоб подключ к mongoDB:
const mongoose = require('mongoose')
const nodemon = require('nodemon')

// переменная, кот явл результатом работы ф-и express
// это наш будущий сервер
const app = express()

// app.use('/api/auth')

// с большой буквы ибо константа, если вдруг он не определен по умолч 5000
const PORT = config.get('port') || 5000

async function start() {
    try {
        // подождем пока промис завершится
        // 1й парам - тот url адр по кот мы будем добавлять бд
        // 2й парам - набор опций 
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        // выйдем из node.js с помощью глобал объекта process и его метода exit
        process.exit(1)

    }
}

start()