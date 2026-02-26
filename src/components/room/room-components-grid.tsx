'use client'

import { motion } from 'framer-motion'
import { 
  Bed, 
  Lamp, 
  Wind, 
  Shirt,
  BookOpen,
  Armchair,
  Wifi,
  Tv,
  Coffee,
  Home,
  type LucideIcon
} from 'lucide-react'

interface RoomComponent {
  _id: string;
  name: string;
  description: string;
}

interface RoomComponentsGridProps {
  components: RoomComponent[]
}

const getComponentIcon = (name: string): LucideIcon => {
  const lowerName = name.toLowerCase()
  
  if (lowerName.includes('bed') || lowerName.includes('mattress')) return Bed
  if (lowerName.includes('table') || lowerName.includes('desk') || lowerName.includes('study')) return BookOpen
  if (lowerName.includes('chair') || lowerName.includes('seat')) return Armchair
  if (lowerName.includes('wardrobe') || lowerName.includes('cupboard') || lowerName.includes('closet')) return Shirt
  if (lowerName.includes('fan') || lowerName.includes('ac') || lowerName.includes('air')) return Wind
  if (lowerName.includes('light') || lowerName.includes('lamp')) return Lamp
  if (lowerName.includes('wifi') || lowerName.includes('internet')) return Wifi
  if (lowerName.includes('tv') || lowerName.includes('television')) return Tv
  if (lowerName.includes('table')) return Coffee
  
  return Home
}

export function RoomComponentsGrid({ components }: RoomComponentsGridProps) {
  if (components.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-xl border border-border bg-card hover:border-brand-primary/50 transition-colors"
    >
      <div className="p-4 sm:p-6">
        <h3 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl">
          What's <span className="text-brand-primary">Included</span>
        </h3>

        {/* Pill-based flex wrap layout */}
        <div className="flex flex-wrap gap-2">
          {components.map((component, idx) => {
            const Icon = getComponentIcon(component.name)
            
            return (
              <motion.div
                key={component._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-gradient-to-r from-background to-muted/30 px-3 py-2 transition-all hover:border-brand-primary/50 sm:px-4 sm:py-2.5"
                title={component.description}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary transition-all group-hover:bg-brand-primary group-hover:text-brand-white sm:h-7 sm:w-7">
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <span className="whitespace-nowrap text-xs font-bold text-foreground sm:text-sm">
                  {component.name}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
