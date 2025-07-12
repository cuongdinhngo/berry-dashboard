export const NAV_MENU = [
  {
    head: 'Dashboard',
    items: [
      {
        title: 'Analytics',
        icon: 'mdi-finance',
        value: 'dashboard-default',
        to: { name: 'index' }
      },
    ]
  },
  {
    head: 'Applications',
    items: [
      {
        title: 'Users',
        icon: 'mdi-account',
        subItems: [
          {
            title: 'Social Profile',
            value: 'users-social-profile',
            to: { name: 'user-social-post' }
          },
          {
            title: 'Accounts',
            value: 'users-accounts',
            to: { name: 'user-account' }
          },
          {
            title: 'Cards',
            value: 'users-cards',
            to: { name: 'user-card' }
          },
        ]
      },
      {
        title: 'Chat',
        icon: 'mdi-chat',
        value: 'chat',
        to: { name: 'chat' }
      },
      {
        title: 'Mail',
        icon: 'mdi-email',
        value: 'mail',
        to: { name: 'mail' }
      },
      {
        title: 'Kanban',
        icon: 'mdi-view-dashboard-variant-outline',
        value: 'kanban',
        to: { name: 'kanban' }
      },
      {
        title: 'E-Commerce',
        icon: 'mdi-cart',
        subItems: [
          {
            title: 'Products',
            value: 'ecommerce-products',
            to: { name: 'ecom-products' }
          },
          {
            title: 'Product Details',
            value: 'ecom-product-details',
            to: { name: 'ecom-detail-id', params: { id: '1' } }
          },
          {
            title: 'Checkout',
            value: 'ecommerce-checkout',
            to: { name: 'ecom-checkout' }
          },
        ]
      }
    ]
  }
];