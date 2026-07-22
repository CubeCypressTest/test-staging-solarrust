view(`orders_view`, {
  description: `Comprehensive orders view with hierarchies for business intelligence and drill-down analysis. Combines order transactions, customer demographics, geographic data, and line item revenue metrics. Includes order status workflows, temporal analysis, customer geography hierarchies, and operational efficiency metrics. Use for questions about order performance, revenue trends, customer segmentation, and fulfillment analysis.`,

  cubes: [
    {
      join_path: orders,
      includes: [
        // Measures
        `count`,
        `total_orders`,
        `completed_orders`,
        `pending_orders`,
        `avg_completion_time`,
        // Dimensions
        `status`,
        `status_category`,
        `fulfillment_priority`,
        `created_at`,
        `created_year`,
        `created_quarter`,
        `created_month`,
        `created_week`,
        `created_day`,
        // Hierarchies
        `order_status_workflow`,
        `temporal_orders`,
        `customer_geography`,
        `product_orders`,
        `customer_demographics`,
        `business_analysis`,
        `operational_efficiency`,
        `revenue_attribution`,
        `customer_journey`
      ]
    },
    {
      join_path: orders.users,
      includes: [
        `count`,
        `average_age`,
        `total_users`,
        `first_name`,
        `last_name`,
        `full_name`,
        `company`,
        `gender`,
        `age_group`,
        `city`,
        `state`,
        `country`,
        `region`,
        `created_at`,
        `geography`,
        `demographics`,
        `temporal`,
        `business_profile`,
        `customer_lifecycle`
      ],
      prefix: true
    },
    {
      join_path: orders.line_items,
      includes: [
        // Revenue Metrics
        `total_revenue`,
        `total_quantity`,
        `total_price`,
        `line_item_count`,
        `average_item_price`,
        `average_quantity`,
        `average_revenue_per_line_item`,
        // Line Item Dimensions
        `created_at`,
        `created_quarter`,
        `created_month`,
        // Line Item Hierarchies
        `temporal_line_items`
      ],
      prefix: true
    }
  ],

  folders: [
    {
      name: `Order Metrics`,
      includes: [
        `count`,
        `total_orders`,
        `completed_orders`,
        `pending_orders`,
        `avg_completion_time`
      ]
    },
    {
      name: `Order Status`,
      includes: [
        `status`,
        `status_category`,
        `fulfillment_priority`,
        `order_status_workflow`,
        `operational_efficiency`
      ]
    },
    {
      name: `Order Timeline`,
      includes: [
        `created_at`,
        `created_year`,
        `created_quarter`,
        `created_month`,
        `created_week`,
        `created_day`,
        `temporal_orders`
      ]
    },
    {
      name: `Customer Metrics`,
      includes: [
        `users_count`,
        `users_average_age`,
        `users_total_users`
      ]
    },
    {
      name: `Customer Identity`,
      includes: [
        `users_first_name`,
        `users_last_name`,
        `users_full_name`,
        `users_company`,
        `users_gender`,
        `users_age_group`
      ]
    },
    {
      name: `Customer Geography`,
      includes: [
        `users_city`,
        `users_state`,
        `users_country`,
        `users_region`,
        `users_geography`,
        `customer_geography`
      ]
    },
    {
      name: `Customer Demographics`,
      includes: [
        `users_demographics`,
        `users_business_profile`,
        `customer_demographics`
      ]
    },
    {
      name: `Customer Timeline`,
      includes: [
        `users_created_at`,
        `users_temporal`,
        `users_customer_lifecycle`,
        `customer_journey`
      ]
    },
    {
      name: `Business Analysis`,
      includes: [
        `product_orders`,
        `business_analysis`,
        `revenue_attribution`
      ]
    },
    {
      name: `Revenue Metrics`,
      includes: [
        `line_items_total_revenue`,
        `line_items_total_quantity`,
        `line_items_total_price`,
        `line_items_line_item_count`,
        `line_items_average_item_price`,
        `line_items_average_quantity`,
        `line_items_average_revenue_per_line_item`
      ]
    },
    {
      name: `Revenue Timeline`,
      includes: [
        `line_items_created_at`,
        `line_items_created_quarter`,
        `line_items_created_month`,
        `line_items_temporal_line_items`
      ]
    }
  ]
});
