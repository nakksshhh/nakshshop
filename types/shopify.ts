export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText?: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  variant: ShopifyVariant;
  product: {
    handle: string;
    images: ShopifyProduct['images'];
  };
}

export interface ShopifyCart {
  id: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: ShopifyVariant;
      };
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  checkoutUrl: string;
}

export interface CheckoutInput {
  lineItems: Array<{
    variantId: string;
    quantity: number;
  }>;
}