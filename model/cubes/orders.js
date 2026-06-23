cube(`orders`, {
  sql_table: `orders`,
  public: false,

  joins: {
    users: {
      sql: `${CUBE}.user_id = ${users.id}`,
      relationship: `many_to_one`
    },

    products: {
      sql: `${CUBE}.product_id = ${products.id}`,
      relationship: `many_to_one`
    }
  },

  measures: {
    count: {
      type: `count`,
      title: `Order Count`
    },

    total_orders: {
      sql: `${CUBE}.id`,
      type: `count_distinct`,
      title: `Total Unique Orders`
    },

    completed_orders: {
      sql: `CASE WHEN ${CUBE}.status = 'completed' THEN ${CUBE}.id END`,
      type: `count_distinct`,
      title: `Completed Orders`
    },

    pending_orders: {
      sql: `CASE WHEN ${CUBE}.status IN ('new', 'processing') THEN ${CUBE}.id END`,
      type: `count_distinct`,
      title: `Pending Orders`
    },

    avg_completion_time: {
      sql: `EXTRACT(epoch FROM (${CUBE}.completed_at - ${CUBE}.created_at)) / 3600`,
      type: `avg`,
      title: `Avg Completion Time (Hours)`
    }
  },

  dimensions: {
    id: {
      sql: `${CUBE}.id`,
      type: `number`,
      primaryKey: true,
      shown: false
    },

    user_id: {
      sql: `user_id`,
      type: `number`,
      title: `User ID`
    },

    product_id: {
      sql: `product_id`,
      type: `number`,
      title: `Product ID`
    },

    number: {
      sql: `number`,
      type: `number`,
      title: `Order Number`
    },

    status: {
      sql: `status`,
      type: `string`,
      title: `Order Status`
    },

    status_category: {
      sql: `CASE 
        WHEN ${CUBE}.status IN ('new', 'processing') THEN 'Pending'
        WHEN ${CUBE}.status IN ('shipped', 'completed') THEN 'Fulfilled'
        WHEN ${CUBE}.status IN ('cancelled', 'refunded') THEN 'Cancelled'
        ELSE 'Other'
      END`,
      type: `string`,
      title: `Status Category`
    },

    fulfillment_priority: {
      sql: `CASE 
        WHEN ${CUBE}.status = 'new' THEN 'High Priority'
        WHEN ${CUBE}.status = 'processing' THEN 'Medium Priority'
        WHEN ${CUBE}.status IN ('shipped', 'completed') THEN 'Fulfilled'
        ELSE 'Low Priority'
      END`,
      type: `string`,
      title: `Fulfillment Priority`
    },

    created_at: {
      sql: `created_at`,
      type: `time`,
      title: `Order Created At`
    },

    completed_at: {
      sql: `completed_at`,
      type: `time`,
      title: `Order Completed At`
    },

    created_year: {
      sql: `DATE_TRUNC('year', ${CUBE}.created_at)`,
      type: `time`,
      title: `Order Created Year`
    },

    created_quarter: {
      sql: `DATE_TRUNC('quarter', ${CUBE}.created_at)`,
      type: `time`,
      title: `Order Created Quarter`
    },

    created_month: {
      sql: `DATE_TRUNC('month', ${CUBE}.created_at)`,
      type: `time`,
      title: `Order Created Month`
    },

    created_week: {
      sql: `DATE_TRUNC('week', ${CUBE}.created_at)`,
      type: `time`,
      title: `Order Created Week`
    },

    created_day: {
      sql: `DATE_TRUNC('day', ${CUBE}.created_at)`,
      type: `time`,
      title: `Order Created Day`
    }
  },

  hierarchies: {
    order_status_workflow: {
      title: `Order Status Workflow`,
      levels: [
        `status_category`,
        `fulfillment_priority`,
        `status`
      ]
    },

    temporal_orders: {
      title: `Order Timeline`,
      levels: [
        `created_year`,
        `created_quarter`,
        `created_month`,
        `created_week`,
        `created_day`
      ]
    },

    customer_geography: {
      title: `Customer Geographic Analysis`,
      levels: [
        `users.country`,
        `users.region`,
        `users.state`,
        `users.city`
      ]
    },

    product_orders: {
      title: `Product Order Hierarchy`,
      levels: [
        `products.product_categories.name`,
        `products.product_type`,
        `products.quality_tier`,
        `products.name`
      ]
    },

    customer_demographics: {
      title: `Customer Order Demographics`,
      levels: [
        `users.company`,
        `users.gender`,
        `users.age_group`,
        `status_category`
      ]
    },

    business_analysis: {
      title: `Comprehensive Business Analysis`,
      levels: [
        `created_quarter`,
        `users.region`,
        `products.product_categories.name`,
        `status_category`,
        `fulfillment_priority`
      ]
    },

    operational_efficiency: {
      title: `Operational Efficiency Analysis`,
      levels: [
        `fulfillment_priority`,
        `users.region`,
        `created_month`,
        `status`
      ]
    },

    revenue_attribution: {
      title: `Revenue Attribution`,
      levels: [
        `users.region`,
        `created_quarter`,
        `status_category`,
        `fulfillment_priority`,
        `status`
      ]
    },

    customer_journey: {
      title: `Customer Journey`,
      levels: [
        `users.country`,
        `users.region`,
        `users.age_group`,
        `users.company`,
        `status_category`,
        `status`
      ]
    }
  },

  preAggregations: {
    by_status_and_time: {
      type: 'rollup',
      measures: [CUBE.count, CUBE.total_orders],
      dimensions: [CUBE.status, CUBE.created_month],
      timeDimension: CUBE.created_at,
      granularity: `month`,
      refreshKey: { every: '1 hour' }
    },

    by_geography: {
      type: 'rollup',
      measures: [CUBE.count, CUBE.completed_orders],
      dimensions: [CUBE.users.country, CUBE.users.state, CUBE.status_category],
      refreshKey: { every: '2 hours' }
    }
  }
});
