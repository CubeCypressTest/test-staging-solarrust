cube(`orders`, {
  sql: `
select 1 as id, 100 as amount, 'new' status
union all
select 2 as id, 200 as amount, 'new' status
union all
select 3 as id, 300 as amount, 'processed' status
union all
select 4 as id, 500 as amount, 'processed' status
union all
select 5 as id, 600 as amount, 'shipped' status
`,

  preAggregations: {
  ordersByStatus: {
    type: 'rollup',
    measureReferences: ['orders.count', 'orders.total_amount'],
    dimensionReferences: ['orders.status'],
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