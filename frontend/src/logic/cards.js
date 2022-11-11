
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

let filter = null;
let goalFilter = null;

const onchange = [];
export function onChange(f) {
    onchange.push(f);
}

function fireOnChange() {
    for (const f of onchange) {
        f();
    }
}

export async function move(card) {
    if (card.state === 'todo') {
        await connector.patchTask(
                card.id, 
                undefined, 
                undefined,
                'progress',
                undefined,
                undefined
            );
    } else if (card.state === 'progress') {
        await connector.patchTask(
            card.id, 
            undefined, 
            undefined,
            'done',
            undefined,
            undefined
        );
    } else if (card.state === 'done') {
        await connector.patchTask(
            card.id, 
            undefined, 
            undefined,
            'removed',
            undefined,
            undefined
        );
    }
}

export async function moveBack(card) {
    if (card.state === 'done') {
        await connector.patchTask(
                card.id, 
                undefined, 
                undefined,
                'progress',
                undefined,
                undefined
            );
    } else if (card.state === 'progress') {
        await connector.patchTask(
            card.id, 
            undefined, 
            undefined,
            'todo',
            undefined,
            undefined
        );
    }
}

export async function updateCard(card) {
    return await connector.patchTask(
        card.id, 
        card.name, 
        card.desc,
        'todo',
        0.5,
        0.5,
        card.tags,
        card.parent,
        bucket_eq.indexOf(card.bucket)
    );
}

export async function updateCoords(card) {
    return await connector.patchTask(
        card.id, 
        undefined, 
        undefined,
        undefined,
        card.importance,
        card.urgency,
        undefined,
        undefined,
        undefined
    );
}

export function getCards() {
    const res = connector.getCards().map(
        e => e.map(x => { return { ...x, bucket : bucket_eq[x.bucket] }; }).filter(x => 
            (filter === null || x.bucket === filter) 
            && (goalFilter === null || x.tags.includes(goalFilter)
        ))
    );

    for (const q of res) {
        q.sort((a, b) => {
            if (bucket_eq.indexOf(a.bucket) <  bucket_eq.indexOf(b.bucket)) {
                return -1;
            }
            if (bucket_eq.indexOf(a.bucket) >  bucket_eq.indexOf(b.bucket)) {
                return 1;
            }

            console.log('CMP!', a.name, b.name, a.importance, b.importance);
            if (a.importance > 0.5 && b.importance <= 0.5) {
                return -1;
            }
            if (a.importance <= 0.5 && b.importance > 0.5) {
                return 1;
            }
            return b.urgency - a.urgency;
        });
    }

    return res;
}

export function getInbox() {
    return connector.getInbox();
}

export function getGoals() {
    return connector.getGoals();
}

export function cmpBuckets(a, b) {
    return bucket_eq.indexOf(a) <= bucket_eq.indexOf(b);
}

export function setFilter(f) {
    filter = f;
    fireOnChange();
}

export function setGoalFilter(goal) {
    goalFilter = goal;
    fireOnChange();
}

export async function addInbox(name, desc, parent) {
    await connector.createTask(name, desc, 0.5, 0.5, 0, 'inbox', parent, []);
}

export async function addCard(name, desc, bucket, parent, tags) {
    await connector.createTask(name, desc, 0.5, 0.5, bucket_eq.indexOf(bucket), 'todo', parent, tags);
}

export function addGoal(title, description) {
    return connector.createGoal(title, description);
}
