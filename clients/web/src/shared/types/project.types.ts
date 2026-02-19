// project.types.ts
export type ProjectStatus = 'draft' | 'active' | 'archived' | 'completed'

export type Project = {
  id: string
  name: string
  description: string
  status: ProjectStatus
  ownerId: string
  createdAt: string
  updatedAt: string
}

