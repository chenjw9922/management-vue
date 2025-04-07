import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonService {
  private persons: Array<{id: number, [key: string]: any}> = [];

  create(person: {id: number, [key: string]: any}) {
    this.persons.push(person);
    return person;
  }

  findAll() {
    return this.persons;
  }

  findOne(id: number) {
    return this.persons.find(p => p.id === id);
  }

  update(id: number, updatePersonDto: {[key: string]: any}) {
    const index = this.persons.findIndex(p => p.id === id);
    if (index !== -1) {
      this.persons[index] = { ...this.persons[index], ...updatePersonDto };
      return this.persons[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.persons.findIndex(p => p.id === id);
    if (index !== -1) {
      return this.persons.splice(index, 1)[0];
    }
    return null;
  }
}