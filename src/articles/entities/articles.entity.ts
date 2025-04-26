import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Articles {
  @PrimaryKey({ autoincrement: true })
  id?: number;

  @Property()
  title: string;

  @Property({ type: 'text' })
  content: string;

  @Property()
  author: string;

  @Property()
  views: number;

  @Property()
  shares: number;

  @Property({ type: 'text', nullable: true })
  summary?: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(
    title: string,
    content: string,
    author: string,
    views: number,
    shares: number,
  ) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.views = views;
    this.shares = shares;
  }
}
