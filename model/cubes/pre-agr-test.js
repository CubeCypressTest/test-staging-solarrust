// сверху файла (вне cube) генерируем объекты
const measures = ['orders.count', 'orders.total_amount'];
const dims = ['orders.status'];

const byDims = Object.fromEntries(
  dims.map((d) => [
    `by_${d.split('.')[1]}`,
    { type: 'rollup', measureReferences: measures, dimensionReferences: [d], refreshKey: { every: '1 hour' } },
  ])
);

// если есть ещё byDimsTime, собираем вместе через Object.assign
cube(`orders`, {
  sql: `select 1 as id, 100 as amount, 'new' status`,
  preAggregations: {
    by_status: {
      type: 'rollup',
      measureReferences: [CUBE.count, CUBE.total_amount],
      dimensionReferences: [CUBE.status],
      refreshKey: { every: '1 hour' }
    }
  },
  measures: {
    count: { type: 'count' },
    total_amount: { sql: 'amount', type: 'sum' }
  },
  dimensions: {
    status: { sql: 'status', type: 'string' }
  }
});