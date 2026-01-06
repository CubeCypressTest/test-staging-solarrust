view(`orders_view`, {
  cubes: [
    {
      join_path: orders,
      includes: [
        `count`,
        `total_amount`,
        `status`
      ]
    }
  ]
});
