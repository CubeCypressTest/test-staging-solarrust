cube(`orders`, {
  // Пример встроенного источника: создаёт таблицу из 5 строк
  sql: `
    SELECT 1 AS id, 100 AS total, 'new' AS status, NOW() AS created_at
    UNION ALL
    SELECT 2, 200, 'processed', NOW()
    UNION ALL
    SELECT 3, 300, 'processed', NOW()
    UNION ALL
    SELECT 4, 400, 'shipped', NOW()
    UNION ALL
    SELECT 5, 500, 'cancelled', NOW()
  `,
  measures: {
    count: {
      type: `count`
    },
    total_amount: {
      sql: `total`,
      type: `sum`
    } // исправлено: колонка теперь total
  },
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    status: {
      sql: `status`,
      type: `string`
    },
    created_at: {
      sql: `created_at`,
      type: `time`
    }
  },
  preAggregations: {
    by_status_month_part: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`],
      dimensionReferences: [`orders.status`],
      timeDimensionReference: `orders.created_at`,
      granularity: `week`,
      partitionGranularity: `month`,
      // Явно задаём диапазон сборки => будет >3 партишенов
      buildRangeStart: {
        sql: `SELECT DATE_TRUNC('month', NOW() - INTERVAL '8 months')`
      },
      buildRangeEnd: {
        sql: `SELECT DATE_TRUNC('month', NOW())`
      },
      refreshKey: {
        every: `1 day`,
        updateWindow: `1 week`
      }
    },
    by_status: {
      type: `rollup`,
      measureReferences: [`orders.count`, `orders.total_amount`]
    },
    by_status_day: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`],
      dimensionReferences: [`orders.status`],
      timeDimensionReference: `orders.created_at`,
      granularity: `day`
    },
    by_status_week: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`],
      dimensionReferences: [`orders.status`],
      timeDimensionReference: `orders.created_at`,
      granularity: `week`
    },
    by_status_month: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`],
      dimensionReferences: [`orders.status`],
      timeDimensionReference: `orders.created_at`,
      granularity: `month`
    },
    by_status_quarter: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`, `orders.count`],
      dimensionReferences: [`orders.status`],
      timeDimensionReference: `orders.created_at`,
      granularity: `quarter`
    },
    by_day: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`, `orders.count`],
      timeDimensionReference: `orders.created_at`,
      granularity: `day`
    },
    by_week: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`, `orders.count`],
      timeDimensionReference: `orders.created_at`,
      granularity: `week`
    },
    by_month: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`, `orders.count`],
      timeDimensionReference: `orders.created_at`,
      granularity: `month`
    },
    by_quarter: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`, `orders.count`],
      timeDimensionReference: `orders.created_at`,
      granularity: `quarter`
    },
    by_year: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`, `orders.count`],
      timeDimensionReference: `orders.created_at`,
      granularity: `year`
    },
    by_status_week_part: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`],
      dimensionReferences: [`orders.status`],
      timeDimensionReference: `orders.created_at`,
      granularity: `week`,
      partitionGranularity: `month`
    },
    by_status_quarter_part: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`],
      dimensionReferences: [`orders.status`],
      timeDimensionReference: `orders.created_at`,
      granularity: `quarter`,
      partitionGranularity: `year`
    },
    by_status_year_part: {
      type: `rollup`,
      measureReferences: [`orders.total_amount`, `orders.count`],
      dimensionReferences: [`orders.status`],
      timeDimensionReference: `orders.created_at`,
      granularity: `year`,
      partitionGranularity: `year`
    },
    main: {
      measures: [orders.total_amount, orders.count],
      dimensions: [orders.id]
    }
  }
});