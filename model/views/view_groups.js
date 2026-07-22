view_group(`sales_and_products`, {
  title: `Sales & Products`,
  description: `Order and product analytics for sales and inventory management`,
  includes: [`orders_view`, `products_view`]
});

view_group(`customer_analytics`, {
  title: `Customer Analytics`,
  description: `Customer demographics and user behavior analysis`,
  includes: [`users_view`]
});
