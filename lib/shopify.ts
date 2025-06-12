import { ShopifyProduct, ShopifyCart, CheckoutInput } from '@/types/shopify';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

if (!domain || !storefrontAccessToken) {
  throw new Error('Missing Shopify environment variables. Please check your .env.local file.');
}

async function shopifyFetch(query: string, variables?: any) {
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