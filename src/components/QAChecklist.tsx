export const QAChecklist = () => {
  const checklistItems = [
    // Functional Testing
    {
      category: "Functional Testing",
      items: [
        "Navigation works on all device sizes (mobile, tablet, desktop)",
        "Mega menu displays correctly with hover/click interactions",
        "Mobile hamburger menu opens and closes properly",
        "Search functionality works (when implemented)",
        "Cart icon shows correct item count",
        "Product grid displays products with correct information",
        "Product cards show proper hover effects",
        "Trust badges and delivery estimates display correctly",
        "Social proof section shows testimonials and ratings",
        "How It Works section displays process steps clearly",
        "Footer links are functional and organized properly",
        "Newsletter signup form accepts email input",
        "All CTAs (Call-to-Action buttons) are clickable",
        "Page scrolling is smooth without layout shifts",
        "404 page displays for non-existent routes"
      ]
    },
    
    // Responsive Design
    {
      category: "Responsive Design",
      items: [
        "Layout works at 360px width (smallest mobile)",
        "Content is readable at 768px (tablet breakpoint)",
        "Desktop layout is optimal at 1024px and above",
        "Images scale properly across all breakpoints",
        "Text remains legible at all screen sizes",
        "Buttons maintain minimum 44px touch targets on mobile",
        "Hero section maintains proper proportions",
        "Product grid adjusts columns based on screen size",
        "Footer content stacks appropriately on mobile",
        "Header collapses to hamburger menu on mobile"
      ]
    },
    
    // Performance
    {
      category: "Performance",
      items: [
        "Page loads in under 3 seconds on 4G connection",
        "Images are optimized and use appropriate formats",
        "Lazy loading implemented for below-fold images",
        "No console errors or warnings",
        "CSS is minified and optimized",
        "JavaScript bundles are tree-shaken",
        "Critical CSS is inlined for above-fold content",
        "Fonts load without blocking page render",
        "Animations don't cause layout shifts",
        "No unused CSS or JavaScript"
      ]
    },
    
    // Accessibility (WCAG 2.2 AA)
    {
      category: "Accessibility",
      items: [
        "All images have descriptive alt text",
        "Keyboard navigation works for all interactive elements",
        "Focus indicators are visible and clear",
        "Color contrast ratios meet 4.5:1 minimum",
        "Text can be resized up to 200% without loss of functionality",
        "Screen reader can navigate content logically",
        "Form labels are properly associated with inputs",
        "Error messages are descriptive and helpful",
        "Skip to main content link is available",
        "No reliance on color alone to convey information"
      ]
    },
    
    // SEO
    {
      category: "SEO",
      items: [
        "Page title includes primary keywords (under 60 characters)",
        "Meta description is compelling (150-160 characters)",
        "H1 tag is present and includes main keyword",
        "Heading hierarchy is logical (H1 > H2 > H3)",
        "URL structure is clean and descriptive",
        "Open Graph meta tags are present",
        "Twitter Card meta tags are configured",
        "Structured data (JSON-LD) is implemented",
        "Canonical URL is set correctly",
        "Robots.txt allows search engine crawling"
      ]
    },
    
    // Brand Consistency
    {
      category: "Brand Consistency",
      items: [
        "Logo displays correctly across all sections",
        "Brand colors (navy, gold, cream) are used consistently",
        "Typography hierarchy matches design system",
        "Button styles follow established variants",
        "Trust badges use consistent styling",
        "Voice and tone align with Australian market",
        "Currency displays in AUD format",
        "Shipping information mentions Australian locations",
        "Contact information includes Australian details",
        "All placeholder content is replaced with ezhomes content"
      ]
    },
    
    // E-commerce Specific
    {
      category: "E-commerce Features",
      items: [
        "Product prices display in correct AUD format",
        "Delivery estimates show realistic timeframes",
        "Trust signals (warranty, returns) are prominent",
        "Product ratings and reviews display correctly",
        "Inventory status indicators work (in stock, low stock)",
        "Quick view functionality opens product details",
        "Add to cart buttons are prominently placed",
        "Cart drawer/sidebar functions properly",
        "Shipping calculator estimates are accurate",
        "Payment method icons display correctly"
      ]
    },
    
    // Content Quality
    {
      category: "Content Quality",
      items: [
        "All copy is grammatically correct and typo-free",
        "Product descriptions are compelling and informative",
        "Assembly instructions are clear and simple",
        "Shipping policies are transparent and detailed",
        "Return policy is customer-friendly and clear",
        "Warranty information is comprehensive",
        "FAQ section addresses common customer concerns",
        "About page tells compelling brand story",
        "Contact information is complete and accurate",
        "Legal pages (Privacy, Terms) are present and compliant"
      ]
    },
    
    // Technical Implementation
    {
      category: "Technical Implementation",
      items: [
        "All imports resolve correctly",
        "TypeScript compiles without errors",
        "CSS custom properties work across browsers",
        "Tailwind classes compile properly",
        "Images load from correct asset paths",
        "Component props are properly typed",
        "Event handlers function as expected",
        "State management works correctly",
        "API endpoints are properly configured (when applicable)",
        "Build process completes successfully"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">
          ezhomes Theme - QA Checklist
        </h1>
        <p className="text-muted-foreground">
          Complete this checklist before launching your ezhomes Shopify theme. 
          Each item should be tested and verified across multiple devices and browsers.
        </p>
      </div>

      <div className="space-y-8">
        {checklistItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {sectionIndex + 1}
              </span>
              {section.category}
            </h2>
            
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <label key={itemIndex} className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 text-accent border-border rounded focus:ring-accent"
                  />
                  <span className="text-sm text-foreground leading-relaxed">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-accent/10 border border-accent/20 rounded-lg">
        <h3 className="text-lg font-semibold text-primary mb-2">
          Pre-Launch Final Check
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Before going live, ensure all items are checked and tested across:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Chrome, Firefox, Safari, Edge browsers</li>
          <li>• iPhone (iOS Safari), Android (Chrome Mobile)</li>
          <li>• Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)</li>
          <li>• Slow 3G, Fast 3G, and WiFi connections</li>
          <li>• Light and dark mode preferences (if applicable)</li>
        </ul>
      </div>
    </div>
  );
};