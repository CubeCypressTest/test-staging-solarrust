cube(`line_items`, {
  sql_table: `public.line_items`,
  description: `Detailed line items for each order, capturing individual product quantities, prices, and revenue calculations. Represents the granular order details with many-to-one relationships to orders and products.`,
  public: false,

  joins: {
    orders: {
      sql: `${CUBE}.order_id = ${orders.id}`,
      relationship: `many_to_one`
    },

    products: {
      sql: `${CUBE}.product_id = ${products.id}`,
      relationship: `many_to_one`
    }
  },

  measures: {
    total_revenue: {
      sql: `${CUBE}.price * ${CUBE}.quantity`,
      type: `sum`,
      title: `Total Revenue`,
      description: `Total revenue calculated as sum of price * quantity`,
      format: `currency`
    },

    total_quantity: {
      sql: `quantity`,
      type: `sum`,
      title: `Total Quantity`,
      description: `Total quantity of items sold`
    },

    total_price: {
      sql: `price`,
      type: `sum`,
      title: `Total Price`,
      description: `Sum of all prices`,
      format: `currency`
    },

    line_item_count: {
      type: `count`,
      title: `Line Item Count`,
      description: `Total count of line items`
    },

    average_item_price: {
      sql: `price`,
      type: `avg`,
      title: `Average Item Price`,
      description: `Average price per line item`,
      format: `currency`
    },

    average_quantity: {
      sql: `quantity`,
      type: `avg`,
      title: `Average Quantity`,
      description: `Average quantity per line item`
    },

    average_revenue_per_line_item: {
      sql: `${CUBE}.price * ${CUBE}.quantity`,
      type: `avg`,
      title: `Average Revenue per Line Item`,
      description: `Average revenue per line item`,
      format: `currency`
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
      shown: false
    },

    order_id: {
      sql: `order_id`,
      type: `number`,
      title: `Order ID`
    },

    product_id: {
      sql: `product_id`,
      type: `number`,
      title: `Product ID`
    },

    quantity: {
      sql: `quantity`,
      type: `number`,
      title: `Quantity`
    },

    price: {
      sql: `price`,
      type: `number`,
      title: `Price`
    },

    created_at: {
      sql: `created_at`,
      type: `time`,
      title: `Line Item Created At`
    },

    created_year: {
      sql: `DATE_TRUNC('year', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Year`
    },

    created_quarter: {
      sql: `DATE_TRUNC('quarter', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Quarter`
    },

    created_month: {
      sql: `DATE_TRUNC('month', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Month`
    },

    created_week: {
      sql: `DATE_TRUNC('week', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Week`
    },

    created_day: {
      sql: `DATE_TRUNC('day', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Day`
    }
  },

  hierarchies: {
    temporal_line_items: {
      title: `Line Item Timeline`,
      levels: [
        `created_year`,
        `created_quarter`,
        `created_month`,
        `created_week`,
        `created_day`
      ]
    }
  }
});
