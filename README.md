# url-shortener

План: сначала разработать базовый бэкэнд (разработать некоторые эндпоинты на node.js), потом соединить это все с фронт эндом.

## подключение сервера и базы данных mongoDB
1) начинаем с инициализации проекта
```
$ npm init
```
в корне проекта должен лежать бэкэнд

2) установим базовые зависимости
```
$ npm install express mongoose
```
пакет mongoose отвечает за соединение с базой и за работу с MongoDB

```
$ npm install -D nodemon concurrently
```
-D чтоб попало в dev dependencies

3) добавим скрипты в package.json (скрипт test мы удалили)
```
  "scripts": {
    "start": "node app.js",
    "server": "nodemon app.js"
  },
```
nodemon - пакет позволяющий перезапускать сервер чтоб не делать это вручную

Протестируем скрипты (в app.js напишем `console.log('App')`):
```
$ npm run server
```

4) как создаем базовые приложения на express - для начала мы его подключаем. В node.js
чтоб подключать пакеты есть глобальная функция require

хардкодить константы (номер порта 5000) плохо, нужно выносить в общий конфиг (`app.listen(5000, () => console.log(`App has been started...`))`); установим пакет `config` ($npm i config)
https://www.npmjs.com/package/config
```
$ npm install config
$ mkdir config
$ vi config/default.json
```
в config/default.json будем хранить константы для нашего проекта

 настройка сервера завершена:
```
// как создаем базовые приложения на express - для начала мы его подключаем. В node.js
// чтоб подключать пакеты есть глобальная функция require
const express = require('express')
const config = require('config')

// переменная, кот явл результатом работы ф-и express
// это наш будущий сервер
const app = express()

// с большой буквы ибо константа, если вдруг он не определен по умолч 5000
const PORT = config.get('port') || 5000

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
```

подключимся к mongoDB:
подключ пакет:
```
const mongoose = require('mongoose')
```
вызвать метод `connect`, кот позволит подключ к БД:
т.к. метод `connect` возвращает Promise, то чтоб воспольз удобным синтаксисом async await обернем все в ф-ю:
обертка чтоб польз синтаксисом async await:
```
async function start() {
    try {

    } catch (e) {

    }
}

start()
```

mongoDB site:
1) new Project
.
.
.

```
$ npm run server
```
connection method: Connect Your Application
![set-up](img/1.png)
копируем строчку `mongodb+srv://kseniia:<password>@cluster0.anb76.mongodb.net/app?retryWrites=true&w=majority` и встав ее в config ("mongoUri")
вместо myFirstDatabase ---> app; вмесо <password> вписать свой пароль
теперь:
```
[nodemon] starting `node app.js`
App has been started on port 5000...
```
## теперь нам надо зарегистрировать определенные роуты, кот будут по разному обрабат api запросы с нашего фронд энда
напр для авторизации:
```
app.use('/api/auth')
```

