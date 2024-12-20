import { ChevronRight } from "lucide-react";
import { IconBuildingStore } from '@tabler/icons-react';

export function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <IconBuildingStore />
      <span>Store Management</span>
      <ChevronRight className="h-4 w-4" />
      <span>Invoice Setting</span>
      <ChevronRight className="h-4 w-4" />
      <span>Create New Invoice</span>
    </div>
  );
}