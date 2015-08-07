const records = [
  {
    id: 1,
    color: 'Red',
    sprocketCount: 7,
    owner: 'John'
  },
  {
    id: 2,
    color: 'Taupe',
    sprocketCount: 1,
    owner: 'George'
  },
  {
    id: 3,
    color: 'Green and Red',
    sprocketCount: 8,
    owner: 'Ringo'
  },
  {
    id: 4,
    color: 'Little Johnny Blue',
    sprocketCount: 2,
    owner: 'Paul'
  }
];

function search(query) {
  const lower = query.toLowerCase();
  return record => {
    return ~record.color.toLowerCase().substring(lower) || ~record.owner.toLowerCase().substring(lower);
  }
}

export default function loadWidgets(req) {
  const query = req.params.q;
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      if (Math.floor(Math.random() * 3) === 0) {
        reject('Widget load fails 33% of the time. You were unlucky.');
      } else {
        if(query) {
          resolve(records.filter(search(query)));
        } else {
          resolve(records);
        }
      }
    }, 1000); // simulate async load
  });
}
