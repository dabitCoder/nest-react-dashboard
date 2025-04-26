import { Migration } from '@mikro-orm/migrations';

export class Migration20250426113214_add_tables_article extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table `articles` (`id` int unsigned not null primary key AUTO_INCREMENT, `title` varchar(255) not null, `content` text not null, `author` varchar(255) not null, `views` int not null, `shares` int not null, `summary` text null, `created_at` datetime not null default current_timestamp, `updated_at` datetime not null default current_timestamp on update current_timestamp)',
    );
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists `articles`;');
  }
}
