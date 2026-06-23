view(`business_intelligence_view`, {
  description: `Comprehensive business intelligence view combining all entities with complex multi-dimensional hierarchies for advanced analytics and drill-down analysis.`,

  cubes: [
    {
      join_path: orders,
      includes: [
        // Key Order Metrics
        `count`,
        `total_orders`,
        `completed_orders`,
        `pending_orders`,
        `avg_completion_time`,
        // Order Dimensions
        `status`,
        `status_category`,
        `fulfillment_priority`,
        `created_at`,
        `created_quarter`,
        `created_month`,
        // Complex Hierarchies (excluding cross-cube references)
        `operational_efficiency`,
        `order_status_workflow`,
        `temporal_orders`,
        `revenue_attribution`,
        `customer_journey`
      ]
    },
    {
      join_path: orders.users,
      includes: [
        // User Metrics
        `count`,
        `average_age`,
        `total_users`,
        // Geographic Dimensions
        `city`,
        `state`,
        `country`,
        `region`,
        // Demographic Dimensions
        `gender`,
        `age_group`,
        `company`,
        // User Hierarchies
        `geography`,
        `demographics`,
        `business_profile`,
        `customer_lifecycle`
      ],
      prefix: true
    },
    {
      join_path: orders.products,
      includes: [
        // Product Metrics
        `count`,
        `unique_products`,
        // Product Dimensions
        `name`,
        `product_type`,
        `material_type`,
        `quality_tier`,
        `created_quarter`,
        // Product Hierarchies (without cross-cube references)
        `material_hierarchy`,
        `supply_chain`
      ],
      prefix: true
    },

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
      name: `Order Status & Fulfillment`,
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
        `created_quarter`,
        `created_month`,
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
      name: `Customer Geography`,
      includes: [
        `users_city`,
        `users_state`,
        `users_country`,
        `users_region`,
        `users_geography`
      ]
    },
    {
      name: `Customer Demographics`,
      includes: [
        `users_gender`,
        `users_age_group`,
        `users_company`,
        `users_demographics`,
        `users_business_profile`
      ]
    },
    {
      name: `Customer Journey & Attribution`,
      includes: [
        `users_customer_lifecycle`,
        `customer_journey`,
        `revenue_attribution`
      ]
    },
    {
      name: `Product Metrics`,
      includes: [
        `products_count`,
        `products_unique_products`
      ]
    },
    {
      name: `Product Details`,
      includes: [
        `products_name`,
        `products_product_type`,
        `products_quality_tier`,
        `products_created_quarter`
      ]
    },
    {
      name: `Material & Supply Chain`,
      includes: [
        `products_material_type`,
        `products_material_hierarchy`,
        `products_supply_chain`
      ]
    }
  ]
});
