interface SEOSchemasProps {
  type: 'organization' | 'product' | 'breadcrumb' | 'faq' | 'article';
  data?: any;
}

export const SEOSchemas = ({ type, data }: SEOSchemasProps) => {
  const getSchemaData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ezhomes",
          "description": "Premium compression furniture company based in Brisbane, Australia. Revolutionary sofas that ship in compact boxes and assemble in 10 minutes.",
          "url": "https://ezhomes.com.au",
          "logo": "https://ezhomes.com.au/logo.png",
          "foundingDate": "2020",
          "foundingLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Brisbane",
              "addressRegion": "QLD",
              "addressCountry": "AU"
            }
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Furniture Street",
            "addressLocality": "Brisbane",
            "addressRegion": "QLD",
            "postalCode": "4000",
            "addressCountry": "AU"
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+61-1800-EZHOMES",
              "contactType": "customer service",
              "availableLanguage": "English",
              "areaServed": "AU"
            }
          ],
          "sameAs": [
            "https://facebook.com/ezhomes",
            "https://instagram.com/ezhomes_au",
            "https://youtube.com/ezhomes"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1247",
            "bestRating": "5",
            "worstRating": "1"
          }
        };

      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data?.name || "ezhomes Premium 3-Seater",
          "description": data?.description || "Revolutionary compression sofa that ships in a compact box and assembles in 10 minutes. Premium materials, Australian made.",
          "image": data?.images || [
            "https://ezhomes.com.au/product-1.jpg",
            "https://ezhomes.com.au/product-2.jpg"
          ],
          "brand": {
            "@type": "Brand",
            "name": "ezhomes"
          },
          "manufacturer": {
            "@type": "Organization", 
            "name": "ezhomes",
            "url": "https://ezhomes.com.au"
          },
          "offers": {
            "@type": "Offer",
            "price": data?.price || "1299",
            "priceCurrency": "AUD",
            "availability": data?.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": "ezhomes"
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "AUD"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "businessDays": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday", 
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ]
                },
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 1,
                  "maxValue": 2,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue", 
                  "minValue": 2,
                  "maxValue": 3,
                  "unitCode": "DAY"
                }
              }
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": data?.rating || "4.8",
            "reviewCount": data?.reviewCount || "124",
            "bestRating": "5",
            "worstRating": "1"
          },
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "Assembly Time",
              "value": "10 minutes"
            },
            {
              "@type": "PropertyValue",
              "name": "Warranty",
              "value": "10 years frame, 2 years fabric"
            },
            {
              "@type": "PropertyValue",
              "name": "Material",
              "value": "Premium fabric, hardwood frame"
            }
          ]
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data?.breadcrumbs?.map((crumb: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": `https://ezhomes.com.au${crumb.url}`
          })) || [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://ezhomes.com.au"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Shop",
              "item": "https://ezhomes.com.au/shop"
            }
          ]
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How long does assembly take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All ezhomes sofas are designed for 10-minute tool-free assembly. Simply unpack, unfold, and connect the modules. Detailed instructions are included with every order."
              }
            },
            {
              "@type": "Question", 
              "name": "What areas do you deliver to?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We deliver across Australia. Brisbane metro areas receive free delivery in 2-3 days. Other major cities take 3-4 days, regional areas 5-7 days. All pricing includes GST."
              }
            },
            {
              "@type": "Question",
              "name": "Can the sofa fit through small doorways?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our compression technology reduces the sofa size by 80% for shipping. The compact box easily fits through standard doorways, lifts, and narrow hallways."
              }
            },
            {
              "@type": "Question",
              "name": "What's your return policy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer 30-day returns with full refund. If you're not completely satisfied, contact us for a return authorization. We'll arrange pickup and processing."
              }
            },
            {
              "@type": "Question",
              "name": "What warranty do you provide?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "10-year warranty on the frame structure, 2-year warranty on fabric and cushions. This covers manufacturing defects and structural integrity under normal use."
              }
            }
          ]
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data?.title || "The Future of Furniture: Compression Technology Explained",
          "description": data?.description || "Learn how ezhomes' revolutionary compression technology is changing furniture delivery and assembly.",
          "image": data?.image || "https://ezhomes.com.au/blog-compression.jpg",
          "author": {
            "@type": "Person",
            "name": data?.author || "ezhomes Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ezhomes",
            "logo": {
              "@type": "ImageObject",
              "url": "https://ezhomes.com.au/logo.png"
            }
          },
          "datePublished": data?.publishDate || "2024-01-15",
          "dateModified": data?.modifyDate || "2024-01-15",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data?.url || "https://ezhomes.com.au/blog/compression-technology"
          }
        };

      default:
        return {};
    }
  };

  const schema = getSchemaData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};
