'use client'

import { motion } from 'framer-motion'
import { Bed } from 'lucide-react'
import { CompactRoomCard } from './compact-room-card'

interface RoomType {
  _id: string
  name: string
  description: string
  rent: number
  images: Array<{
    url: string
    isCover?: boolean
  }>
  components: Array<{
    name: string
    description: string
  }>
}

interface RoomsSectionProps {
  rooms: RoomType[]
}

export function RoomsSection({ rooms }: RoomsSectionProps) {
  if (!rooms || rooms.length === 0) {
    return null
  }

  return (
    <section className="overflow-hidden rounded-1xl border border-none bg-card">
      <div className="p-2 sm:p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 px-3 py-2"
        >
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <Bed className="h-6 w-6 text-brand-primary" />
            Available <span className="text-brand-primary">Rooms</span>
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            {rooms.length} {rooms.length === 1 ? 'room type' : 'room types'} available • Click to view details
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {rooms.map((room, idx) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <CompactRoomCard
                roomId={room._id}
                name={room.name}
                description={room.description}
                rent={room.rent}
                coverImage={room.images.find(img => img.isCover)?.url || room.images[0]?.url}
                components={room.components}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
