import { Articles } from '../../articles/entities/articles.entity';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Authors {
  @PrimaryKey({ autoincrement: true })
  id?: number;

  @Property()
  name: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @OneToMany(() => Articles, (article) => article.author)
  articles = new Collection<Articles>(this);

  constructor(name: string) {
    this.name = name;
  }
}
