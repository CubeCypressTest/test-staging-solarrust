view(`orders_view`, {
  description: `Orders view exposing key business metrics: order count, total revenue, and order status breakdown.`,

  cubes: [
    {
      join_path: orders,
      includes: [
        `status`,
        `count`,
        `total_amount`
      ]
    }
  ]
});
