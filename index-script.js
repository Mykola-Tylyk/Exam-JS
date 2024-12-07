const form = document.forms[0];
const divError = document.getElementById('divError');
const ulResult = document.getElementById('ulResult');

let array = [];
let id = 1;

//кнопка add и добавлен слушатель на клик
const addButton = document.getElementById('add');
addButton.addEventListener('click', function (ev) {
    ev.preventDefault();

    let user = form.nameValue.value;                                              //значение с инпута

    if (/^\s*[a-zA-Zа-яА-ЯёЁіІ0-9]+\s*=\s*[a-zA-Zа-яА-ЯёЁіІ0-9]+\s*$/.test(user)) {     //регулярное выражение для проверки вводимого значения
        const [name, value] = user.split('=');                    //значение с инпут делится на name и value
        array.push({id: id, name: name.trim(), value: value.trim()});                   //запаковка в объект с присвоением id и отправка в массив
        id += 1;                                                                        //увеличение значения id на 1
        showError('');                                                                  //функция не выведет сообщение об ошибке и уберет, если оно было
    } else {
        showError('Error "Name=Value"');                                                //функция выведет сообщение об ошибке
        return
    }
    form.nameValue.value = '';                                                          //очищает инпут
    showList(array);                                                                    //выводит результат в DOM
});

//функция вывода ошибки
function showError(message) {
    divError.innerText = message;
}

//функция вывода массива объектов в li и добавлен слушатель на клик
function showList(arr) {
    ulResult.innerHTML = '';
    arr.forEach(itemObjekt => {
        const li = document.createElement('li');
        li.innerText = `${itemObjekt.name}=${itemObjekt.value}`;
        li.dataset.id = itemObjekt.id;                                                   //добовляется data-id в li соответствующее id объекта
        li.addEventListener('click', function () {
            this.classList.toggle('selected');                                     //при клике на li добавляется class в li - selected
        });
        ulResult.appendChild(li);
    });
}

//кнопка sort-by-name и добавлен слушатель на клик
const sortByNameButton = document.getElementById('sort-by-name');
sortByNameButton.addEventListener('click', function (ev) {
    ev.preventDefault();
    foSort('name');
});

//кнопка sort-by-value и добавлен слушатель на клик
const sortByValueButton = document.getElementById('sort-by-value');
sortByValueButton.addEventListener('click', function (ev) {
    ev.preventDefault();
    foSort('value');
});

//функция для сортировки имя или значение
function foSort(nameOrValue) {
    array.sort((a, b) => {
        if (a[nameOrValue] > b[nameOrValue]) {
            return 1;
        }
        if (a[nameOrValue] < b[nameOrValue]) {
            return -1;
        }
        if (a[nameOrValue] === b[nameOrValue]) {
            return 0;
        }
    });
    showList(array);
}

//кнопка delete и добавлен слушатель на клик
const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', function (ev) {
    ev.preventDefault();
    const selectedElement = ulResult.querySelectorAll('.selected');                   //querySelectorAll находит все li с классом .selected, получил NodeList (колекцию)
    const idSelectedElement = Array.from(selectedElement).map(li => +(li.dataset.id));         //Array.from переводит колекцию в обычный массив, map достает data-id из li. Получается масси из чисел id которые нужно удалить
    array = array.filter(item => !idSelectedElement.includes(item.id));                                         //из array достается id и сравнивается с id выделенных элементов, если они совпали то true и инвертируется в falce, что бы фильтр не включал этот элемент в новый возращаемый массив
    showList(array);                                                                                            //обновляется вывод в DOM
});
