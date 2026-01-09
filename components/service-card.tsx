"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDuration, slugify } from "@/lib/utils";
import type { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const slug = slugify(service.name);

  return (
    <Link href={`/agendar/${slug}`}>
      <Card className="group cursor-pointer hover:border-primary/50 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                {formatDuration(service.duration)}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {service.category}
              </Badge>
            </div>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(service.price)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
