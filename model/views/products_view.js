view(`products_view`, {
  description: `Product catalog view with comprehensive hierarchies for product analysis and categorization.`,

  cubes: [
    {
      join_path: products,
      includes: [
        // Measures
        `count`,
        `unique_products`,
        // Dimensions
        `name`,
        `description`,
        `product_type`,
        `material_type`,
        `quality_tier`,
        `created_at`,
        `created_year`,
        `created_quarter`,
        `created_month`,
        // Hierarchies
        `product_catalog`,
        `material_hierarchy`,
        `supplier_catalog`,
        `temporal_catalog`,
        `business_analysis`,
        `supply_chain`
      ]
    },
    {
      join_path: products.product_categories,
      includes: [
        `name`,
        `count`,
        `created_at`
      ],
      prefix: true
    },
    {
      join_path: products.suppliers,
      includes: [
        `name`,
        `email`,
        `count`,
        `created_at`
      ],
      prefix: true
    }
  ],

  folders: [
    {
      name: `Product Metrics`,
      includes: [
        `count`,
        `unique_products`,
        `product_categories_count`,
        `suppliers_count`
      ]
    },
    {
      name: `Product Details`,
      includes: [
        `name`,
        `description`,
        `product_type`,
        `quality_tier`,
        `product_catalog`
      ]
    },
    {
      name: `Material & Supply`,
      includes: [
        `material_type`,
        `material_hierarchy`,
        `supply_chain`,
        `suppliers_name`,
        `suppliers_email`
      ]
    },
    {
      name: `Category`,
      includes: [
        `product_categories_name`,
        `product_categories_created_at`
      ]
    },
    {
      name: `Supplier`,
      includes: [
        `supplier_catalog`,
        `business_analysis`
      ]
    },
    {
      name: `Product Timeline`,
      includes: [
        `created_at`,
        `created_year`,
        `created_quarter`,
        `created_month`,
        `temporal_catalog`,
        `suppliers_created_at`
      ]
    }
  ]
});
