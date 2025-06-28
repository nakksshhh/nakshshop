import { ShopifyProduct, ShopifyCart, CheckoutInput } from '@/types/shopify';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Check if we're in development and provide helpful error messages
const isDevelopment = process.env.NODE_ENV === 'development';
const hasValidConfig = domain && storefrontAccessToken && 
  domain !== 'your-store-name.myshopify.com' && 
  storefrontAccessToken !== 'your-storefront-access-token';

if (!hasValidConfig && isDevelopment) {
  console.warn('⚠️ Shopify configuration missing or using placeholder values. Please update your .env.local file with actual Shopify credentials.');
}

async function shopifyFetch(query: string, variables?: any) {
  if (!hasValidConfig) {
    // Return mock data in development when Shopify is not configured
    if (isDevelopment) {
      return getMockData(query);
    }
    throw new Error('Shopify configuration is required in production. Please check your environment variables.');
  }

  const endpoint = `https://${domain}/api/2023-10/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();
    
    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Shopify API error');
    }

    return data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}

// Mock data for development when Shopify is not configured
function getMockData(query: string) {
  if (query.includes('products')) {
    return {
      data: {
        products: {
          edges: [
            {
              node: {
                id: 'mock-product-1',
                title: 'Organic Cotton Tote Bag',
                description: 'A beautiful, sustainable tote bag made from 100% organic cotton. Perfect for your daily shopping needs.',
                handle: 'organic-cotton-tote-bag',
                images: {
                  edges: [
                    {
                      node: {
                        id: 'mock-image-1',
                        url: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=400',
                        altText: 'Organic Cotton Tote Bag'
                      }
                    }
                  ]
                },
                variants: {
                  edges: [
                    {
                      node: {
                        id: 'mock-variant-1',
                        title: 'Default Title',
                        price: {
                          amount: '24.99',
                          currencyCode: 'USD'
                        },
                        availableForSale: true,
                        selectedOptions: []
                      }
                    }
                  ]
                },
                priceRange: {
                  minVariantPrice: {
                    amount: '24.99',
                    currencyCode: 'USD'
                  },
                  maxVariantPrice: {
                    amount: '24.99',
                    currencyCode: 'USD'
                  }
                }
              }
            },
            {
              node: {
                id: 'mock-product-2',
                title: 'Bamboo Water Bottle',
                description: 'Eco-friendly bamboo water bottle with stainless steel interior. Keep your drinks fresh and the planet happy.',
                handle: 'bamboo-water-bottle',
                images: {
                  edges: [
                    {
                      node: {
                        id: 'mock-image-2',
                        url: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400',
                        altText: 'Bamboo Water Bottle'
                      }
                    }
                  ]
                },
                variants: {
                  edges: [
                    {
                      node: {
                        id: 'mock-variant-2',
                        title: 'Default Title',
                        price: {
                          amount: '32.99',
                          currencyCode: 'USD'
                        },
                        availableForSale: true,
                        selectedOptions: []
                      }
                    }
                  ]
                },
                priceRange: {
                  minVariantPrice: {
                    amount: '32.99',
                    currencyCode: 'USD'
                  },
                  maxVariantPrice: {
                    amount: '32.99',
                    currencyCode: 'USD'
                  }
                }
              }
            },
            {
              node: {
                id: 'mock-product-3',
                title: 'Handmade Ceramic Mug',
                description: 'Beautiful handcrafted ceramic mug with natural glaze. Each piece is unique and made with love.',
                handle: 'handmade-ceramic-mug',
                images: {
                  edges: [
                    {
                      node: {
                        id: 'mock-image-3',
                        url: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400',
                        altText: 'Handmade Ceramic Mug'
                      }
                    }
                  ]
                },
                variants: {
                  edges: [
                    {
                      node: {
                        id: 'mock-variant-3',
                        title: 'Default Title',
                        price: {
                          amount: '18.99',
                          currencyCode: 'USD'
                        },
                        availableForSale: true,
                        selectedOptions: []
                      }
                    }
                  ]
                },
                priceRange: {
                  minVariantPrice: {
                    amount: '18.99',
                    currencyCode: 'USD'
                  },
                  maxVariantPrice: {
                    amount: '18.99',
                    currencyCode: 'USD'
                  }
                }
              }
            },
            {
              node: {
                id: 'mock-product-4',
                title: 'Organic Lavender Soap',
                description: 'Gentle, all-natural soap infused with organic lavender essential oil. Perfect for sensitive skin.',
                handle: 'organic-lavender-soap',
                images: {
                  edges: [
                    {
                      node: {
                        id: 'mock-image-4',
                        url: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
                        altText: 'Organic Lavender Soap'
                      }
                    }
                  ]
                },
                variants: {
                  edges: [
                    {
                      node: {
                        id: 'mock-variant-4',
                        title: 'Default Title',
                        price: {
                          amount: '12.99',
                          currencyCode: 'USD'
                        },
                        availableForSale: true,
                        selectedOptions: []
                      }
                    }
                  ]
                },
                priceRange: {
                  minVariantPrice: {
                    amount: '12.99',
                    currencyCode: 'USD'
                  },
                  maxVariantPrice: {
                    amount: '12.99',
                    currencyCode: 'USD'
                  }
                }
              }
            }
          ]
        }
      }
    };
  }

  if (query.includes('productByHandle')) {
    return {
      data: {
        productByHandle: {
          id: 'mock-product-1',
          title: 'Organic Cotton Tote Bag',
          description: 'A beautiful, sustainable tote bag made from 100% organic cotton. Perfect for your daily shopping needs.',
          handle: 'organic-cotton-tote-bag',
          images: {
            edges: [
              {
                node: {
                  id: 'mock-image-1',
                  url: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=400',
                  altText: 'Organic Cotton Tote Bag'
                }
              }
            ]
          },
          variants: {
            edges: [
              {
                node: {
                  id: 'mock-variant-1',
                  title: 'Default Title',
                  price: {
                    amount: '24.99',
                    currencyCode: 'USD'
                  },
                  availableForSale: true,
                  selectedOptions: []
                }
              }
            ]
          },
          priceRange: {
            minVariantPrice: {
              amount: '24.99',
              currencyCode: 'USD'
            },
            maxVariantPrice: {
              amount: '24.99',
              currencyCode: 'USD'
            }
          }
        }
      }
    };
  }

  return { data: {} };
}

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            images(first: 5) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch(query, { first });
    return response.data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch(query, { handle });
    return response.data.productByHandle;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function createShopifyCheckoutUrl(input: CheckoutInput): Promise<string> {
  if (!hasValidConfig) {
    // In development without Shopify config, return a mock checkout URL
    if (isDevelopment) {
      console.warn('Mock checkout - Shopify not configured');
      return 'https://checkout.shopify.com/mock-checkout';
    }
    throw new Error('Shopify configuration is required for checkout');
  }

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Transform lineItems to use merchandiseId instead of variantId
  const cartInput = {
    lines: input.lineItems.map(item => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    })),
  };

  try {
    const response = await shopifyFetch(query, { input: cartInput });
    
    if (response.data.cartCreate.userErrors.length > 0) {
      throw new Error(response.data.cartCreate.userErrors[0].message);
    }

    return response.data.cartCreate.cart.checkoutUrl;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}