export class InMemoryRepository<T> {
  private entries: T[];

  constructor() {
    this.entries = [];
  }
  find() {
    return this.entries;
  }
  save(entry: T) {
    this.entries.push(entry);
  }
}
