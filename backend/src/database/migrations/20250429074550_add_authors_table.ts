import { Migration } from '@mikro-orm/migrations';

export class Migration20250429074550_add_authors_table extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table `authors` (`id` int unsigned auto_increment primary key, `name` varchar(255) not null, `created_at` datetime not null default current_timestamp, `updated_at` datetime not null default current_timestamp);',
    );
    this.addSql(
      'alter table `articles` add column `author_id` int unsigned null;',
    );
    this.addSql(
      'alter table `articles` add constraint `articles_author_id_foreign` foreign key (`author_id`) references `authors` (`id`) on update cascade on delete set null;',
    );
    this.addSql('alter table `articles` drop column `author`');
  }

  override async down(): Promise<void> {
    this.addSql(
      'alter table `articles` drop foreign key `articles_author_id_foreign`;',
    );
    this.addSql('alter table `articles` drop column `author_id`;');
    this.addSql(
      'alter table `articles` add column `author` varchar(255) not null',
    );
    this.addSql('drop table `authors`;');
  }
}
