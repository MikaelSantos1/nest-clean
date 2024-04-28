import { DomainEvents } from '@/core/events/domain-events'

import { StudentRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentRepository implements StudentRepository {
  public items: Student[] = []

  async findByEmail(email: string) {
    const question = this.items.find((item) => item.email === email)

    if (!question) {
      return null
    }

    return question
  }

  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }
}
