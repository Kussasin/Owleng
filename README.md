После установки проекта попробуйте запустить его.
Если не запускается, то докачайте нужные зависимости.

Оглавление:
1. [Названия](#Названия)
2. [Установка и настройка среды](#Установка-и-настройка-среды)
3. [Как делать pull и push проекта](#Как-делать-pull-и-push-проекта)
4. [Прочитать перед загрузкой на GitHub](#Внимание)
5. [Примеры зависимостей которые были уже установлены](#Примеры-зависимостей-которые-были-уже-установлены)
6. [Полезные ссылки](#Полезные-ссылки)
____
# Правила кода
____
## Названия
[:arrow_up:Оглавление](#Оглавление)
Есть 2 вида названий `PascaleCase` и `camelCase`
- Называем файлы, папки с `PascalCase` например: `ReservationCard.jsx`
- `PascalCase` для компонентов React
- `camelCase` для переменных
- перемеые стараемся начинать с let а не с var
- Называем стили с `camelCase` и добавляем к названию .module `reservationCard.module.css`
- Называем файлы так же как и название папки(не мешаем названия)
- Каждую веб страницу делаем в отдельной папке
____
# Установка и настройка среды
[:arrow_up:Оглавление](#Оглавление)
- Установите node.js
- Установите в папку client `npm install`(скачивает node-modules)(мы будем скачивать все модули отдельно так как node-modules находятся в gitignore).
- Установите ESLint(Он есть в VSCode(Extensions), его надо установить).(Посмотрите видео как он работает. Но в двух словах он подсвечивает ошибками на места где не правильно сделано по шаблону который мы выбрали)
После того как установите его, напишите в консоле следущее:
`npm install -g eslint`
`npx eslint --init`
```
во время установки оно будет спрашивать как установить
- Which framework does your project use? выбираем react
- Does your project use TypeScript? выбираем No
- Where does your code run? выбираем browser
- Which style guide do you want to follow? выбираем Airbnb: https://github.com/airbnb/javascript
- What format do you want your config file to be in? выбираем JSON
- Would you like to install them now? выбираем Yes
- Which package manager do you want to use? выбираем npm
```
____
# Как делать pull и push проекта
[:arrow_up:Оглавление](#Оглавление)

В проекте делаем 
- `git init`(инициализируем гит в проекте)
- `git remote add origin https://github.com/Kussasin/Owleng.git` (соединяем проект с гитхабом)
- `git add .`(готовим все елементы для пуша)
- `git commit -m "название комита(любое, но разумное)"`
- `git push` (что бы запушить в гитхаб)
- `git pull` (что бы скачать версию с гитхаба)
____
# !!! Внимание !!!
[:arrow_up:Оглавление](#Оглавление)
```
Прежде чем делать push вы должны сначала сделать pull, для того что бы не было конфликтов версий.
В дальнейшем мы будем работать на разных ветках(branches).
Прочитайте пожалуйста о Гите как он работает, что бы не было проблем в дальнейшем.
```
____
## Примеры зависимостей которые были уже установлены:
[:arrow_up:Оглавление](#Оглавление)

- `npm i node-modules`
- `npm i react-router-dom`
____
# Полезные ссылки:
[:arrow_up:Оглавление](#Оглавление)
- [Как правильно писать Readme.md](https://github.com/GnuriaN/format-README/blob/master/README.md)
- [Правила оформления JavaScript-кода](https://netology-university.bitbucket.io/codestyle/javascript/)
- [Советы по стилю кода](https://learn.javascript.ru/coding-style)
- [Деструктуризация](https://learn.javascript.ru/destructuring)
- [Руководство по стилю написания кода React](https://webformyself.com/rukovodstvo-po-stilyu-napisaniya-koda-react/)
- [Правила оформления кода на React](https://netology-university.bitbucket.io/codestyle/react/)

