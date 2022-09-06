Проект по созданию коротких ссылок.

Чтобы запустить проект нужно: 
1. Склонировать репозиторий
2. Установить зависимости (npm install)
3. Запустить проект (npm run start)
4. Перейти по адресу http://localhost:3000

Описание:
В качестве реализации пагинации был выбран Infinite Scroll. так как АПИ не возвращает total count (общее кол-во элементов) для /statistics. Из за этого невозможно построить точное кол-во страниц

Из необзятальных задач было реализовано:
1. Небольшая адаптивность
2. Копирование ссылки при клике на нее
