import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface VariantOption {
  label: string
  value: string
  icon?: string
}

interface VariantSelectorProps {
  label: string
  options: VariantOption[]
  value?: string
  onChange: (value: string) => void
}

export function VariantSelector({ label, options, value, onChange }: VariantSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}: -</p>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-2 p-1">
          {options.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              size="sm"
              className={cn(
                "flex items-center gap-2 border rounded-md px-4 py-2",
                value === option.value && "border-primary bg-primary/5"
              )}
              onClick={() => onChange(option.value)}
            >
              {option.icon && (
                <span className="w-4 h-4">
                  <img src={option.icon} alt="" className="w-full h-full object-contain" />
                </span>
              )}
              <span>{option.label}</span>
              {value === option.value && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

