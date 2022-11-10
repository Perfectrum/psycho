
import * as connector from './connector';

const bucket_eq = [
    'quant', 'day', 'week', 'month', 'year'
];

export const BUCKETS = {
    quant: bucket_eq[0],
    day: bucket_eq[1],
    week: bucket_eq[2],
    month: bucket_eq[3],
    year: bucket_eq[4]
};

const FAKE_CARDS = [
    [
        {
            id: 0,
            name: 'Пицца',
            desc: 'Вкусно но мало',
            bucket: BUCKETS.quant,
            parent: null,
            hasChild: false,
            fullName: [],
            tags: []
        },
        {
            id : 1,
            name : 'Сходить за чаем',
            desc : 'Сходить за кофе',
            bucket: BUCKETS.day,
            parent: null,
            hasChild: false,
            fullName: [],
            tags : ['Win hackathon']
        },
    ],
    [
        {
            id : 2,
            name : 'Участие в хакатоне',
            desc : 'Пишу фронт и придумываю карточки',
            bucket: BUCKETS.week,
            parent: null,
            hasChild: false,
            fullName: [],
            tags : ['Win hackathon']
        },
    ],
    [
        {
            id : 3,
            name : 'Сделать алгосы',
            desc : '',
            bucket: BUCKETS.day,
            parent: null,
            hasChild: false,
            fullName: [],
            tags : ['Win hackathon']
        },
        {
            id : 4,
            name : 'Доделать бд',
            desc : 'Нужно закончить контест по бд (23:00)',
            bucket: BUCKETS.day,
            parent: null,
            hasChild: false,
            fullName: [],
            tags : ['Win hackathon']
        },
        {
            id : 5,
            name : 'Сходить в магазин',
            desc : 'Молоко, Яйца, Хлеб, Пицца',
            bucket: BUCKETS.week,
            parent: null,
            hasChild: false,
            fullName: [],
            tags : ['Win hackathon']
        },
        {
            id : 6,
            name : 'Скачать javascript',
            desc : 'Что бы что?',
            bucket: BUCKETS.year,
            parent: null,
            hasChild: false,
            fullName: [],
            tags : ['Win hackathon']
        },

    ]
];

let lastId = 6;
let filter = null;
let goalFilter = null;

let callbackFunc = () => {}
export function callback(f) {
    callbackFunc = f;
}

function remove(arr, item) {
    const idx = arr.indexOf(item);
    if (idx < 0) return;
    arr.splice(idx, 1);
}

export async function move(card) {
    if (card)
}

export async function getCards() {
    console.log('REQ1');
    return (await connector.getAllTasks()).map(
        e => e.filter(x => 
            (filter === null || x.bucket === filter) 
            && (goalFilter === null || x.tags.includes(goalFilter)
        )).map(x => { x.bucket = bucket_eq[x.bucket]; return x; })
    );
}

export function cmpBuckets(a, b) {
    return bucket_eq.indexOf(a) <= bucket_eq.indexOf(b);
}

export function setFilter(f) {
    filter = f;
    callbackFunc();
}

export function setGoalFilter(goal) {
    goalFilter = goal;
    callbackFunc();
}

export async function addCard(name, desc, bucket, parent, tags) {

    /*
    let found = false;
    let fullName = [];
    if (parent !== null) {
        for (const b of FAKE_CARDS) {
            if (found) break;
            for (const i of b) {
                if (i.id === parent) {
                    i.hasChild = true; 
                    fullName.push(i.name, ...i.fullName);
                    found = true;
                    break;
                }
            }
        }
    }
    */

    await connector.createTask(name, 0, 0, bucket_eq.indexOf(bucket), 'todo', parent);

    /*

    console.log(tags);
    FAKE_CARDS[2].push({
        id : ++lastId,
        name,
        desc,
        bucket,
        hasChild: false,
        parent: parent,
        fullName,
        tags
    });

    */

    callbackFunc();
}
