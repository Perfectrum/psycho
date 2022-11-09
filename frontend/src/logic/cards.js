
const FAKE_CARDS = [
    [
        {
            id : 0,
            name : 'Пицца',
            desc : 'Вкусно но мало',
            tags : []
        },
        {
            id : 1,
            name : 'Сходить за чаем',
            desc : 'Сходить за кофе',
            tags : []
        },
    ],
    [
        {
            id : 2,
            name : 'Участие в хакатоне',
            desc : 'Пишу фронт и придумываю карточки',
            tags : []
        },
    ],
    [
        {
            id : 3,
            name : 'Сделать алгосы',
            desc : 'Мишунин опять отправил правики ааъ',
            tags : []
        },
        {
            id : 4,
            name : 'Доделать бд',
            desc : 'Нужно закончить контест по бд (23:00)',
            tags : []
        },
        {
            id : 5,
            name : 'Сходить в магазин',
            desc : 'Молоко, Яйца, Хлеб, Пицца',
            tags : []
        },
        {
            id : 6,
            name : 'Скачать javascript',
            desc : 'Что бы что?',
            tags : []
        },

    ]
];

let lastId = 6;

let callbackFunc = () => {}
export function callback(f) {
    callbackFunc = f;
}

function remove(arr, item) {
    const idx = arr.indexOf(item);
    if (idx < 0) return;
    arr.splice(idx, 1);
}

export function move(card) {
    if (FAKE_CARDS[2].includes(card)) {
        remove(FAKE_CARDS[2], card);
        FAKE_CARDS[1].push(card);
        callbackFunc();
        return;
    }
    if (FAKE_CARDS[1].includes(card)) {
        remove(FAKE_CARDS[1], card);
        FAKE_CARDS[0].push(card);
        callbackFunc();
        return;
    }
}

export function getCards() {
    return FAKE_CARDS;
}

export function addCard(name, desc, bucket) {
    FAKE_CARDS[2].push({
        id : ++lastId,
        name,
        desc,
        tags: []
    })
}
