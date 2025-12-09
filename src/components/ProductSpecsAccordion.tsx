import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/data/products";

interface Material {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  care: string;
}

const materials: Material[] = [
  {
    id: "corduroy",
    name: "Corduroy",
    type: "Corduroy",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Premium corduroy fabric with soft ridged texture. Durable and comfortable, this material adds warmth and a contemporary feel to any space.",
    care: "Vacuum regularly with upholstery attachment. Spot clean with mild soap and water. Removable covers can be dry cleaned.",
  },
  {
    id: "flannel",
    name: "Flannel",
    type: "Flannel",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    description: "Soft brushed flannel fabric that provides exceptional comfort and warmth. Perfect for creating a cozy, inviting atmosphere.",
    care: "Spot clean with a damp cloth. Professional cleaning recommended for deep stains. Rotate cushions regularly.",
  },
  {
    id: "high-density-foam",
    name: "High Density Foam",
    type: "Foam",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    description: "Premium high-density foam (35kg/m³) provides excellent support and durability. Retains its shape and comfort over years of use.",
    care: "Allow to air regularly. Vacuum occasionally to remove dust. Flip cushions periodically for even wear.",
  },
  {
    id: "chrome-iron",
    name: "Chrome-Plated Iron",
    type: "Metal",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Durable chrome-plated iron bars provide structural stability and keep the sofa secured. Built to last with a sleek finish.",
    care: "Wipe with a dry cloth to maintain shine. Avoid abrasive cleaners. Check connections periodically.",
  },
];

interface ProductSpecsAccordionProps {
  product: Product;
}

export const ProductSpecsAccordion = ({ product }: ProductSpecsAccordionProps) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(materials[0].id);

  const activeMaterial = materials.find((m) => m.id === selectedMaterial);

  // Use product dimensions if available
  const productDimensions = product.dimensions;
  const productWeight = product.weight;

  return (
    <div className="border-t border-border mt-12 pt-8">
      <Accordion type="single" collapsible className="w-full">
        {/* Dimensions */}
        <AccordionItem value="dimensions" className="border-border">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline py-5">
            Dimensions
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            {productDimensions ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">3-Seater (180cm)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Overall:</span>
                      <span className="font-medium">{productDimensions.threeSeater}</span>
                    </li>
                    {productDimensions.seatedThreeSeater && (
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Seated:</span>
                        <span className="font-medium">{productDimensions.seatedThreeSeater}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">4-Seater (200cm)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Overall:</span>
                      <span className="font-medium">{productDimensions.fourSeater}</span>
                    </li>
                    {productDimensions.seatedFourSeater && (
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Seated:</span>
                        <span className="font-medium">{productDimensions.seatedFourSeater}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Dimension details not available for this product.</p>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Materials | Care */}
        <AccordionItem value="materials" className="border-border">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline py-5">
            Materials | Care
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            {/* Product Materials List */}
            {product.material && product.material.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Sofa Materials</h4>
                <ul className="space-y-2">
                  {product.material.map((mat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Materials Grid */}
            <div className="relative">
              <div className="flex gap-0 rounded-xl overflow-hidden">
                {materials.map((material) => {
                  const isSelected = selectedMaterial === material.id;
                  return (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(isSelected ? null : material.id)}
                      className={`relative flex-1 aspect-[4/3] min-h-[180px] md:min-h-[220px] overflow-hidden transition-all duration-300 ${
                        isSelected ? "flex-[2]" : "flex-1"
                      }`}
                    >
                      <img
                        src={material.image}
                        alt={material.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Overlay gradient when selected */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isSelected
                            ? "bg-gradient-to-r from-black/70 via-black/40 to-transparent"
                            : "bg-black/10 hover:bg-black/20"
                        }`}
                      />
                      {/* Plus/Minus icon */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white/80">
                        {isSelected ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                      {/* Material info overlay when selected */}
                      {isSelected && activeMaterial && (
                        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end text-white text-left">
                          <h3 className="text-lg md:text-xl font-bold mb-2">
                            {activeMaterial.type} - {activeMaterial.name}
                          </h3>
                          <p className="text-sm text-white/90 mb-3 line-clamp-3 md:line-clamp-none">
                            {activeMaterial.description}
                          </p>
                          <div className="flex items-start gap-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/20 text-white shrink-0">
                              CARE
                            </span>
                            <p className="text-xs text-white/80 line-clamp-2">
                              {activeMaterial.care}
                            </p>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Weight & Support */}
        <AccordionItem value="weight" className="border-border">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline py-5">
            Weight & Support
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Product Weight</h4>
                <p className="text-foreground font-medium">{productWeight || "44-46kg"}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Package Weight</h4>
                <p className="text-foreground font-medium">~30kg (compressed)</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Max Load Capacity</h4>
                <p className="text-foreground font-medium">350kg</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Seat Capacity</h4>
                <p className="text-foreground font-medium">3-4 people</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 col-span-2 md:col-span-2">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Cushion Density</h4>
                <p className="text-foreground font-medium">High-density foam (35kg/m³)</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
