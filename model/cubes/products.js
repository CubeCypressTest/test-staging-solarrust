cube(`products`, {
  sql_table: `products`,
  public: false,

  joins: {
    product_categories: {
      sql: `${CUBE}.product_category_id = ${product_categories}.id`,
      relationship: `many_to_one`
    },

    suppliers: {
      sql: `${CUBE}.supplier_id = ${suppliers}.id`,
      relationship: `many_to_one`
    }
  },

  measures: {
    count: {
      type: `count`,
      title: `Product Count`
    },

    unique_products: {
      sql: `id`,
      type: `count_distinct`,
      title: `Unique Products`
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
      shown: false
    },

    name: {
      sql: `name`,
      type: `string`,
      title: `Product Name`
    },

    description: {
      sql: `description`,
      type: `string`,
      title: `Product Description`
    },

    created_at: {
      sql: `created_at`,
      type: `time`,
      title: `Product Created At`
    },

    created_year: {
      sql: `DATE_TRUNC('year', {CUBE}.created_at)`,
      type: `time`,
      title: `Product Created Year`
    },

    created_quarter: {
      sql: `DATE_TRUNC('quarter', {CUBE}.created_at)`,
      type: `time`,
      title: `Product Created Quarter`
    },

    created_month: {
      sql: `DATE_TRUNC('month', {CUBE}.created_at)`,
      type: `time`,
      title: `Product Created Month`
    },

    product_type: {
      sql: `CASE 
        WHEN {CUBE}.name ILIKE '%keyboard%' OR {CUBE}.name ILIKE '%mouse%' OR {CUBE}.name ILIKE '%computer%' THEN 'Technology'
        WHEN {CUBE}.name ILIKE '%pants%' OR {CUBE}.name ILIKE '%shirt%' OR {CUBE}.name ILIKE '%gloves%' THEN 'Apparel'
        WHEN {CUBE}.name ILIKE '%ball%' OR {CUBE}.name ILIKE '%toy%' THEN 'Recreation'
        WHEN {CUBE}.name ILIKE '%food%' OR {CUBE}.name ILIKE '%chips%' OR {CUBE}.name ILIKE '%pizza%' THEN 'Food'
        ELSE 'Other'
      END`,
      type: `string`,
      title: `Product Type`
    },

    material_type: {
      sql: `CASE 
        WHEN {CUBE}.name ILIKE '%metal%' THEN 'Metal'
        WHEN {CUBE}.name ILIKE '%plastic%' THEN 'Plastic'
        WHEN {CUBE}.name ILIKE '%rubber%' THEN 'Rubber'
        WHEN {CUBE}.name ILIKE '%cotton%' THEN 'Cotton'
        WHEN {CUBE}.name ILIKE '%wooden%' OR {CUBE}.name ILIKE '%wood%' THEN 'Wood'
        WHEN {CUBE}.name ILIKE '%granite%' THEN 'Stone'
        WHEN {CUBE}.name ILIKE '%frozen%' THEN 'Frozen'
        ELSE 'Mixed/Other'
      END`,
      type: `string`,
      title: `Material Type`
    },

    quality_tier: {
      sql: `CASE 
        WHEN {CUBE}.name ILIKE '%generic%' THEN 'Standard'
        WHEN {CUBE}.name ILIKE '%awesome%' OR {CUBE}.name ILIKE '%fantastic%' OR {CUBE}.name ILIKE '%gorgeous%' THEN 'Premium'
        WHEN {CUBE}.name ILIKE '%refined%' OR {CUBE}.name ILIKE '%ergonomic%' OR {CUBE}.name ILIKE '%licensed%' THEN 'Professional'
        WHEN {CUBE}.name ILIKE '%practical%' OR {CUBE}.name ILIKE '%tasty%' THEN 'Value'
        ELSE 'Standard'
      END`,
      type: `string`,
      title: `Quality Tier`
    }
  },

  hierarchies: {
    product_catalog: {
      title: `Product Catalog Hierarchy`,
      levels: [
        `product_categories.name`,
        `product_type`,
        `quality_tier`,
        `name`
      ]
    },

    material_hierarchy: {
      title: `Material & Quality Hierarchy`,
      levels: [
        `material_type`,
        `quality_tier`,
        `product_type`
      ]
    },

    supplier_catalog: {
      title: `Supplier Product Hierarchy`,
      levels: [
        `suppliers.name`,
        `product_categories.name`,
        `product_type`,
        `name`
      ]
    },

    temporal_catalog: {
      title: `Product Launch Timeline`,
      levels: [
        `created_year`,
        `created_quarter`,
        `created_month`,
        `product_categories.name`,
        `name`
      ]
    },

    business_analysis: {
      title: `Business Product Analysis`,
      levels: [
        `suppliers.name`,
        `quality_tier`,
        `material_type`,
        `product_type`
      ]
    },

    supply_chain: {
      title: `Full Supply Chain`,
      levels: [
        `suppliers.name`,
        `product_categories.name`,
        `material_type`,
        `quality_tier`,
        `product_type`,
        `name`
      ]
    }
  }
});

cube(`product_categories`, {
  sql_table: `product_categories`,
  public: false,

  measures: {
    count: {
      type: `count`,
      title: `Category Count`
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
      shown: false
    },

    name: {
      sql: `name`,
      type: `string`,
      title: `Category Name`
    },

    created_at: {
      sql: `created_at`,
      type: `time`,
      title: `Category Created At`
    }
  }
});

cube(`suppliers`, {
  sql_table: `suppliers`,
  public: false,

  measures: {
    count: {
      type: `count`,
      title: `Supplier Count`
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
      shown: false
    },

    name: {
      sql: `name`,
      type: `string`,
      title: `Supplier Name`
    },

    email: {
      sql: `email`,
      type: `string`,
      title: `Supplier Email`
    },

    created_at: {
      sql: `created_at`,
      type: `time`,
      title: `Supplier Created At`
    }
  }
});
