"use client";

import { useState } from "react";
import { Plus, Trash2, DollarSign, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ServiceItem } from "@/types/portfolio";

interface ServicesEditorProps {
  services: ServiceItem[];
  onChange: (services: ServiceItem[]) => void;
}

export function ServicesEditor({ services, onChange }: ServicesEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addService = () => {
    const newService: ServiceItem = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      price: "",
      features: [],
      isPopular: false,
    };
    onChange([...services, newService]);
    setExpandedId(newService.id);
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    onChange(services.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteService = (id: string) => {
    onChange(services.filter(s => s.id !== id));
  };

  const addFeature = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      updateService(serviceId, { features: [...(service.features || []), ""] });
    }
  };

  const updateFeature = (serviceId: string, index: number, value: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      const features = [...(service.features || [])];
      features[index] = value;
      updateService(serviceId, { features });
    }
  };

  const deleteFeature = (serviceId: string, index: number) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      updateService(serviceId, { features: service.features?.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Services</h3>
        <Button onClick={addService} size="sm" className="neon-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
          <DollarSign className="mx-auto mb-4 h-12 w-12 text-white/30" />
          <p className="text-white/50">No services yet. Add your offerings with pricing.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors ${service.isPopular ? "ring-2 ring-cyan-500/50" : ""}`}
              onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">{service.title || "Untitled Service"}</p>
                    {service.isPopular && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">Popular</span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-cyan-400">{service.price || "Price TBD"}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); deleteService(service.id); }}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {expandedId === service.id && (
                <div className="mt-4 space-y-4 border-t border-white/10 pt-4" onClick={(e) => e.stopPropagation()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateService(service.id, { title: e.target.value })}
                        placeholder="Web Development"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Price</label>
                      <input
                        type="text"
                        value={service.price}
                        onChange={(e) => updateService(service.id, { price: e.target.value })}
                        placeholder="$999/project or $50/hr"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Description</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => updateService(service.id, { description: e.target.value })}
                      placeholder="Describe what's included..."
                      rows={2}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Features</label>
                    <div className="space-y-2">
                      {(service.features || []).map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-2" />
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(service.id, index, e.target.value)}
                            placeholder="Feature description"
                            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteFeature(service.id, index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => addFeature(service.id)}
                        className="border-dashed border-white/20"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Feature
                      </Button>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={service.isPopular}
                      onChange={(e) => updateService(service.id, { isPopular: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-white/70">Mark as Popular</span>
                  </label>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
